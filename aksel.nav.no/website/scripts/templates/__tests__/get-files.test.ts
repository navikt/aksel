import { getFiles } from "../get-files";

describe("Testing getFiles function", () => {
  test("getFiles should list directories in /pages/eksempler", () => {
    const folders = getFiles("eksempler");

    expect(folders.length).toBeGreaterThan(0);
  });

  test("getFiles should list directories in /pages/templates", () => {
    const folders = getFiles("eksempler");

    expect(folders.length).toBeGreaterThan(0);
  });
});
