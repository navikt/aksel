import { test, expect } from "@playwright/test";

test("Navigate tema and prinsipp", async ({ page }) => {
  await page.goto("http://localhost:3000/tema/innholdsarbeid");

  await page.getByRole("link", { name: "Temaer" }).click();
  await expect(page).toHaveURL("http://localhost:3000/tema");

  await page.getByRole("link", { name: "Brukerinnsikt 16 Artikler" }).click();
  await expect(page).toHaveURL("http://localhost:3000/tema/brukerinnsikt");

  await page.getByRole("link", { name: "Temaer" }).click();
  await expect(page).toHaveURL("http://localhost:3000/tema");

  await page
    .getByRole("link", { name: "Universell utforming 26 Artikler" })
    .click();
  await expect(page).toHaveURL(
    "http://localhost:3000/tema/universell-utforming"
  );

  await page.getByRole("link", { name: "Temaer" }).click();
  await expect(page).toHaveURL("http://localhost:3000/tema");

  await page.getByRole("link", { name: "Interne flater 3 Artikler" }).click();
  await expect(page).toHaveURL("http://localhost:3000/tema/interne-flater");

  await page.getByRole("link", { name: "Temaer" }).click();
  await expect(page).toHaveURL("http://localhost:3000/tema");

  await page.getByRole("link", { name: "Aksel" }).click();
  await expect(page).toHaveURL("http://localhost:3000/");

  await page.getByRole("link", { name: "Utforsk alle prinsippene" }).click();
  await expect(page).toHaveURL(
    "http://localhost:3000/prinsipper/brukeropplevelse"
  );

  await page
    .getByRole("link", { name: "1. Jeg får tillit og muligheter" })
    .click();
  await expect(page).toHaveURL(
    "http://localhost:3000/prinsipper/brukeropplevelse/jeg-far-tillit-og-muligheter"
  );

  await page
    .getByRole("link", { name: "Prinsipper for brukeropplevelse" })
    .click();
  await expect(page).toHaveURL(
    "http://localhost:3000/prinsipper/brukeropplevelse"
  );

  await page
    .getByRole("heading", {
      name: "2. Jeg blir møtt på min situasjon og mine behov",
    })
    .getByRole("link", {
      name: "2. Jeg blir møtt på min situasjon og mine behov",
    })
    .click();
  await expect(page).toHaveURL(
    "http://localhost:3000/prinsipper/brukeropplevelse/jeg-blir-mott-pa-min-situasjon-og-behov"
  );

  await page
    .getByRole("link", { name: "Prinsipper for brukeropplevelse" })
    .click();
  await expect(page).toHaveURL(
    "http://localhost:3000/prinsipper/brukeropplevelse"
  );

  await page
    .getByRole("heading", { name: "3. NAV er min støttespiller" })
    .getByRole("link", { name: "3. NAV er min støttespiller" })
    .click();
  await expect(page).toHaveURL(
    "http://localhost:3000/prinsipper/brukeropplevelse/nav-er-min-stottespiller"
  );

  await page
    .getByRole("link", { name: "Prinsipper for brukeropplevelse" })
    .click();
  await expect(page).toHaveURL(
    "http://localhost:3000/prinsipper/brukeropplevelse"
  );

  await page
    .getByRole("heading", { name: "4. Jeg blir inkludert" })
    .getByRole("link", { name: "4. Jeg blir inkludert" })
    .click();
  await expect(page).toHaveURL(
    "http://localhost:3000/prinsipper/brukeropplevelse/jeg-blir-inkludert"
  );

  await page
    .getByRole("link", { name: "Prinsipper for brukeropplevelse" })
    .click();
  await expect(page).toHaveURL(
    "http://localhost:3000/prinsipper/brukeropplevelse"
  );
});
