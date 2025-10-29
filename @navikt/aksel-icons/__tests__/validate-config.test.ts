import fastglob from "fast-glob";
import { JSON_SCHEMA, load } from "js-yaml";
import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "vitest";
import { IconYml } from "../config/figma/make-configs";

const basePath = path.resolve(__dirname, "../icons");

const ymlList = fastglob
  .sync("*.yml", { cwd: basePath })
  .map((fileN) => path.basename(fileN));

describe(`Each icons YML-config is valid`, () => {
  ymlList.forEach((file) => {
    test(`${file} has valid YML-config`, () => {
      const ymlData = load(fs.readFileSync(`${basePath}/${file}`).toString(), {
        schema: JSON_SCHEMA,
      }) as IconYml;

      expect(ymlData.name).toBeTruthy();
      expect(ymlData.category).toBeTruthy();
      expect(ymlData.sub_category).toBeTruthy();
      expect(ymlData.keywords).toBeTruthy();
      expect(ymlData.variant).toBeTruthy();
      expect(ymlData.keywords.length).toBeGreaterThan(0);
      expect(ymlData.updated_at).toBeTruthy();
      expect(isDate(ymlData.updated_at)).toBeTruthy();
      expect(ymlData.created_at).toBeTruthy();
      expect(isDate(ymlData.created_at)).toBeTruthy();
    });
  });
});

function isDate(dateStr: string) {
  return !Number.isNaN(
    new Date(dateStr.split(".").reverse().join(".")).getDate(),
  );
}
