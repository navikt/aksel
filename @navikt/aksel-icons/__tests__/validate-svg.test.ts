/* eslint-disable vitest/no-conditional-expect */

/* TODO: Fix eslint-error */
import fastglob from "fast-glob";
import { select, selectAll } from "hast-util-select";
import { readFileSync } from "node:fs";
import { basename } from "node:path";
import parse from "rehype-parse";
import { unified } from "unified";
import { describe, expect, test } from "vitest";

const basePath = "./icons";

const svgList = fastglob
  .sync("*.svg", { cwd: basePath })
  .map((fileN) => basename(fileN));

describe(`Each icons has a valid code`, () => {
  svgList.forEach((file) => {
    describe(`${file} has valid code`, () => {
      const iconAst = unified()
        .use(parse, { fragment: true, space: "svg" })
        .parse(readFileSync(`${basePath}/${file}`));

      test(`has valid attributes on root-node`, () => {
        const root = select(":root", iconAst);
        const properties = Object.keys(root?.properties ?? []).sort();

        expect(properties).toStrictEqual(
          ["viewBox", "xmlns", "height", "width", "fill"].sort(),
        );
      });

      test(`has valid xml-attr`, () => {
        const root = select(":root", iconAst);
        expect(root?.properties?.xmlns).toBe("http://www.w3.org/2000/svg");
      });

      test(`has valid viewbox`, () => {
        const root = select(":root", iconAst);
        expect(root?.properties?.viewBox).toBe("0 0 24 24");
      });

      test(`root fill is none`, () => {
        const root = select(":root", iconAst);
        expect(root?.properties?.fill).toBe("none");
      });

      test(`has valid width and height`, () => {
        const root = select(":root", iconAst);
        expect(root?.properties?.width).toBe("24");
        expect(root?.properties?.height).toBe("24");
      });

      test(`has valid stroke`, () => {
        const nodes = selectAll("*", iconAst);

        nodes.forEach((n) => {
          if (n.properties?.stroke) {
            expect(n.properties.stroke).toEqual("#202733");
          }
        });
      });

      test(`has valid fill`, () => {
        const nodes = selectAll("*", iconAst);

        nodes.forEach((n) => {
          if (n.properties?.fill && n.properties.fill !== "none") {
            expect(n.properties.fill).toEqual("#202733");
          }
        });
      });

      test(`has valid stroke-width`, () => {
        const nodes = selectAll("*", iconAst);
        nodes.forEach((n) => {
          if (n.properties?.strokeWidth) {
            expect(n.properties?.strokeWidth).toEqual("1.5");
          }
        });
      });
    });
  });
});
