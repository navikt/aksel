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

const findMatch = (file) => {
  if (file.includes("nav-frontend-")) {
    const match = file.match(/nav-frontend-(.+)\/src/);
    return match && "nav-frontend-" + match[1].replace("/", "");
  } else if (file.includes("@navikt/ds-react")) {
    const match = file.match(/@navikt\/ds-react\/(.*)\//);
    return match && "@navikt/ds-react/" + match[1];
  }
};

try {
  const newComponents = glob.sync("@navikt/ds-react/**/*.tsx");
  const oldComponents = glob.sync("packages/**/src/*.tsx");
  const files = [...newComponents, ...oldComponents].filter(
    (file) => !file.includes("stories")
  );

  const found = [];
  const groups = [];
  for (const file of files) {
    if (found.some((y) => y.includes(file))) {
      continue;
    }

    found.push(file);
    const current = findMatch(file);
    const matching = files.filter((x) => {
      if (found.some((y) => y.includes(x))) {
        return false;
      }
      if (findMatch(x) === current) {
        found.push(x);
        return true;
      }
      return false;
    });
    groups.push({ name: current, files: [file, ...matching] });
  }

  /* Parses all the given typescript files */
  /* const docs = docgen.parse(files); */
  const docs = groups.map((group) => {
    const doc = docgen.parse(group.files);
    return { fileName: group.name, docs: doc };
  });

  fs.writeFileSync("./react-docgen.json", JSON.stringify(docs));
} catch (e) {
  console.error(e);
  console.log("Failed in generating docgen");
}
