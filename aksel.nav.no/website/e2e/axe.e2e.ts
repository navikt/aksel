import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import urls from "./sitemap-urls.json";

test.describe("Axe a11y", () => {
  for (const url of urls) {
    test(`Check page ${url}`, async ({ page }) => {
      await page.goto(`http://localhost:3000${url}`);
      await page.waitForLoadState("domcontentloaded");
      const accessibilityScanResults = await new AxeBuilder({ page })
        .disableRules([
          "scrollable-region-focusable",
          "landmark-complementary-is-top-level", // https://github.com/navikt/team-aksel/issues/643
        ])
        .exclude("iframe")
        .exclude("#aksel-expansioncard")
        .exclude(".aksel-codesnippet")
        .analyze();
      expect(accessibilityScanResults.violations).toEqual([]);
    });
  }
});

/*
Disabled rules:
- scrollable-region-focusable: Up for discussion. Should code-block be focusable for easier access and allowing scroll with keyboard?
- aksel-expansioncard / aksel-codesnippet: Errors with duplicate label-text (landmark-unique)
*/
