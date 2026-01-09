import { readFileSync, writeFileSync } from "node:fs";

const buildDir = "./dist/sandbox";
const buildPreviewDir = "./dist/sandbox/preview";

const frameFile = `${buildDir}/frame.html`;

let frame = readFileSync(frameFile, "utf-8");

frame = frame.replaceAll("./", "../");

writeFileSync(`${buildPreviewDir}/frame.html`, frame);
