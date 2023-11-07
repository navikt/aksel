import { test, expect } from "@playwright/test";
import { getDirectories } from "../scripts/update-examples/parts/get-directories";
import { parseCodeFiles } from "../scripts/update-examples/parts/parse-code-files";

test.describe("sandbox examples (all)", () => {
  const examples = getDirectories("eksempler");
  const templates = getDirectories("templates");

  const folders = [...examples, ...templates];

  for (const folder of folders) {
    const files = parseCodeFiles(folder.path, "eksempler");
    for (const file of files) {
      if (!file.sandboxEnabled) {
        continue;
      }

      const url = `/sandbox/preview/index.html?code=${file.sandboxBase64}`;

      test(`check ${folder.path} - ${file.navn}`, async ({ page }) => {
        await page.goto(`http://localhost:3000${url}`);
        await page.waitForLoadState("domcontentloaded");
        const count = await page.locator("#sandbox-wrapper").count();

        expect(count).toBeGreaterThan(0);
      });
    }
  }
});
