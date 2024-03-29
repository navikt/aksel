import fs from "fs";
import path from "path";
import { FileArrayT, RootDirectoriesT } from "../types";
import { extractArgs } from "./extract-args";
import { filterCode } from "./filter-code";
import { processAndCompressForURI } from "./sandbox-process-base64";
import { sortResult } from "./sort";

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const fixName = (str: string) =>
  capitalize(
    str
      .replace(/[^\wæøå]|_/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  ) ?? str;

export function parseCodeFiles(
  dirName: string,
  rootDir: RootDirectoriesT,
): FileArrayT {
  const codeDirPath = path.resolve(
    process.cwd(),
    `pages/${rootDir}/${dirName}`,
  );

  if (!fs.existsSync(codeDirPath)) {
    return [];
  }

  const codeFiles = fs
    .readdirSync(codeDirPath)
    .filter((x) => !x.includes(".json"));

  const parsedCode: FileArrayT = codeFiles.map((file) => {
    let code = "";

    code = fs.readFileSync(
      path.resolve(process.cwd(), `pages/${rootDir}/${dirName}/${file}`),
      "utf-8",
    );

    const args = extractArgs(code, `pages/${rootDir}/${dirName}/${file}`);

    return {
      innhold: code,
      title: args.title ?? fixName(file.replace(".tsx", "")),
      navn: file.replace(".tsx", ""),
      description: args.desc,
      index: args.index ?? 1,
      sandboxBase64: processAndCompressForURI(filterCode(code)),
      sandboxEnabled: args.sandbox ?? true,
    };
  });

  return sortResult(parsedCode).map((x) => ({
    ...x,
    innhold: filterCode(x.innhold),
  }));
}
