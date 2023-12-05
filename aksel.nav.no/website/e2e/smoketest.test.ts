import { expect, test } from "@playwright/test";
import { getDirectories } from "../scripts/update-examples/parts/get-directories";
import { parseCodeFiles } from "../scripts/update-examples/parts/parse-code-files";
import urls from "./test-urls.json";

test.describe("Smoketest all pages", () => {
  for (const url of urls) {
    test(`Check page ${url}`, async ({ page }) => {
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

  test.describe("sandbox examples (just a few)", () => {
    const examples = getDirectories("eksempler");

    const folders = [...examples];

    const randomFolders = [folders[0], folders[20], folders[50]];

    for (const folder of randomFolders) {
      const files = parseCodeFiles(folder.path, "eksempler");

      const file = files[0];
      if (!file?.sandboxEnabled) {
        continue;
      }

      const url = `/sandbox/preview/index.html?code=${file.sandboxBase64}`;

      test(`check ${folder.path} - ${file.navn}`, async ({ page }) => {
        await page.goto(`http://localhost:3000${url}`);
        // await page.waitForLoadState("domcontentloaded");
        const count = await page.locator("#sandbox-wrapper").count();

        expect(count).toBeGreaterThan(0);
      });
    }
  });
});
