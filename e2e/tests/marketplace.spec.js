import { test, expect } from "@playwright/test";


test.describe("Marketplace Links", () => {
  test("тест обеих ссылок: Russ Outdoor + Wildberries", async ({
    page,
    context,
  }) => {
    await page.goto("http://localhost:5500/");

    // Russ Outdoor
    const russLink = page.locator("#russLink");
    await expect(russLink).toBeVisible();
    await expect(russLink).toHaveAttribute(
      "href",
      "https://www.russoutdoor.ru/",
    );

    const [russPage] = await Promise.all([
      context.waitForEvent("page"),
      russLink.click(),
    ]);
    await expect(russPage).toHaveURL(/russoutdoor\.ru/);
    russPage.close();

    // Wildberries
    const wbLink = page.locator("#wbLink");
    await expect(wbLink).toBeVisible();
    await expect(wbLink).toHaveAttribute("href", "https://www.wildberries.ru/");

    const [wbPage] = await Promise.all([
      context.waitForEvent("page"),
      wbLink.click(),
    ]);
    await expect(wbPage).toHaveURL(/wildberries\.ru/);
    wbPage.close();
  });
});
