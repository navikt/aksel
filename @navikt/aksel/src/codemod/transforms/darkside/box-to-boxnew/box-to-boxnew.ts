import type { API, FileInfo } from "jscodeshift";
import {
  findComponentImport,
  findJSXElement,
  findProp,
} from "../../../utils/ast";
import { getLineTerminator } from "../../../utils/lineterminator";

// import { getLineTerminator } from "../../utils/lineterminator";
// import renameProps from "../../utils/rename-props";

// to look up in replacements
const propsAffected = ["background", "borderColor", "shadow"];

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

  const astElements = findJSXElement({
    root,
    j,
    name: sourceName,
    originalName: "Box",
  });

  for (const astElement of astElements.paths()) {
    for (const prop of propsAffected) {
      findProp({ j, path: astElement, name: prop }).forEach((attr) => {
        const attrvalue = attr.value.value;
        if (attrvalue.type === "StringLiteral") {
          if (
            prop === "background" && // lookup instead (map)
            (attrvalue.value as unknown as string) === "bg-subtle"
          ) {
            attrvalue.value = "bg-neutral-soft";
          }
        }
      });
    }
  }

  return root.toSource(toSourceOptions);
}
