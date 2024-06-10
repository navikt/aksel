import { expect, test } from "@playwright/test";
import { getDirectories } from "../scripts/update-examples/parts/get-directories";
import { getFiles } from "../scripts/update-examples/parts/get-files";
import { parseCodeFile } from "../scripts/update-examples/parts/parse-code-files";

const examples = getDirectories("eksempler");

const folders = [...examples];

const randomFolders = [folders[0], folders[20], folders[50]];

for (const folder of randomFolders) {
  const testFiles = getFiles(folder.path, "eksempler");

  const testFile = testFiles.files[0];

  test(`check ${folder.path} - ${testFile}`, async ({ page }) => {
    const parsedFile = await parseCodeFile(testFiles.dirPath, testFile);
    const url = `/sandbox/preview/index.html?code=${parsedFile.sandboxBase64}`;

    test.skip(
      !parsedFile.sandboxEnabled,
      `Skipping ${folder.path} - ${testFile}`,
    );

    await page.goto(`http://localhost:3000${url}`);
    const count = await page.locator("#sandbox-wrapper").count();

    expect(count).toBeGreaterThan(0);
  });
}
