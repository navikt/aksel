import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(3000);
  await page.getByRole("button", { name: "Søk" }).click();

  const accessibilityScanResults = await new AxeBuilder({ page })
    .disableRules(["definition-list", "scrollable-region-focusable"])
    .exclude("iframe")
    .exclude("#aksel-expansioncard")
    .exclude("#toc-scroll")
    .analyze();
  expect(accessibilityScanResults.violations).toEqual([]);

  await page.getByPlaceholder("Søk gjennom hele aksel").click();
  await page.getByPlaceholder("Søk gjennom hele aksel").fill("button");

  const SearchHitsScan = await new AxeBuilder({ page })
    .disableRules(["definition-list", "scrollable-region-focusable"])
    .exclude("iframe")
    .exclude("#aksel-expansioncard")
    .exclude("#toc-scroll")
    .analyze();
  expect(SearchHitsScan.violations).toEqual([]);
});
