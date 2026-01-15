import JSON5 from "json5";
import fs from "node:fs";
import path from "node:path";
import { CodeExampleSchemaT } from "../../../components/types";
import { RootDirectoriesT } from "../types";

export function extractMetadata(
  dirName: string,
  rootDir: RootDirectoriesT,
): CodeExampleSchemaT["metadata"] {
  const codeDirPath = path.resolve(
    process.cwd(),
    `pages/${rootDir}/${dirName}`,
  );

  if (
    !fs.existsSync(codeDirPath) ||
    !fs.readdirSync(codeDirPath).find((x) => x === "meta.json")
  ) {
    return undefined;
  }

  const metadata = fs.readFileSync(
    path.resolve(process.cwd(), `pages/${rootDir}/${dirName}/meta.json`),
    "utf-8",
  );

  try {
    return JSON5.parse(metadata);
  } catch {
    console.error(`Could not parse JSON5 in ${dirName}`);
  }
}
