import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import urls from "./test-urls.json";

test.describe("Axe a11y", () => {
  for (const url of urls) {
    test(`Check page ${url}`, async ({ page }) => {
      await page.goto(`http://localhost:3000${url}`);
      page.waitForLoadState("domcontentloaded");
      const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
      expect(accessibilityScanResults.violations).toEqual([]);
    });
  }
});
