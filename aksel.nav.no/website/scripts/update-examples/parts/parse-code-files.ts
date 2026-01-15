import fs from "node:fs";
import { FileArrayT, RootDirectoriesT } from "../types";
import { extractArgs } from "./extract-args";
import { extractJsx } from "./extract-jsx";
import { filterCode } from "./filter-code";
import { getFiles } from "./get-files";
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

export async function parseCodeFiles(
  dirName: string,
  rootDir: RootDirectoriesT,
) {
  const codeFiles = getFiles(dirName, rootDir);

  const parsedCode: FileArrayT = await Promise.all(
    codeFiles.files.map(async (file) => parseCodeFile(codeFiles.dirPath, file)),
  );

  return sortResult(parsedCode);
}

export async function parseCodeFile(dirPath: string, file: string) {
  const filePath = `${dirPath}/${file}`;
  const code = fs.readFileSync(filePath, "utf-8");
  const args = extractArgs(code, filePath);
  const filteredCode = await filterCode(code, filePath);

  const encodedCode = processAndCompressForURI(filteredCode);
  const urlBaseLength = "https://aksel.nav.no/sandbox/preview/index.html?code="
    .length;

  return {
    innhold: filteredCode,
    kompaktInnhold: await extractJsx(filteredCode),
    title: args.title ?? fixName(file.replace(".tsx", "")),
    _key: file.split(".")[0],
    navn: file.replace(".tsx", ""),
    description: args.desc,
    index: args.index ?? 1,
    sandboxBase64: processAndCompressForURI(filteredCode),
    /* We are limited to ~8000 characters in url, so disable story if too long */
    sandboxEnabled:
      urlBaseLength + encodedCode.length < 8000
        ? (args.sandbox ?? true)
        : false,
  };
}
