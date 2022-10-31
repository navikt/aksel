import { test, expect } from "@playwright/test";

test("Global-colors", async ({ page }) => {
  await page.goto("http://localhost:3000/designsystem/side/color");

  await page.getByRole("tab", { name: "Globale" }).click();
  await expect(page).toHaveURL(
    "http://localhost:3000/designsystem/side/color/globale"
  );

  await page.getByRole("button", { name: "nav-red #C30000" }).click();
  await expect(page).toHaveURL(
    "http://localhost:3000/designsystem/side/color/globale?color=navds-global-color-nav-red"
  );

  await page.locator('code:has-text("#C30000")').click();

  await page.getByText("rgb(195, 0, 0)").click();

  await page.getByText("hsl(0, 100%, 38%)").click();

  await page
    .getByText(
      /\/\*\s+CSS\s+\*\/var\(--navds-global-color-nav-red\);\s+\/\*\s+Less\s+\*\/@navds-global-color-nav-re/
    )
    .click();

  await page.getByRole("button", { name: "Lukk modalvindu" }).click();
  await expect(page).toHaveURL(
    "http://localhost:3000/designsystem/side/color/globale"
  );

  await page.getByRole("button", { name: "gray-100 #F1F1F1" }).click();
  await expect(page).toHaveURL(
    "http://localhost:3000/designsystem/side/color/globale?color=navds-global-color-gray-100"
  );

  await page
    .locator(
      'div[role="dialog"]:has-text("Gray 100Global fargegray-100FargeverdierHEX:#F1F1F1RGB:rgb(241, 241, 241)HSL:hsl")'
    )
    .press("Escape");
  await expect(page).toHaveURL(
    "http://localhost:3000/designsystem/side/color/globale"
  );

  await page.getByRole("button", { name: "red-50 #FDE8E6" }).click();
  await expect(page).toHaveURL(
    "http://localhost:3000/designsystem/side/color/globale?color=navds-global-color-red-50"
  );

  await page
    .locator(
      'div[role="dialog"]:has-text("Red 50Global fargered-50FargeverdierHEX:#FDE8E6RGB:rgb(253, 232, 230)HSL:hsl(5, ")'
    )
    .press("Escape");
  await expect(page).toHaveURL(
    "http://localhost:3000/designsystem/side/color/globale"
  );

  await page.getByRole("button", { name: "red-400 #D05C4A" }).click();
  await expect(page).toHaveURL(
    "http://localhost:3000/designsystem/side/color/globale?color=navds-global-color-red-400"
  );

  await page
    .locator(
      'div[role="dialog"]:has-text("Red 400Global fargered-400FargeverdierHEX:#D05C4ARGB:rgb(208, 92, 74)HSL:hsl(8, ")'
    )
    .press("Escape");
  await expect(page).toHaveURL(
    "http://localhost:3000/designsystem/side/color/globale"
  );

  await page.getByRole("button", { name: "red-900 #480900" }).click();
  await expect(page).toHaveURL(
    "http://localhost:3000/designsystem/side/color/globale?color=navds-global-color-red-900"
  );

  await page
    .locator(
      'div[role="dialog"]:has-text("Red 900Global fargered-900FargeverdierHEX:#480900RGB:rgb(72, 9, 0)HSL:hsl(8, 100")'
    )
    .press("Escape");
  await expect(page).toHaveURL(
    "http://localhost:3000/designsystem/side/color/globale"
  );

  await page.getByRole("button", { name: "blue-500 #0067C5" }).click();
  await expect(page).toHaveURL(
    "http://localhost:3000/designsystem/side/color/globale?color=navds-global-color-blue-500"
  );

  await page
    .locator(
      'div[role="dialog"]:has-text("Blue 500Global fargeblue-500FargeverdierHEX:#0067C5RGB:rgb(0, 103, 197)HSL:hsl(2")'
    )
    .press("Escape");
  await expect(page).toHaveURL(
    "http://localhost:3000/designsystem/side/color/globale"
  );

  await page.getByRole("button", { name: "orange-50 #FFF9F0" }).click();
  await expect(page).toHaveURL(
    "http://localhost:3000/designsystem/side/color/globale?color=navds-global-color-orange-50"
  );

  await page
    .locator(
      'div[role="dialog"]:has-text("Orange 50Global fargeorange-50FargeverdierHEX:#FFF9F0RGB:rgb(255, 249, 240)HSL:h")'
    )
    .press("Escape");
  await expect(page).toHaveURL(
    "http://localhost:3000/designsystem/side/color/globale"
  );

  await page.getByRole("button", { name: "orange-500 #FF9100" }).click();
  await expect(page).toHaveURL(
    "http://localhost:3000/designsystem/side/color/globale?color=navds-global-color-orange-500"
  );

  await page
    .locator(
      'div[role="dialog"]:has-text("Orange 500Global fargeorange-500FargeverdierHEX:#FF9100RGB:rgb(255, 145, 0)HSL:h")'
    )
    .press("Escape");
  await expect(page).toHaveURL(
    "http://localhost:3000/designsystem/side/color/globale"
  );

  await page.getByRole("button", { name: "green-300 #66C786" }).click();
  await expect(page).toHaveURL(
    "http://localhost:3000/designsystem/side/color/globale?color=navds-global-color-green-300"
  );

  await page
    .locator(
      'div[role="dialog"]:has-text("Green 300Global fargegreen-300FargeverdierHEX:#66C786RGB:rgb(102, 199, 134)HSL:h")'
    )
    .press("Escape");
  await expect(page).toHaveURL(
    "http://localhost:3000/designsystem/side/color/globale"
  );

  await page.getByRole("button", { name: "green-800 #005519" }).click();
  await expect(page).toHaveURL(
    "http://localhost:3000/designsystem/side/color/globale?color=navds-global-color-green-800"
  );

  await page
    .locator(
      'div[role="dialog"]:has-text("Green 800Global fargegreen-800FargeverdierHEX:#005519RGB:rgb(0, 85, 25)HSL:hsl(1")'
    )
    .press("Escape");
  await expect(page).toHaveURL(
    "http://localhost:3000/designsystem/side/color/globale"
  );

  await page.getByRole("button", { name: "deepblue-100 #CCE2F0" }).click();
  await expect(page).toHaveURL(
    "http://localhost:3000/designsystem/side/color/globale?color=navds-global-color-deepblue-100"
  );

  await page
    .locator(
      'div[role="dialog"]:has-text("Deepblue 100Global fargedeepblue-100FargeverdierHEX:#CCE2F0RGB:rgb(204, 226, 240")'
    )
    .press("Escape");
  await expect(page).toHaveURL(
    "http://localhost:3000/designsystem/side/color/globale"
  );

  await page.getByRole("button", { name: "deepblue-700 #004367" }).click();
  await expect(page).toHaveURL(
    "http://localhost:3000/designsystem/side/color/globale?color=navds-global-color-deepblue-700"
  );

  await page
    .locator(
      'div[role="dialog"]:has-text("Deepblue 700Global fargedeepblue-700FargeverdierHEX:#004367RGB:rgb(0, 67, 103)HS")'
    )
    .press("Escape");
  await expect(page).toHaveURL(
    "http://localhost:3000/designsystem/side/color/globale"
  );

  await page.getByRole("button", { name: "lightblue-200 #B5F1FF" }).click();
  await expect(page).toHaveURL(
    "http://localhost:3000/designsystem/side/color/globale?color=navds-global-color-lightblue-200"
  );

  await page
    .locator(
      'div[role="dialog"]:has-text("Lightblue 200Global fargelightblue-200FargeverdierHEX:#B5F1FFRGB:rgb(181, 241, 2")'
    )
    .press("Escape");
  await expect(page).toHaveURL(
    "http://localhost:3000/designsystem/side/color/globale"
  );

  await page.getByRole("button", { name: "lightblue-800 #236B7D" }).click();
  await expect(page).toHaveURL(
    "http://localhost:3000/designsystem/side/color/globale?color=navds-global-color-lightblue-800"
  );

  await page
    .locator(
      'div[role="dialog"]:has-text("Lightblue 800Global fargelightblue-800FargeverdierHEX:#236B7DRGB:rgb(35, 107, 12")'
    )
    .press("Escape");
  await expect(page).toHaveURL(
    "http://localhost:3000/designsystem/side/color/globale"
  );

  await page.getByRole("button", { name: "purple-100 #E0D8E9" }).click();
  await expect(page).toHaveURL(
    "http://localhost:3000/designsystem/side/color/globale?color=navds-global-color-purple-100"
  );

  await page
    .locator(
      'div[role="dialog"]:has-text("Purple 100Global fargepurple-100FargeverdierHEX:#E0D8E9RGB:rgb(224, 216, 233)HSL")'
    )
    .press("Escape");
  await expect(page).toHaveURL(
    "http://localhost:3000/designsystem/side/color/globale"
  );

  await page.getByRole("button", { name: "purple-700 #412B5D" }).click();
  await expect(page).toHaveURL(
    "http://localhost:3000/designsystem/side/color/globale?color=navds-global-color-purple-700"
  );

  await page
    .locator(
      'div[role="dialog"]:has-text("Purple 700Global fargepurple-700FargeverdierHEX:#412B5DRGB:rgb(65, 43, 93)HSL:hs")'
    )
    .press("Escape");
  await expect(page).toHaveURL(
    "http://localhost:3000/designsystem/side/color/globale"
  );

  await page.getByRole("button", { name: "limegreen-200 #ECF399" }).click();
  await expect(page).toHaveURL(
    "http://localhost:3000/designsystem/side/color/globale?color=navds-global-color-limegreen-200"
  );

  await page
    .locator(
      'div[role="dialog"]:has-text("Limegreen 200Global fargelimegreen-200FargeverdierHEX:#ECF399RGB:rgb(236, 243, 1")'
    )
    .press("Escape");
  await expect(page).toHaveURL(
    "http://localhost:3000/designsystem/side/color/globale"
  );

  await page.getByRole("button", { name: "limegreen-700 #7F8900" }).click();
  await expect(page).toHaveURL(
    "http://localhost:3000/designsystem/side/color/globale?color=navds-global-color-limegreen-700"
  );

  await page
    .locator(
      'div[role="dialog"]:has-text("Limegreen 700Global fargelimegreen-700FargeverdierHEX:#7F8900RGB:rgb(127, 137, 0")'
    )
    .press("Escape");
  await expect(page).toHaveURL(
    "http://localhost:3000/designsystem/side/color/globale"
  );
});
