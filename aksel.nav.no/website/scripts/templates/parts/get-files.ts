import fs from "fs";
import path from "path";
import { DirectoryDataT } from "./types";

/**
 * Returns metadata for each 'page' found in directory
 * @param directory
 * @returns DirectoryDataT
 */
export function getFiles(directory: "eksempler" | "templates"): DirectoryDataT {
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
