import { test, expect } from "@playwright/test";
import urls from "./test-urls.json";
import { getDirectories } from "../scripts/update-examples/parts/get-directories";
import { parseCodeFiles } from "../scripts/update-examples/parts/parse-code-files";
import { processAndCompressForURI } from "../components/sanity-modules/code-examples/parts/Sandbox";

test.describe("Smoketest all pages", () => {
  for (const url of urls) {
    test.skip(`Check page ${url}`, async ({ page }) => {
      await page.goto(`http://localhost:3000${url}`);
      await page.waitForLoadState("domcontentloaded");

      expect(await page.locator(".vk-errorboundary").count()).toEqual(0);
      expect(await page.locator(".should-not-be-found").count()).toEqual(0);
      expect(await page.locator("#vk-notFoundId").count()).toEqual(0);

      const linkList = page.locator("a");
      for (let i = 0; i < (await linkList.count()); i++) {
        expect(await linkList.nth(i).getAttribute("href")).not.toBeNull();
        expect(await linkList.nth(i).getAttribute("href")).not.toBe(
          "/[object%20Object]"
        );
        expect(await linkList.nth(i).getAttribute("href")).not.toBe(
          "/undefined"
        );
      }
    });
  }

  test.describe("sandbox examples", () => {
    const folders = getDirectories("eksempler");

    for (const folder of folders) {
      const files = parseCodeFiles(folder.path, "eksempler");
      // if ( folder.path !== 'bodylong') {
      //   continue;
      // }

      for (const file of files) {
        // if (file.navn !== "large") {
        //   continue;
        // }

        const url = `/sandbox/preview/index.html?code=${processAndCompressForURI(
          file.innhold
        )}`;

        test(`check ${folder.path} - ${file.navn}`, async ({ page }) => {
          await page.goto(`http://localhost:3000${url}`);
          await page.waitForLoadState("domcontentloaded");
          const count = await page.locator("#sandbox-wrapper").count();

          expect(count).toBeGreaterThan(0);
        });
      }
    }
  });
});
