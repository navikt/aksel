import type { API, FileInfo } from "jscodeshift";
import { getLineTerminator } from "../../utils/lineterminator";
import renameProps from "../../utils/rename-props";
import { findComponentImport, findJSXElement } from "../spacing/spacing.utils";

// to look up in replacements
const deprecationMap = ["background", "borderColor", "shadow"];

export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  const root = j(file.source);

  const toSourceOptions = getLineTerminator(file.source);

  const sourceName = findComponentImport({
    file,
    j,
    name: "Box",
    packageType: "react",
  });

  if (!sourceName) {
    return;
  }

  for (const prop of deprecationMap) {
    const jsx = findJSXElement({ root, j, name: sourceName });
    // conditional renameProps()
  }

  return root.toSource(toSourceOptions);
}
