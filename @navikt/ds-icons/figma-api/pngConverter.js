const fs = require("fs");
const sharp = require("sharp");
const rimraf = require("rimraf");
const pLimit = require("p-limit");

const convertToPng = async () => {
  const inputDir = "./svg/";
  const outDir = "./png/";
  const sizes = [16, 24, 128, 256];
  console.log("Converting icons to .png format");

  const limit = pLimit(20);

  if (fs.existsSync(outDir)) {
    rimraf.sync(outDir);
  }
  fs.mkdirSync(outDir);
  sizes.forEach((size) => fs.mkdirSync(outDir + size.toString()));

  await Promise.all(
    fs.readdirSync(inputDir).map((file) => {
      return limit(() =>
        sizes.forEach((size) => {
          const density = (100 * size) / 16;
          sharp(inputDir + file, { density })
            .resize(size)
            .png()
            .toFile(outDir + size.toString() + "/" + file.replace("svg", "png"))
            .catch((e) => console.error(e));
        })
      );
    })
  );
  console.log("Finished converting icons to .png format");
};

try {
  convertToPng();
} catch (e) {
  console.error(e);
}
