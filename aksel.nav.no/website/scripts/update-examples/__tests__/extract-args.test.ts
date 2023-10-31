import { extractArgs } from "../parts/extract-args";

describe("Testing extractArgs function", () => {
  test("extractArgs should return null on failed parsing", () => {
    const code = `export const args {
        title: "Tittel"
        desc: "Description",
        index 2
      }`;

    const args = extractArgs(code, "filename", "test");

    expect(args).toBeNull();
  });

  test("extractArgs should parse args from codesnippet", () => {
    const code = `export const args = {
        title: "Tittel",
        desc: "Description",
        index: 2
      }`;

    const args = extractArgs(code, "filename", "test");

    expect(args).toEqual({
      title: "Tittel",
      desc: "Description",
      index: 2,
    });
  });
});
