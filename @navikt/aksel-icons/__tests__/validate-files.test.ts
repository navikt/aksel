import fastglob from "fast-glob";
import path from "node:path";
import { describe, expect, test } from "vitest";

const basePath = path.resolve(__dirname, "../icons");

const svgList = fastglob
  .sync("*.svg", { cwd: basePath })
  .map((fileN) => path.basename(fileN));

const ymlList = fastglob
  .sync("*.yml", { cwd: basePath })
  .map((fileN) => path.basename(fileN));

describe(`Each SVG-file has a matching YML file`, () => {
  test(`must have a corresponding YML file`, () => {
    expect(
      ymlList
        .map((yml) => yml.replace(".yml", ".svg"))
        .filter((file) => !svgList.includes(file)),
    ).toStrictEqual([]);
  });
});

describe(`Each YML-file has a matching SVG file`, () => {
  test(`must have a corresponding SVG file`, () => {
    expect(
      svgList
        .map((svg) => svg.replace(".svg", ".yml"))
        .filter((file) => !ymlList.includes(file)),
    ).toStrictEqual([]);
  });
});
