import { basename } from "path";
import { unified } from "unified";
import parse from "rehype-parse";
import fastglob from "fast-glob";
import { readFileSync } from "fs";
import { select, selectAll } from "hast-util-select";

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

      it(`has valid attributes on root-node`, () => {
        const properties = Object.keys(
          select(":root", iconAst).properties
        ).sort();

        expect(properties).toStrictEqual(
          ["viewBox", "xmlns", "height", "width", "fill"].sort()
        );
      });

      it(`has valid xml-attr`, () => {
        const xmlns = select(":root", iconAst).properties.xmlns;
        expect(xmlns).toBe("http://www.w3.org/2000/svg");
      });

      it(`has valid viewbox`, () => {
        const viewbox = select(":root", iconAst).properties.viewBox;
        expect(viewbox).toBe("0 0 24 24");
      });

      it(`root fill is none`, () => {
        const fill = select(":root", iconAst).properties.fill;
        expect(fill).toBe("none");
      });

      it(`has valid width and height`, () => {
        const width = select(":root", iconAst).properties.width;
        const height = select(":root", iconAst).properties.height;
        expect(width).toBe("24");
        expect(height).toBe("24");
      });

      it(`has valid stroke`, () => {
        const nodes = selectAll("*", iconAst);

        nodes.forEach((n) => {
          n.properties?.stroke &&
            expect(n.properties.stroke).toEqual("#23262A");
        });
      });

      it(`has valid stroke-width`, () => {
        const nodes = selectAll("*", iconAst);
        nodes.forEach((n) => {
          n.properties?.strokeWidth &&
            expect(n.properties?.strokeWidth).toEqual("1.5");
        });
      });
    });
  });
});
