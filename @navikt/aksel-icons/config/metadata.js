const fastglob = require("fast-glob");
const path = require("path");
const jsYaml = require("js-yaml");
const fs = require("fs");

const basePath = path.resolve(__dirname, "../icons");

const ymlList = fastglob
  .sync("*.yml", { cwd: basePath })
  .map((fileN) => path.basename(fileN));

const metadata = {};

ymlList.forEach((file) => {
  const ymlData = jsYaml.load(fs.readFileSync(`${basePath}/${file}`), {
    schema: jsYaml.JSON_SCHEMA,
  });
  const iconName = file.replace(".yml", "");
  metadata[iconName] = { id: iconName, ...ymlData };
});

fs.writeFileSync(
  path.resolve(__dirname, "../dist/metadata.js"),
  `const metadata = ${JSON.stringify(metadata)};\n\n module.exports = metadata;`
);

fs.writeFileSync(
  path.resolve(__dirname, "../dist/metadata.d.ts"),
  `export type AkselIcon = {
    id: string;
    name: string;
    category: 'major' | 'minor';
    description: string;
    keywords: string[];
    date_added: Date;
    date_modified: Date;
  }

  declare const metadata: {
    [iconId: string]: AkselIcon;
  };

  export default metadata;`
);
