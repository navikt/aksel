import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { getDirectories } from "../scripts/update-examples/parts/get-directories";
import { getFiles } from "../scripts/update-examples/parts/get-files";

//import urls from "./sitemap-urls.json";

const examples = getDirectories("eksempler");

test.describe("Axe a11y", () => {
  for (const example of examples) {
    const testFiles = getFiles(example.path, "eksempler");

    for (const testFile of testFiles.files) {
      const url = `/eksempler/${example.path}/${testFile.replace(".tsx", "")}`;

      test(`Check page ${url}`, async ({ page }) => {
        await page.goto(`http://localhost:3000${url}`);
        //await page.waitForLoadState("domcontentloaded");
        const a11yScanResults = await new AxeBuilder({
          page,
        })
          .disableRules(["page-has-heading-one"])
          .analyze();
        expect(a11yScanResults.violations).toEqual([]);
      });
    }
  }

  // TODO: Ser ikke ut som axe plukker opp page-attributtet på button i Pagination...
  // TODO: Templates

  /* for (const url of urls) {
    test(`Check page ${url}`, async ({ page }) => {
      await page.goto(`http://localhost:3000${url}`);
      await page.waitForLoadState("domcontentloaded");
      const a11yScanResults = await new AxeBuilder({ page })
        .disableRules(["definition-list", "scrollable-region-focusable"])
        .exclude("iframe")
        .exclude("#aksel-expansioncard")
        .exclude("#toc-scroll")
        .exclude("#toc-scroll")
        .exclude(".aksel-codesnippet")
        .analyze();
      expect(a11yScanResults.violations).toEqual([]);
    });
  } */
});

/*
Disabled rules:
- definition-list: 'div' as a direct child of 'dl' should be valid. Ignoring failed test.
- scrollable-region-focusable: Up for discussion. Should code-block be focusable fot easier access and allowing scroll with keyboard?
- aksel-expansioncard: Errors with duplicate label-text
- toc-scroll: Axe does not wait for fadein animation to finish before scanning. This causes false positives for low contrast.
*/
