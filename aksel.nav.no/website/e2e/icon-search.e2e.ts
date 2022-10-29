import { test, expect } from "@playwright/test";

test("Icon-search", async ({ page }) => {
  await page.goto("http://localhost:3000/designsystem/side/ikoner");

  await page.getByRole("button", { name: "Braille Braille" }).click();
  await expect(page).toHaveURL(
    "http://localhost:3000/designsystem/side/ikoner?icon=Braille"
  );

  await page
    .getByText(
      /\/\/\s+Reactimport\s+\{\s+Braille\s+\}\s+from\s+"@navikt\/ds-icons";\s+\/\/\s+SVGimport\s+Braille\s+from\s+"@/
    )
    .click();

  await page.getByRole("heading", { name: "Braille" }).click();

  await page.getByRole("button", { name: "Lukk modalvindu" }).click();
  await expect(page).toHaveURL(
    "http://localhost:3000/designsystem/side/ikoner"
  );

  await page.getByRole("button", { name: "Disability Disability" }).click();
  await expect(page).toHaveURL(
    "http://localhost:3000/designsystem/side/ikoner?icon=Disability"
  );

  await page
    .locator(
      'div[role="dialog"]:has-text("DisabilityAccessibilityLast nedlast nedSVGImport// Reactimport { Disability } fr")'
    )
    .press("Escape");
  await expect(page).toHaveURL(
    "http://localhost:3000/designsystem/side/ikoner"
  );

  await page.getByRole("button", { name: "Eye Eye" }).click();
  await expect(page).toHaveURL(
    "http://localhost:3000/designsystem/side/ikoner?icon=Eye"
  );

  await page.getByRole("dialog").press("Escape");
  await expect(page).toHaveURL(
    "http://localhost:3000/designsystem/side/ikoner"
  );

  await page.getByRole("button", { name: "Sight Sight" }).click();
  await expect(page).toHaveURL(
    "http://localhost:3000/designsystem/side/ikoner?icon=Sight"
  );

  await page.getByRole("dialog").press("Escape");
  await expect(page).toHaveURL(
    "http://localhost:3000/designsystem/side/ikoner"
  );

  await page.getByLabel("Søk i alle NAV-ikoner").click();

  await page.getByLabel("Søk i alle NAV-ikoner").fill("arrow");

  await page.getByRole("button", { name: "Cancel Cancel" }).click();
  await expect(page).toHaveURL(
    "http://localhost:3000/designsystem/side/ikoner?icon=Cancel"
  );

  await page.getByRole("dialog").press("Escape");
  await expect(page).toHaveURL(
    "http://localhost:3000/designsystem/side/ikoner"
  );

  await page.getByRole("button", { name: "Forward Forward" }).click();
  await expect(page).toHaveURL(
    "http://localhost:3000/designsystem/side/ikoner?icon=Forward"
  );

  await page
    .locator(
      'div[role="dialog"]:has-text("ForwardArrowsforward, videresendLast nedlast nedSVGImport// Reactimport { Forwar")'
    )
    .press("Escape");
  await expect(page).toHaveURL(
    "http://localhost:3000/designsystem/side/ikoner"
  );

  await page.getByLabel("Søk i alle NAV-ikoner").click();

  await page.getByLabel("Søk i alle NAV-ikoner").fill("office");

  await page.getByRole("button", { name: "Office1 Office1" }).click();
  await expect(page).toHaveURL(
    "http://localhost:3000/designsystem/side/ikoner?icon=Office1"
  );

  await page.getByRole("dialog").press("Escape");
  await expect(page).toHaveURL(
    "http://localhost:3000/designsystem/side/ikoner"
  );

  await page.getByRole("button", { name: "Office2 Office2" }).click();
  await expect(page).toHaveURL(
    "http://localhost:3000/designsystem/side/ikoner?icon=Office2"
  );

  await page.getByRole("dialog").press("Escape");
  await expect(page).toHaveURL(
    "http://localhost:3000/designsystem/side/ikoner"
  );

  await page.getByRole("heading", { name: "Buildings" }).click();

  await page.getByRole("radio", { name: "Filled" }).click();

  await page.getByRole("button", { name: "Office1Filled Office1" }).click();
  await expect(page).toHaveURL(
    "http://localhost:3000/designsystem/side/ikoner?icon=Office1Filled"
  );

  await page
    .locator(
      'div[role="dialog"]:has-text("Office1FilledBuildingsLast nedlast nedSVGImport// Reactimport { Office1Filled } ")'
    )
    .press("Escape");
  await expect(page).toHaveURL(
    "http://localhost:3000/designsystem/side/ikoner"
  );

  await page.getByRole("button", { name: "Office2Filled Office2" }).click();
  await expect(page).toHaveURL(
    "http://localhost:3000/designsystem/side/ikoner?icon=Office2Filled"
  );

  await page
    .locator(
      'div[role="dialog"]:has-text("Office2FilledBuildingsLast nedlast nedSVGImport// Reactimport { Office2Filled } ")'
    )
    .press("Escape");
  await expect(page).toHaveURL(
    "http://localhost:3000/designsystem/side/ikoner"
  );

  await page.getByRole("radio", { name: "Nye ikoner" }).click();

  await page.getByRole("button", { name: "Ny! Table Table" }).click();
  await expect(page).toHaveURL(
    "http://localhost:3000/designsystem/side/ikoner?icon=Table"
  );

  await page.getByRole("dialog").press("Escape");
  await expect(page).toHaveURL(
    "http://localhost:3000/designsystem/side/ikoner"
  );

  await page.getByRole("button", { name: "Tøm" }).click();
});
