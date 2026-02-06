import { existsSync, mkdirSync, rmSync } from "node:fs";

function getPath(subPath: string) {
  return `${process.cwd()}/${subPath}`;
}

if (existsSync(getPath("temp"))) {
  rmSync(getPath("temp"), { recursive: true });
}

mkdirSync(getPath("temp"));
mkdirSync(getPath("temp/local"));
mkdirSync(getPath("temp/remote"));
