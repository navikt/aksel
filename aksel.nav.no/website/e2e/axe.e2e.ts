import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import urls from "./sitemap-urls.json";

test.describe("Axe a11y", () => {
  for (const url of urls) {
    test(`Check page ${url}`, async ({ page }) => {
      await page.goto(`http://localhost:3000${url}`);
      await page.waitForLoadState("domcontentloaded");
      const accessibilityScanResults = await new AxeBuilder({ page })
        .disableRules(["definition-list", "scrollable-region-focusable"])
        .exclude("iframe")
        .exclude("#aksel-expansioncard")
        .exclude("#toc-scroll")
        .analyze();
      expect(accessibilityScanResults.violations).toEqual([]);
    });
  }
});

/*
Disabled rules:
- definition-list: 'div' as a direct child of 'dl' should be valid. Ignoring failed test.
- scrollable-region-focusable: Up for discussion. Should code-block be focusable fot easier access and allowing scroll with keyboard?
- aksel-expansioncard: Errors with duplicate label-text
- toc-scroll: Axe does not wait for fadein animation to finish before scanning. This causes false positives for low contrast.
*/
