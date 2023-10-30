import fs from "fs";

import path from "path";
import { extractArgs } from "./extract-args";
import { filterCode } from "./filter-code";
import { sortResult } from "./sort";
import { FileT } from "./types";

export function readCodeFiles(
  dirName: string,
  rootDir: "eksempler" | "templates"
): FileT {
  const codeDirPath = path.resolve(
    process.cwd(),
    `pages/${rootDir}/${dirName}`
  );

  if (!fs.existsSync(codeDirPath)) {
    return [];
  }

  const codeFiles = fs.readdirSync(codeDirPath);

  const parsedCode = codeFiles.map((file) => {
    let code = "";

    code = fs.readFileSync(
      path.resolve(process.cwd(), `pages/${rootDir}/${dirName}/${file}`),
      "utf-8"
    );

    const args = extractArgs(code, `pages/${rootDir}/${dirName}/${file}`);

    return {
      innhold: code,
      navn: args.title ?? file.replace(".tsx", ""),
      description: args.desc,
      index: args.index ?? 1,
    };
  });

  return sortResult(parsedCode).map((x) => ({
    ...x,
    innhold: filterCode(x.innhold),
  }));
}
