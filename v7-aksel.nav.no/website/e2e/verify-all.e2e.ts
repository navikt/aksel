import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import urls from "./sitemap-urls-v7.json";

test.describe("Validate CMS-link and A11y on all pages", () => {
  for (const url of urls) {
    test(`Page ${url}`, async ({ page }) => {
      await page.goto(url);
      await page.waitForLoadState("domcontentloaded");

      /**
       * Check for error-boundary, 500, 404 and error-pages
       */
      expect(await page.locator(".vk-error").count()).toEqual(0);

      /**
       * Validates a11y
       */
      const accessibilityScanResults = await new AxeBuilder({ page })
        .disableRules([
          "scrollable-region-focusable",
          "landmark-complementary-is-top-level", // https://github.com/navikt/team-aksel/issues/643
        ])
        .exclude("iframe")
        .exclude("#aksel-expansioncard")
        .exclude(".aksel-codesnippet")
        .exclude("[data-axe-ignore]")
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });
  }
});
