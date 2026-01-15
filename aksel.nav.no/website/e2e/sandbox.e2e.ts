import { expect, test } from "@playwright/test";

/* Simple Button component without any props */
const previewUrl =
  "/sandbox/preview/index.html?code=N4Igxg9gJgpiBcIA8AhArgFwxAdgPgB0cACY9LXIpAenO3xAF8g";

test.describe("Check website sandbox", () => {
  test("Check if sandbox is loading for preview", async ({ page }) => {
    await page.goto(previewUrl);
    await page.waitForLoadState("domcontentloaded");

    const frameLocator = page.frameLocator('iframe[src*="sandbox"]');
    const sandboxWrapper = frameLocator.locator("#sandbox-wrapper");

    await expect(sandboxWrapper).toBeVisible({ timeout: 2000 });
    await expect(sandboxWrapper).not.toBeEmpty();
  });
});
