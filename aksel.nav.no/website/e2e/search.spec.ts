import { test, expect } from "@playwright/test";

test("Use search", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.getByRole("button", { name: "Åpne søk" }).click();

  await page.getByPlaceholder("Søk i dokumentasjon").click();

  await page.getByPlaceholder("Søk i dokumentasjon").fill("button");

  await page.getByRole("link", { name: "Intro" }).click();
  await expect(page).toHaveURL(
    "https://aksel.nav.no/designsystem/komponenter/button#intro"
  );

  await page.getByRole("button", { name: "Åpne søk" }).click();

  await page.getByPlaceholder("Søk i dokumentasjon").click();

  await page.getByPlaceholder("Søk i dokumentasjon").fill("innhold");

  await page.getByRole("link", { name: "2. Lag innholdet" }).click();
  await expect(page).toHaveURL(
    "https://aksel.nav.no/artikkel/slik-lager-du-en-produktside#hb35e579b13ec"
  );
});
