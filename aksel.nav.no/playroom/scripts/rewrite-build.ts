import fs from "fast-glob";
import { readFileSync, writeFileSync } from "node:fs";

const buildDir = "./dist/sandbox";
const buildPreviewDir = "./dist/sandbox/preview";

const frameFile = `${buildDir}/frame.html`;

let frame = readFileSync(frameFile, "utf-8");

frame = frame.replaceAll("./", "../");

writeFileSync(`${buildPreviewDir}/frame.html`, frame);

/**
 * Temp fix until this issue is resolved
 * https://github.com/seek-oss/playroom/issues/469
 */
const inputString = `$/,"/")`;
const outputString = `/, "/")`;

const jsFiles = fs.sync(`${buildDir}/preview.*.js`, { onlyFiles: true });
for (const file of jsFiles) {
  let content = readFileSync(file, "utf-8");

  content = content.replaceAll(inputString, outputString);
  writeFileSync(file, content);
}
