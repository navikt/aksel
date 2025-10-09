import { expect, test } from "@playwright/test";

/* Simple Button component without any props */
const previewUrl =
  "/sandbox/preview/index.html?code=N4Igxg9gJgpiBcIA8AhArgFwxAdgPgB0cACY9LXIpAenO3xAF8g";

test.describe("Check website sandbox", () => {
  test("Check if sandbox is loading for preview", async ({ page }) => {
    await page.goto(`http://testapp:3000${previewUrl}`);
    await page.waitForLoadState("domcontentloaded");

    const count = await page.locator("#sandbox-wrapper").count();
    expect(count).toBeGreaterThan(0);
  });
});
