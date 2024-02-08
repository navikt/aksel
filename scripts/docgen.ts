import fg from "fast-glob";
import { writeFileSync } from "fs";
import * as docgen from "react-docgen-typescript";

const options: docgen.ParserOptions = {
  savePropValueAsString: true,
  shouldRemoveUndefinedFromOptional: true,

  propFilter: (prop) => {
    if (prop.name === "className" || prop.parent?.name === "RefAttributes") {
      return true;
    }
    if (prop.parent?.fileName.includes("/node_modules/@types/react/")) {
      return false;
    }
    return true;
  },
};

const tsConfigParser = docgen.withCustomConfig(`./tsconfig.esm.json`, options);

const genDocs = () => {
  const files = fg
    .sync([`./src/**/*.tsx`, "!**/*.stories.*", "!**/*.test.*", "!**/stories"])
    .filter(
      (x) =>
        !x.toLowerCase().includes("illustration") &&
        !x.toLowerCase().includes("pictogram"),
    );

  const res: docgen.ComponentDoc[][] = [];
  const fails: string[] = [];

  files.forEach((file) => {
    const doc = tsConfigParser.parse(file);
    if (doc.length > 0) {
      res.push(doc);
    } else {
      fails.push(file);
    }
  });

  console.log({ Documented: res.length, fails });

  const cleaned = res.flat().map((file) => ({
    filePath: file.filePath,
    displayName: file.displayName,
    props: file.props,
  }));

  writeFileSync(`_docs.json`, JSON.stringify(cleaned, null, 2));
};

genDocs();
/* genDocs("@navikt/internal/react"); */
