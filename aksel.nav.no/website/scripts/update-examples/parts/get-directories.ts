import fs from "node:fs";
import path from "node:path";
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
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  return folders.map((dir) => ({ path: `${dir}` }));
}
