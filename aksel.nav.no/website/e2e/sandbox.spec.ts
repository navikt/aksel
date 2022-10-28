import { test, expect } from "@playwright/test";

test("Test sandbox-examples", async ({ page }) => {
  await page.goto("http://localhost:3000/designsystem/komponenter/checkbox");

  await page.frameLocator("#Kode-eksempler").getByLabel("Bakerst").check();

  await page.frameLocator("#Kode-eksempler").getByLabel("Midterst").check();

  await page.frameLocator("#Kode-eksempler").getByLabel("Fremst").check();

  await page.getByRole("tab", { name: "Small" }).click();

  await page.frameLocator("#Kode-eksempler").getByLabel("Midterst").check();

  await page.getByRole("tab", { name: "Description" }).click();

  await page.frameLocator("#Kode-eksempler").getByLabel("Midterst").check();

  await page.getByRole("tab", { name: "Indeterminate" }).click();

  await page.frameLocator("#Kode-eksempler").getByLabel("Fremst").check();

  await page.frameLocator("#Kode-eksempler").getByLabel("Bakerst").check();

  await page.frameLocator("#Kode-eksempler").getByLabel("Midterst").check();

  await page.getByRole("link", { name: "Button" }).click();

  await expect(page).toHaveURL(
    "http://localhost:3000/designsystem/komponenter/button"
  );

  await page
    .frameLocator("#Kode-eksempler")
    .getByRole("button", { name: "Primary" })
    .click();

  await page.getByRole("tab", { name: "Icon" }).click();

  await page
    .frameLocator("#Kode-eksempler")
    .getByRole("button", { name: "Rediger" })
    .click();

  await page.getByRole("link", { name: "Search" }).click();
  await expect(page).toHaveURL(
    "http://localhost:3000/designsystem/komponenter/search"
  );

  await page
    .frameLocator("#Kode-eksempler")
    .getByLabel("Søk alle NAV sine sider")
    .click();

  await page
    .frameLocator("#Kode-eksempler")
    .getByLabel("Søk alle NAV sine sider")
    .fill("test");

  await page
    .frameLocator("#Kode-eksempler")
    .getByRole("button", { name: "Søk" })
    .click();
});
