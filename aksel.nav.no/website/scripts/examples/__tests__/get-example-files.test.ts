import { getExampleFiles } from "../get-example-files";

describe("Reading code-examples files", () => {
  test("getExampleFiles", () => {
    const files = getExampleFiles();

    expect(files.length).toBeTruthy();
  });
});

export {};
