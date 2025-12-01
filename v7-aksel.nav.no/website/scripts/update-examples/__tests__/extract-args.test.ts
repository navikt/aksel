import { describe, expect, test } from "vitest";
import { extractArgs } from "../parts/extract-args";

describe("Testing extractArgs function", () => {
  test("extractArgs should return {} on failed parsing", () => {
    const code = `export const args {
        title: "Tittel"
        desc: "Description",
        index 2
      }`;

    const args = extractArgs(code, "filename", "test");

    expect(args).toStrictEqual({});
  });

  test("extractArgs should parse args from codesnippet", () => {
    const code = `export const args = {
        title: "Tittel",
        desc: "Description",
        index: 2
      }`;

    const args = extractArgs(code, "filename", "test");

    expect(args).toStrictEqual({
      title: "Tittel",
      desc: "Description",
      index: 2,
    });
  });

  test("extractArgs should parse args with markdown links", () => {
    const code = `export const args = {
      index: 10,
      desc: "[OverridableComponent](https://aksel.nav.no/grunnleggende/kode/overridablecomponent)... '<a>'-tag, ... '<Link>'-komponent.",
    };`;

    const args = extractArgs(code, "filename", "test");

    expect(args).toStrictEqual({
      desc: "[OverridableComponent](https://aksel.nav.no/grunnleggende/kode/overridablecomponent)... '<a>'-tag, ... '<Link>'-komponent.",
      index: 10,
    });
  });
});
