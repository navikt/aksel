import { expect, test } from "@playwright/test";
import { getDirectories } from "../scripts/update-examples/parts/get-directories";
import { getFiles } from "../scripts/update-examples/parts/get-files";
import { parseCodeFile } from "../scripts/update-examples/parts/parse-code-files";

const examples = getDirectories("eksempler");

for (const example of examples) {
  const testFiles = getFiles(example.path, "eksempler");

  for (const testFile of testFiles.files) {
    test(`check ${testFiles.dirPath} - ${testFile}`, async ({ page }) => {
      const parsedFile = await parseCodeFile(testFiles.dirPath, testFile);
      const url = `/sandbox/preview/index.html?code=${parsedFile.sandboxBase64}`;

      test.skip(
        !parsedFile.sandboxEnabled,
        `Skipping ${testFiles.dirPath} - ${testFile}`,
      );

      await page.goto(`http://localhost:3000${url}`);
      await page.waitForLoadState("domcontentloaded");
      const count = await page.locator("#sandbox-wrapper").count();

      expect(count).toBeGreaterThan(0);
    });
  }
}
