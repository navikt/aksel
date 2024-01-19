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

export const hashString = (str: string) => {
  let output = 1;
  for (let i = 0; i < str.length; i++) {
    output *= str[i].charCodeAt(0);
    output %= Number.MAX_SAFE_INTEGER;
  }

  return output;
};

export const queryArticleURLs = `
*[_type == "aksel_artikkel"] {
  _id,
  "slug": slug.current
}
`;
