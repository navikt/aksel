import { test, expect } from "@playwright/test";
import urls from "./test-urls.json";

test.describe("Smoketest all pages", () => {
  for (const url of urls) {
    test(`Check page ${url}`, async ({ page }) => {
      await page.goto(`http://localhost:3000${url}`);
      page.waitForLoadState("domcontentloaded");

      expect(await page.locator(".vk-errorboundary").count()).toEqual(0);
      expect(await page.locator(".should-not-be-found").count()).toEqual(0);
      expect(await page.locator("#vk-notFoundId").count()).toEqual(0);

      const linkList = page.locator("a");
      for (let i = 0; i < (await linkList.count()); i++) {
        expect(await linkList.nth(i).getAttribute("href")).not.toBeNull();
        expect(await linkList.nth(i).getAttribute("href")).not.toBe(
          "/[object%20Object]"
        );
        expect(await linkList.nth(i).getAttribute("href")).not.toBe(
          "/undefined"
        );
      }
    });
  }
});
