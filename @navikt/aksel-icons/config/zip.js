const AdmZip = require("adm-zip");
const {
  existsSync,
  readFileSync,
  mkdirSync,
  rmSync,
  copyFileSync,
} = require("fs");
const path = require("path");
const fastGlob = require("fast-glob");
const jsYaml = require("js-yaml");

const iconFolder = "./core-icons";

async function generateFile() {
  if (existsSync(iconFolder)) {
    rmSync(iconFolder, { recursive: true, force: true });
  }
  mkdirSync(iconFolder);

  const basePath = path.resolve(__dirname, "../icons");

  const ymlList = fastGlob
    .sync("*.yml", { cwd: basePath })
    .map((fileN) => path.basename(fileN));
  const categories = new Map();

  ymlList.forEach((file) => {
    const ymlData = jsYaml.load(readFileSync(`${basePath}/${file}`), {
      schema: jsYaml.JSON_SCHEMA,
    });
    categories.set(
      ymlData.category,
      categories.get(ymlData.category)
        ? [...categories.get(ymlData.category), ymlData.name]
        : [ymlData.name]
    );
  });

  categories.forEach((value, key) => {
    mkdirSync(`${iconFolder}/${key}`);
    value.forEach((icon) =>
      copyFileSync(
        `${basePath}/${icon}.svg`,
        `${iconFolder}/${key}/${icon}.svg`
      )
    );
  });
}

async function createZipArchive() {
  const zip = new AdmZip();
  const outputFile = "aksel-icons.zip";

  await generateFile();

  zip.addLocalFolder("./core-icons");
  zip.writeZip(outputFile);
  console.log(`Created ${outputFile} successfully`);
}

createZipArchive();
