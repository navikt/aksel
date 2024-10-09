import fastglob from "fast-glob";
import { readFileSync } from "fs";
import { select, selectAll } from "hast-util-select";
import { basename } from "path";
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
        const properties = root?.properties
          ? Object.keys(root.properties).sort()
          : [];

        expect(properties).toStrictEqual(
          ["viewBox", "xmlns", "height", "width", "fill"].sort(),
        );
      });

      test(`has valid xml-attr`, () => {
        const root = select(":root", iconAst);
        const xmlns = root?.properties ? root.properties.xmlns : null;
        expect(xmlns).toBe("http://www.w3.org/2000/svg");
      });

      test(`has valid viewbox`, () => {
        const root = select(":root", iconAst);
        const viewbox = root?.properties ? root.properties.viewBox : null;
        expect(viewbox).toBe("0 0 24 24");
      });

      test(`root fill is none`, () => {
        const root = select(":root", iconAst);
        const fill = root?.properties ? root.properties.fill : null;
        expect(fill).toBe("none");
      });

      test(`has valid width and height`, () => {
        const root = select(":root", iconAst);
        const width = root?.properties ? root.properties.width : null;
        const height = root?.properties ? root.properties.height : null;
        expect(width).toBe("24");
        expect(height).toBe("24");
      });

      test(`has valid stroke`, () => {
        const nodes = selectAll("*", iconAst);

        nodes.forEach((n) => {
          n.properties?.stroke &&
            expect(n.properties.stroke).toEqual("#23262A");
        });
      });

      test(`has valid stroke-width`, () => {
        const nodes = selectAll("*", iconAst);
        nodes.forEach((n) => {
          n.properties?.strokeWidth &&
            expect(n.properties?.strokeWidth).toEqual("1.5");
        });
      });
    });
  });
});
