import fs from "fs";
import path from "path";
import { DirectoryDataT, RootDirectoriesT } from "../types";

/**
 * Returns metadata for each 'page' found in directory
 * @param directory
 * @returns DirectoryDataT
 */
export function getDirectories(directory: RootDirectoriesT): DirectoryDataT {
  const rootPath = path.resolve(process.cwd(), `pages/${directory}`);

  if (!fs.existsSync(rootPath)) {
    return [];
  }

  const folders = fs
    .readdirSync(rootPath, { withFileTypes: true })
    .filter(
      (dirent) => dirent.isDirectory() && !dirent.name.startsWith("__parts"),
    )
    .map((dirent) => dirent.name);

  return folders.map((dir) => ({ path: `${dir}` }));
}
