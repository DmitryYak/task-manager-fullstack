const { test, expect } = require("@playwright/test");

const URL_TASKS = "/api/tasks"; // Локальный путь

test.describe("MOCKED API (NO BACKEND NEEDED)", () => {
  test.beforeEach(async ({ page }) => {
    // 1. МОК через page.route()
    await page.route(URL_TASKS, async (route) => {
      const method = route.request().method();
      console.log(` MOCKED ${method}`);

      if (method === "GET") {
        await route.fulfill({
          status: 200,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify([
            { id: 1, title: "Mock Task 1", completed: false },
            { id: 2, title: "Mock Task 2", completed: true },
          ]),
        });
      } else if (method === "POST") {
        await route.fulfill({
          status: 201,
          body: JSON.stringify({
            id: 999,
            title: "Created!",
            completed: false,
          }),
        });
      } else if (method === "PUT") {
        await route.fulfill({ status: 200 });
      } else if (method === "DELETE") {
        await route.fulfill({
          status: 200,
          body: JSON.stringify({ message: "Удалено" }),
        });
      }
    });
  });

  // ТВОИ ТЕСТЫ через page.evaluate (имитируем fetch)
  test("check get tasks 200", async ({ page }) => {
    const response = await page.evaluate(async (url) => {
      const res = await fetch(url);
      return { status: res.status, body: await res.json() };
    }, URL_TASKS);

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
    console.log("✅ GET MOCK WORKS!");
  });

  test("check response time", async ({ page }) => {
    const start = Date.now();
    const response = await page.evaluate(async (url) => {
      const res = await fetch(url);
      return res.status;
    }, URL_TASKS);
    const duration = Date.now() - start;

    console.log(`⚡ MOCK TIME: ${duration}ms`);
    expect(duration).toBeLessThan(50); // Мгновенно!
  });

  test("check post + delete", async ({ page }) => {
    // POST
    const postResponse = await page.evaluate(async (url) => {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "Test Post" }),
      });
      return { status: res.status, body: await res.json() };
    }, URL_TASKS);

    expect(postResponse.status).toBe(201);
    expect(postResponse.body.id).toBe(999);

    // DELETE
    const delResponse = await page.evaluate(async (url) => {
      const res = await fetch(url, { method: "DELETE" });
      return await res.json();
    }, `${URL_TASKS}/999`);

    expect(delResponse.message).toBe("Удалено");
    console.log("✅ POST+DELETE MOCK!");
  });
});
