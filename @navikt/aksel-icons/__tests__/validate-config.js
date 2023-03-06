const fastglob = require("fast-glob");
const path = require("path");
const jsYaml = require("js-yaml");
const fs = require("fs");

const basePath = path.resolve(__dirname, "../icons");

const ymlList = fastglob
  .sync("*.yml", { cwd: basePath })
  .map((fileN) => path.basename(fileN));

describe(`Each icons YML-config is valid`, () => {
  ymlList.forEach((file) => {
    it(`${file} has valid YML-config`, () => {
      const ymlData = jsYaml.load(fs.readFileSync(`${basePath}/${file}`), {
        schema: jsYaml.JSON_SCHEMA,
      });
      expect(ymlData.name).toBeTruthy();
      expect(ymlData.category).toBeTruthy();
      expect(ymlData.description).toBeTruthy();
      expect(ymlData.keywords).toBeTruthy();
      expect(ymlData.variant).toBeTruthy();
      expect(ymlData.keywords.length).toBeGreaterThan(0);
      expect(ymlData.date_added).toBeTruthy();
      expect(isDate(ymlData.date_added)).toBeTruthy();
      expect(ymlData.date_modified).toBeTruthy();
      expect(isDate(ymlData.date_modified)).toBeTruthy();
    });
  });
});

function isDate(dateStr) {
  return !isNaN(new Date(dateStr).getDate());
}
