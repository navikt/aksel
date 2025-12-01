import { FileArrayT } from "../types";

export function sortResult(res: FileArrayT) {
  return res.sort((a, b) => {
    return a.index - b.index;
  });
}
