import JSON5 from "json5";
import { FileT } from "./types";

export function sortResult(res: FileT) {
  return res.sort((a, b) => {
    return getIndex(a.innhold) - getIndex(b.innhold);
  });
}

export function getIndex(str: string) {
  const args = str.match(/export const args = {([^}]+)}/)?.[1];
  if (args) {
    const obj = JSON5.parse(`{${args}}`);
    return obj?.index ?? 1;
  }
  return 1;
}
