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

export const queryArticleViews = `
*[_type == "article_views"] {
  _id,
}
`;

export const amplitudeFetchJSON = async (chart_id: string) => {
  const url = `https://reops-proxy.intern.nav.no/amplitude/100002016/api/3/chart/${chart_id}/query`;
  console.log({ url });
  return await (await fetch(url)).json();
};

export const sum_last_n = (view_entry: { value: number }[], last_n: number) => {
  return view_entry
    .slice(-last_n) // the query holds more than 24 hours of data, but we only want the last 24
    .reduce((a: number, b: { value: number }) => a + b.value, 0);
};
