const glob = require("glob");
const fs = require("fs");

const docgen = require("react-docgen-typescript").withDefaultConfig({
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

try {
  const newComponents = glob.sync("@navikt/ds-react/**/*.tsx");
  const oldComponents = glob.sync("packages/**/src/*.tsx");
  const files = [...newComponents, ...oldComponents].filter(
    (file) => !file.includes("stories")
  );

  /* Parses all the given typescript files */
  const docs = docgen.parse(files);

  /*  Finds and sets fileName for each component*/
  const withPath = docs.map((doc) => {
    let paths = [];
    for (const key in doc.props) {
      doc.props[key].parent && paths.push(doc.props[key].parent.fileName);
    }

    paths = paths
      .filter((file) => !file.includes("node_modules"))
      .map((file) => {
        if (file.includes("nav-frontend-")) {
          const match = file.match(/nav-frontend-(.+)\/src/);
          return match && "nav-frontend-" + match[1].replace("/", "");
        } else if (file.includes("@navikt/ds-react")) {
          const match = file.match(/@navikt\/ds-react\/(.*)\//);
          return match && "@navikt/ds-react/" + match[1];
        }
        return file;
      });

    return {
      fileName: [...new Set(paths)][0],
      ...doc,
    };
  });

  fs.writeFileSync("./react-docgen.json", JSON.stringify(withPath));
} catch (e) {
  console.error(e);
  console.log("Failed in generating docgen");
}
