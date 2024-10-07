/* eslint-disable import/no-named-as-default-member */
import fastglob from "fast-glob";
import fs from "fs";
import jsYaml from "js-yaml";
import path from "path";
import { describe, expect, test } from "vitest";

const basePath = path.resolve(__dirname, "../icons");

const ymlList = fastglob
  .sync("*.yml", { cwd: basePath })
  .map((fileN) => path.basename(fileN));

describe(`Each icons YML-config is valid`, () => {
  ymlList.forEach((file) => {
    test(`${file} has valid YML-config`, () => {
      const ymlData = jsYaml.load(fs.readFileSync(`${basePath}/${file}`), {
        schema: jsYaml.JSON_SCHEMA,
      });
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

function isDate(dateStr) {
  return !Number.isNaN(
    new Date(dateStr.split(".").reverse().join(".")).getDate(),
  );
}
