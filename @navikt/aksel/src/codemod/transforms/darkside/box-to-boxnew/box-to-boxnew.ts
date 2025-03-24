import type { API, FileInfo } from "jscodeshift";
import { legacyTokenConfig } from "../../../../darkside/config/legacy.tokens";
import {
  findComponentImport,
  findJSXElement,
  findProp,
} from "../../../utils/ast";
import { getLineTerminator } from "../../../utils/lineterminator";

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
          const config = legacyTokenConfig[attrvalue.value];
          if (config?.replacement) {
            attrvalue.value = config.replacement;
          }
          // else {
          //   // TODO: should this be to insert a comment?
          //   attrvalue.comments = [
          //     j.commentLine(" TODO: no replacement for this token"),
          //   ];
          // }
        }
      });
    }
  }

  return root.toSource(toSourceOptions);
}
