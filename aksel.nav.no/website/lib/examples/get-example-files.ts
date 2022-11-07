import path from "path";
import fs from "fs";

/**
 * @returns array of all paths and if they are a dir or not
 */
export const getExampleFiles = (): { path: string; dir: boolean }[] => {
  const examplePath = path.resolve(process.cwd(), `pages/eksempler`);
  const res = [];

  if (fs.existsSync(examplePath)) {
    const dirs = fs
      .readdirSync(examplePath, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    dirs.map((dir) => {
      const dirPath = path.resolve(process.cwd(), `pages/eksempler/${dir}`);
      const files = fs.readdirSync(dirPath);
      files.forEach((file) => res.push({ path: `${dir}/${file}`, dir: false }));
    });
    dirs.forEach((dir) => res.push({ path: `${dir}`, dir: true }));
  }

  return res;
};
