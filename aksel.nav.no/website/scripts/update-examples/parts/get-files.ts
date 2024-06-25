import fs from "fs";
import path from "path";
import { RootDirectoriesT } from "../types";

export function getFiles(dirName: string, rootDir: RootDirectoriesT) {
  const codeDirPath = path.resolve(
    process.cwd(),
    `pages/${rootDir}/${dirName}`,
  );

  if (!fs.existsSync(codeDirPath)) {
    return {
      dirPath: codeDirPath,
      files: [],
    };
  }

  return {
    dirPath: codeDirPath,
    files: fs.readdirSync(codeDirPath).filter((x) => !x.includes(".json")),
  };
}
