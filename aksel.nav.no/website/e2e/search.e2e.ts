import { expect, test } from "@playwright/test";

test.describe("Check website search", () => {
  test("Check newest article list", async ({ page }) => {
    await page.goto("http://localhost:3000/");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(3000);
    await page.getByRole("button", { name: "Søk" }).click();

    /* Check that we have more than 0 "nyeste artikler" */
    const articleSection = page.getByLabel("Nyeste artikler");
    expect(articleSection).not.toBeNull();
    const links = await articleSection.locator("li").all();

    expect(links.length).toBeGreaterThan(0);
  });

  test("Test searching for 'link'", async ({ page }) => {
    await page.goto("http://localhost:3000/");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(3000);
    await page.getByRole("button", { name: "Søk" }).click();

    await page.getByPlaceholder("Søk på artikler, f.eks. Button").fill("link");

    /* Check that we have more than 0 search-results */
    const articleSection = page.getByLabel("Søkeresultater");
    await page.waitForTimeout(1000);
    expect(articleSection).not.toBeNull();
    const links = await articleSection.locator("li").all();

    expect(links.length).toBeGreaterThan(0);
  });
});
