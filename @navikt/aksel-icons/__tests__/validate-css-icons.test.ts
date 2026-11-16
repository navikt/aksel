import fastglob from "fast-glob";
import path from "node:path";
import { describe, expect, test } from "vitest";
import {
  optimizeSvg,
  svgToDataUri,
  toCssVariableName,
  // @ts-expect-error -- css-icons is JavaScript without a declaration file.
} from "../config/css-icons";

describe("toCssVariableName", () => {
  test.each([
    ["MagnifyingGlass", "--aksel-icon-magnifying-glass"],
    ["Buildings2Fill", "--aksel-icon-buildings-2-fill"],
    ["ClipboardXMark", "--aksel-icon-clipboard-x-mark"],
    ["XMark", "--aksel-icon-x-mark"],
  ])("%s -> %s", (iconName, expected) => {
    expect(toCssVariableName(iconName)).toBe(expected);
  });

  test("is unique for every icon", () => {
    const names = fastglob
      .sync("*.svg", { cwd: path.resolve(__dirname, "../icons") })
      .map((file) => toCssVariableName(path.basename(file, ".svg")));

    expect(new Set(names).size).toBe(names.length);
  });
});

describe("svgToDataUri", () => {
  const svg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M10.5 3.25 4.75 10.5Z" fill="#202733"/>
</svg>`;

  test("keeps viewBox, uses currentColor and escapes unsafe characters", () => {
    const uri = svgToDataUri(optimizeSvg(svg));
    const data = uri.slice('url("'.length, -'")'.length);

    expect(uri.startsWith('url("data:image/svg+xml,')).toBe(true);
    expect(data).toContain("viewBox='0 0 24 24'");
    expect(data).toContain("fill='currentColor'");
    expect(data).not.toMatch(/["#<>]|width=|height=/);
  });
});
