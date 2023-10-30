import { extractArgs } from "../extract-args";

describe("Extracting args for codesnippets", () => {
  test("extractArgs should parse args", () => {
    const code = `export const args = {
      title: "Tittel",
      desc: "Description",
      index: 2
    }`;

    const args = extractArgs(code, "filename");

    expect(args).toEqual({
      title: "Tittel",
      desc: "Description",
      index: 2,
    });
  });
});
