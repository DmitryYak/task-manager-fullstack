import { test, expect } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:5500";

test.describe("Task Manager UI", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test("smoke: заголовки страницы", async ({ page }) => {
    await expect(page).toHaveTitle(/Task Manager/i);
    await expect(page.locator("h1")).toContainText("Task Manager");
  });

  test("добавление новой задачи", async ({ page }) => {
    const taskText = `Новая задача ${Date.now()}`;
    await page.fill("#taskInput", taskText);
    await page.click("#addBtn");
    await expect(page.locator(`#taskList li:has-text("${taskText}")`)).toBeVisible();
  });

  test("отметка задачи как выполненной", async ({ page }) => {
    const taskText = `Toggle ${Date.now()}`;
    await page.fill("#taskInput", taskText);
    await page.click("#addBtn");
    await page.locator(`#taskList li:has-text("${taskText}") .toggle-btn`).first().click();
    await expect(page.locator(`#taskList li:has-text("${taskText}")`)).toHaveClass(/completed/);
  });

  test("удаление задачи", async ({ page }) => {
    const taskText = `Delete ${Date.now()}`;
    await page.fill("#taskInput", taskText);
    await page.click("#addBtn");
    
    page.once("dialog", dialog => dialog.accept());
    await page.locator(`#taskList li:has-text("${taskText}") .delete-btn`).click();
    
    await expect(page.locator(`#taskList li:has-text("${taskText}")`)).toHaveCount(0);
  });

  test("редактирование задачи", async ({ page }) => {
    const oldText = `EditOld ${Date.now()}`;
    const newText = `EditNew ${Date.now()}`;
    
    await page.fill("#taskInput", oldText);
    await page.click("#addBtn");
    
    // .first() для строгой уникальности
    await page.locator(`#taskList li:has-text("${oldText}") .edit-btn`).first().click();
    await page.fill("#editInput", newText);
    await page.click("#saveEdit");
    
    await expect(page.locator(`#taskList li:has-text("${newText}")`)).toBeVisible();
    await expect(page.locator(`#taskList li:has-text("${oldText}")`)).toHaveCount(0);
  });
});
