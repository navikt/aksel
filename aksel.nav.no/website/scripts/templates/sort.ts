import { FileT } from "./types";

export function sortResult(res: FileT) {
  return res.sort((a, b) => {
    return a.index - b.index;
  });
}
