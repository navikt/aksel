import { expect, test } from "@playwright/test";

test.describe("Check website search", () => {
  test("Check newest article list", async ({ page }) => {
    await page.goto("http://localhost:3000/");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(3000);
    await page.getByRole("button", { name: "Søk" }).click();

    /* Check that we have more than 0 "nyeste artikler" */
    const artikleSection = page.getByLabel("Nyeste artikler");
    expect(artikleSection).not.toBeNull();
    const links = await artikleSection.locator("li").all();

    expect(links.length).toBeGreaterThan(0);
  });

  test("Test searching for 'link'", async ({ page }) => {
    await page.goto("http://localhost:3000/");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(3000);
    await page.getByRole("button", { name: "Søk" }).click();

    await page.getByPlaceholder("Søk på artikler, f.eks. Button").fill("link");

    /* Check that we have more than 0 search-results */
    const artikleSection = page.getByLabel("Søkeresultater");
    await page.waitForTimeout(1000);
    expect(artikleSection).not.toBeNull();
    const links = await artikleSection.locator("li").all();

    expect(links.length).toBeGreaterThan(0);
  });
});
