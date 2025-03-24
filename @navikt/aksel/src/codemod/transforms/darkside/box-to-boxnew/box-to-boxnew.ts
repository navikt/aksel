import type { API, FileInfo } from "jscodeshift";
import { findComponentImport, findJSXElement } from "../../../utils/ast";
import { getLineTerminator } from "../../../utils/lineterminator";

// import { getLineTerminator } from "../../utils/lineterminator";
// import renameProps from "../../utils/rename-props";

// to look up in replacements
const deprecationMap = ["background", "borderColor", "shadow"];

export default function transformer(file: FileInfo, api: API) {
  console.log("### start transformer");

  const j = api.jscodeshift;
  const root = j(file.source);

  const toSourceOptions = getLineTerminator(file.source);

  const sourceName = findComponentImport({
    file,
    j,
    name: "Box",
    packageType: "react",
  });

  console.log({ sourceName });

  if (!sourceName) {
    return;
  }

  const jsx = findJSXElement({
    root,
    j,
    name: sourceName,
    originalName: "Box",
  });
  console.log({ jsx });

  for (const prop of deprecationMap) {
    // conditional renameProps()
  }

  return root.toSource(toSourceOptions);
}
