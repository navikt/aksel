import { readdirSync, readFileSync } from "fs";
import startCase from "lodash.startcase";

type MetaT = {
  name: string;
  description: string;
  created_at: Date;
  pageName: string;
}[];

describe("Icons", () => {
  test("Icons have correct name format (PascalCase)", () => {
    const icons = readdirSync("./svg/");
    icons.forEach((ic) => {
      const name = startCase(ic.replace(".svg", "")).replace(/\s/g, "");
      expect(ic.replace(".svg", "")).toEqual(name);
    });
  });

  test("All icons have metadata (meta.json)", () => {
    const metadata: MetaT = JSON.parse(readFileSync("./meta.json").toString());
    const icons = readdirSync("./svg/");

    const names = icons.map((ic) => {
      return ic.replace(".svg", "");
    });

    names.forEach((name) => {
      expect(metadata.find((x) => x.name === name)).toBeDefined();
    });
  });
});
