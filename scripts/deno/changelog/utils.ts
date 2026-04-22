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

  const order = [
    "aksel",
    "react",
    "css",
    "tokens",
    "aksel-icons",
    "tailwind",
    "aksel-stylelint",
  ];
  return changelogs.sort((a, b) => {
    const indexA = order.findIndex((name) => a.includes(`/${name}/`));
    const indexB = order.findIndex((name) => b.includes(`/${name}/`));
    return (
      (indexA === -1 ? Infinity : indexA) - (indexB === -1 ? Infinity : indexB)
    );
  });
};
