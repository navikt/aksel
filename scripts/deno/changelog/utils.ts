import { readdirSync, statSync } from "node:fs";

export const getChangelogs = (path: string) => {
  const changelogs: string[] = [];
  const walkFiles = (dirPath: string) => {
    const files = readdirSync(dirPath);
    files.forEach((file) => {
      const filePath = `${dirPath}/${file}`;
      if (
        statSync(filePath).isDirectory() &&
        !file.startsWith("node_modules")
      ) {
        walkFiles(filePath);
      } else {
        if (file.match(/^CHANGELOG\.md$/)) {
          changelogs.push(filePath);
        }
      }
    });
  };
  walkFiles(path);
  return changelogs;
};
