import { expect, test } from "@playwright/test";
import { getDirectories } from "../scripts/update-examples/parts/get-directories";
import { parseCodeFiles } from "../scripts/update-examples/parts/parse-code-files";

test.describe("sandbox examples (all)", () => {
  test.describe("eksempler", async () => {
    const subdirs = getDirectories("eksempler");

    for (const subdir of subdirs) {
      const files = await parseCodeFiles(subdir.path, "eksempler");
      for (const file of files) {
        if (!file.sandboxEnabled) {
          continue;
        }

        const url = `/sandbox/preview/index.html?code=${file.sandboxBase64}`;

        test(`check ${subdir.path} - ${file.navn}`, async ({ page }) => {
          await page.goto(`http://localhost:3000${url}`);
          await page.waitForLoadState("domcontentloaded");
          const count = await page.locator("#sandbox-wrapper").count();

          expect(count).toBeGreaterThan(0);
        });
      }
    }
  });

  /* test.describe("templates", () => {
    const subdirs = getDirectories("templates");

    for (const subdir of subdirs) {
      const files = parseCodeFiles(subdir.path, "templates");
      for (const file of files) {
        if (!file.sandboxEnabled) {
          continue;
        }

        const url = `/sandbox/preview/index.html?code=${file.sandboxBase64}`;

        test(`check ${subdir.path} - ${file.navn}`, async ({ page }) => {
          await page.goto(`http://localhost:3000${url}`);
          await page.waitForLoadState("domcontentloaded");
          const count = await page.locator("#sandbox-wrapper").count();

          expect(count).toBeGreaterThan(0);
        });
      }
    }
  }); */
});
