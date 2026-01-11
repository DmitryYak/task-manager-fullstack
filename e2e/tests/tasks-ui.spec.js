import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:5500"; // где лежит index.html

test.describe("Task Manager UI", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test("smoke: заголовок страницы", async ({ page }) => {
    await expect(page).toHaveTitle(/Task Manager/i);
    await expect(page.locator("h1")).toHaveText("Task Manager");
  });

  test("добавление новой задачи", async ({ page }) => {
    await page.fill("#taskInput", "Новая задача");
    await page.click("#addBtn");
    const task = page.locator("#taskList li span", { hasText: "Новая задача" });
    await expect(task).toHaveText("Новая задача");
  });

  test("отметка задачи как выполненной", async ({ page }) => {
    // Добавляем тестовую задачу
    await page.fill("#taskInput", "Сделать тест");
    await page.click("#addBtn");

    const toggleBtn = page
      .locator("#taskList li", { hasText: "Сделать тест" })
      .locator(".toggle-btn");
    await toggleBtn.click();

    const taskLi = page.locator("#taskList li", { hasText: "Сделать тест" });
    await expect(taskLi).toHaveClass(/completed/);
  });

  test("удаление задачи", async ({ page }) => {
    await page.fill("#taskInput", "Задача для удаления");
    await page.click("#addBtn");

    // Подтверждаем удаление
    page.on("dialog", (dialog) => dialog.accept());

    const deleteBtn = page
      .locator("#taskList li", { hasText: "Задача для удаления" })
      .locator("button", { hasText: "❌" });
    await deleteBtn.click();

    const taskLi = page.locator("#taskList li", {
      hasText: "Задача для удаления",
    });
    await expect(taskLi).toHaveCount(0);
  });
});
