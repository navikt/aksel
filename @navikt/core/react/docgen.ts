/* import * as reactDocs from "react-docgen";
import fs from "fs";

const data = fs.readFileSync("src/form/checkbox/Checkbox.tsx").toString();

const componentInfo = reactDocs.parse(data);

console.log(componentInfo);
 */

const fg = require("fast-glob");
const docgen = require("react-docgen-typescript");

const options = {
  savePropValueAsString: true,

  propFilter: (prop, comp) => {
    if (prop.name === "className") return true;
    if (prop.declarations !== undefined && prop.declarations.length > 0) {
      const hasPropAdditionalDescription = prop.declarations.find(
        (declaration) => {
          return (
            !declaration.fileName.includes("node_modules") ||
            declaration.name === "RefAttributes"
          );
        }
      );

      return !!hasPropAdditionalDescription;
    }

    return true;
  },
};

const tsConfigParser = docgen.withCustomConfig("./tsconfig.esm.json", options);

const files = fg
  .sync(["src/**/*.tsx", "!**/*.stories.*", "!**/*.test.*"])
  .filter(
    (x) =>
      !x.toLowerCase().includes("illustration") &&
      !x.toLowerCase().includes("pictogram")
  );

const res: any[] = [];
const fails: any[] = [];

files.forEach((file) => {
  const doc = tsConfigParser.parse(file);
  if (doc.length > 0) {
    res.push(doc);
  } else {
    fails.push(file);
  }
});

console.log({ n: res.length, fails });
