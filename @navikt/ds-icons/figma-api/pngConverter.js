const fs = require("fs");
const sharp = require("sharp");
const rimraf = require("rimraf");

const convertToPng = () => {
  const inputDir = "./svg/";
  const outDir = "./png/";
  const sizes = [16, 24, 128, 256];
  console.log("Converting icons to .png format");

  if (fs.existsSync(outDir)) {
    rimraf.sync(outDir);
  }
  fs.mkdirSync(outDir);
  sizes.forEach((size) => fs.mkdirSync(outDir + size.toString()));

  fs.readdirSync(inputDir).forEach((file) => {
    sizes.forEach((size) => {
      const density = (72 * size) / 16;
      sharp(inputDir + file, { density })
        .resize(size)
        .png()
        .toFile(outDir + size.toString() + "/" + file.replace("svg", "png"))
        .catch((e) => console.error(e));
    });
  });
};

try {
  convertToPng();
} catch (e) {
  console.error(e);
}
