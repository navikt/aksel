import { existsSync, mkdirSync, readdirSync } from "fs";
import sharp from "sharp";
import rimraf from "rimraf";
import pLimit from "p-limit";

const convertToPng = async () => {
  const inputDir = "./svg/";
  const outDir = "./png/";
  const sizes = [16, 24, 128, 256];
  console.log("Converting icons to .png format");

  const limit = pLimit(20);

  if (existsSync(outDir)) {
    rimraf.sync(outDir);
  }
  mkdirSync(outDir);
  sizes.forEach((size) => mkdirSync(outDir + size.toString()));

  await Promise.all(
    readdirSync(inputDir).map((file) => {
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
