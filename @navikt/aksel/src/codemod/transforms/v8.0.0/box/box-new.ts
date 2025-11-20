import type { API, FileInfo } from "jscodeshift";
import { getLineTerminator } from "../../../utils/lineterminator";

export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  const root = j(file.source);

  const toSourceOptions = getLineTerminator(file.source);

  if (file.source.includes("TODO: Aksel box migration")) {
    return root.toSource(toSourceOptions);
  }

  return "";
}
