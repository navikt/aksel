import path from "path";
import fs from "fs";
import JSON5 from "json5";

export const getDesc = (str: string) => {
  const args = str.match(/export const args = {([^}]+)}/)?.[1];
  if (args) {
    const obj = JSON5.parse(`{${args}}`);
    return obj?.desc ?? null;
  }
  return null;
};

export const filterCode = (code: string) => {
  const exampleList = code
    .substring(0, code.indexOf("export const args ="))
    .split("\n");

  const storyIndex = exampleList.findIndex(
    (x) => x === "/* Storybook story */"
  );

  if (storyIndex === -1) {
    return exampleList
      .filter((line) => !line.includes("withDsExample"))
      .join("\n")
      .trim();
  }

  return exampleList
    .filter((_, idx) => idx < storyIndex || idx > storyIndex + 3)
    .filter((line) => !line.includes("withDsExample"))
    .join("\n")
    .trim();
};

export const getIndex = (str: string) => {
  const args = str.match(/export const args = {([^}]+)}/)?.[1];
  if (args) {
    const obj = JSON5.parse(`{${args}}`);
    return obj?.index ?? 1;
  }
  return 1;
};

type FileT = { innhold: string; navn: string; description: string | null }[];

const sortResult = (res: FileT) => {
  return res.sort((a, b) => {
    return getIndex(a.innhold) - getIndex(b.innhold);
  });
};

/**
 *
 * @param dirName Directory name
 * @returns File-content for files in dir + filename
 */
export const readExampleFiles = (dirName: string): FileT => {
  const examplePath = path.resolve(process.cwd(), `pages/eksempler/${dirName}`);
  if (fs.existsSync(examplePath)) {
    const files = fs.readdirSync(examplePath);

    const res = files.map((file) => {
      let code = "";
      const filepath = path.resolve(
        process.cwd(),
        `pages/eksempler/${dirName}/${file}`
      );
      code = fs.readFileSync(filepath, "utf-8");
      return {
        innhold: code,
        navn: file.replace(".tsx", ""),
        description: getDesc(code),
      };
    });
    return sortResult(res).map((x) => ({
      ...x,
      innhold: filterCode(x.innhold),
    }));
  }
  return [];
};

/**
 *
 * @param fileName example filename including dir: button/primary.tsx
 * @returns File-content for file + filename
 */
export const readExampleFile = (
  fileName: string
): { innhold: string; navn: string } => {
  const examplePath = path.resolve(
    process.cwd(),
    `pages/eksempler/${fileName}`
  );

  let code = "";
  code = fs.readFileSync(examplePath, "utf-8");
  return {
    innhold: filterCode(code),
    navn: fileName.replace(".tsx", ""),
  };
};
