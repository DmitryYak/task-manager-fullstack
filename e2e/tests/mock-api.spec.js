const { test, expect } = require("@playwright/test");

const BASE_URL = "http://localhost:5500";  // Полный URL из конфига

test.describe("MOCKED API (NO BACKEND NEEDED)", () => {
  test.beforeEach(async ({ page }) => {
    // Навигация на главную (активирует baseURL контекст)
    await page.goto("/");

    // Mock всех API вызовов
    await page.route("**/api/tasks**", async (route) => {
      const method = route.request().method();
      console.log(`🔥 MOCK ${method} /api/tasks`);

      if (method === "GET") {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify([
            { id: 1, title: "Mock 1", completed: false },
            { id: 2, title: "Mock 2", completed: true },
          ]),
        });
      } else if (method === "POST") {
        await route.fulfill({
          status: 201,
          contentType: "application/json",
          body: JSON.stringify({ id: 999, title: "Created!" }),
        });
      } else if (method === "DELETE") {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ message: "Удалено" }),
        });
      }
    });
  });

  // 1. GET - проверка статуса и данных
  test("GET tasks возвращает 200 + 2 задачи", async ({ page }) => {
    const result = await page.evaluate(async (url) => {
      const res = await fetch(url);
      return { status: res.status, data: await res.json() };
    }, `${BASE_URL}/api/tasks`);

    expect(result.status).toBe(200);
    expect(result.data).toHaveLength(2);
  });

  // 2. POST + DELETE
  test("POST создаёт + DELETE удаляет", async ({ page }) => {
    // POST
    const postRes = await page.evaluate(async (url) => {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "Test" }),
      });
      return { status: res.status, data: await res.json() };
    }, `${BASE_URL}/api/tasks`);

    expect(postRes.status).toBe(201);
    expect(postRes.data.id).toBe(999);

    // DELETE
    const delRes = await page.evaluate(async (url) => {
      const res = await fetch(url, { method: "DELETE" });
      return res.json();
    }, `${BASE_URL}/api/tasks/999`);

    expect(delRes.message).toBe("Удалено");
  });

  // 3. Response time < 50ms
  test("Mock API мгновенный (<50ms)", async ({ page }) => {
    const start = Date.now();
    await page.evaluate(async (url) => fetch(url), `${BASE_URL}/api/tasks`);
    const duration = Date.now() - start;

    console.log(`⚡ Mock time: ${duration}ms`);
    expect(duration).toBeLessThan(50);
  });
});
