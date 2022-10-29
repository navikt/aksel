import { test, expect } from "@playwright/test";

test("Go to /designsystem and navigate sidebar", async ({ page }) => {
  await page.goto(
    "http://localhost:3000/designsystem/side/oversikt-komponenter"
  );
  await expect(page).toHaveURL(
    "http://localhost:3000/designsystem/side/oversikt-komponenter"
  );

  await expect(page.getByRole("button", { name: "Core" })).toHaveAttribute(
    "aria-expanded",
    "true"
  );

  await page.getByRole("button", { name: "Core" }).click();
  await expect(page.getByRole("button", { name: "Core" })).toHaveAttribute(
    "aria-expanded",
    "false"
  );

  await page.getByRole("button", { name: "Core" }).click();
  await expect(page.getByRole("button", { name: "Core" })).toHaveAttribute(
    "aria-expanded",
    "true"
  );

  await expect(page.getByRole("button", { name: "Internal" })).toHaveAttribute(
    "aria-expanded",
    "true"
  );
  await page.getByRole("button", { name: "Internal" }).click();
  await expect(page.getByRole("button", { name: "Internal" })).toHaveAttribute(
    "aria-expanded",
    "false"
  );

  await page.getByRole("button", { name: "Internal" }).click();
  await expect(page.getByRole("button", { name: "Internal" })).toHaveAttribute(
    "aria-expanded",
    "true"
  );

  await page.getByRole("link", { name: "CopyToClipboard" }).click();
  await expect(page).toHaveURL(
    "http://localhost:3000/designsystem/komponenter/copytoclipboard"
  );
});
