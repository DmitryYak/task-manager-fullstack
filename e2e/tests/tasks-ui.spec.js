import { test, expect } from "@playwright/test";

test("smoke ui", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Task|Manager|Example/i);
});
