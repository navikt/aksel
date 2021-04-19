const glob = require("glob");
const fs = require("fs");
const docgen = require("react-docgen-typescript").withDefaultConfig({
  shouldExtractLiteralValuesFromEnum: true,
  propFilter(prop) {
    if (prop.parent) {
      if (prop.name === "className") {
        return true;
      }
      return !prop.parent.fileName.includes("node_modules");
    }
    return true;
  },
});

const parseProps = (props) =>
  Object.values(props).map(
    ({ name, defaultValue, description, required, type }) => {
      return {
        name,
        defaultValue,
        description,
        required,
        type: type.name === "enum" ? type.raw : type.name,
      };
    }
  );

try {
  const newComponents = glob.sync("@navikt/ds-react/**/*.tsx");
  const oldComponents = glob.sync("packages/**/src/*.tsx");
  const files = [...newComponents, ...oldComponents].filter(
    (file) => !file.includes("stories")
  );

  const doc = docgen.parse(files).map(({ displayName, methods, props }) => {
    return { displayName, methods, props: parseProps(props) };
  });

  fs.writeFileSync("./react-docgen-docs.json", JSON.stringify(doc));
} catch (e) {
  console.error(e);
  console.log("Failed in generating docgen");
}
