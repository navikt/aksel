import { writeFileSync } from "fs";
import fg from "fast-glob";
import * as docgen from "react-docgen-typescript";

const options = {
  savePropValueAsString: true,
  shouldRemoveUndefinedFromOptional: true,

  propFilter: (prop: any, comp: any) => {
    if (prop.name === "className") return true;
    if (prop.declarations !== undefined && prop.declarations.length > 0) {
      const hasPropAdditionalDescription = prop.declarations.find(
        (declaration: any) => {
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

const tsConfigParser = docgen.withCustomConfig(`./tsconfig.esm.json`, options);

const genDocs = () => {
  const files = fg
    .sync([`./src/**/*.tsx`, "!**/*.stories.*", "!**/*.test.*", "!**/stories"])
    .filter(
      (x) =>
        !x.toLowerCase().includes("illustration") &&
        !x.toLowerCase().includes("pictogram")
    );

  const res: any[] = [];
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

  const cleaned = res.flat().reduce(
    (old, cur) => [
      ...old,
      {
        filePath: cur.filePath,
        displayName: cur.displayName,
        props: cur.props,
      },
    ],
    []
  );

  writeFileSync(`_docs.json`, JSON.stringify(cleaned, null, 2));
};

genDocs();
/* genDocs("@navikt/internal/react"); */
