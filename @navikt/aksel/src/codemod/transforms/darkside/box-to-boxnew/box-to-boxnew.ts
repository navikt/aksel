import type { API, FileInfo } from "jscodeshift";
import { legacyTokenConfig } from "../../../../darkside/config/legacy.tokens";
import {
  findComponentImport,
  findJSXElement,
  findProp,
} from "../../../utils/ast";
import { getLineTerminator } from "../../../utils/lineterminator";
import moveAndRenameImport from "../../../utils/moveAndRenameImport";

const propsAffected = ["background", "borderColor", "shadow"];

export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  const root = j(file.source);

  const toSourceOptions = getLineTerminator(file.source);

  const localName = findComponentImport({
    file,
    j,
    name: "Box",
    packageType: "react",
  });

  if (!localName) {
    return;
  }

  const astElements = findJSXElement({
    root,
    j,
    name: localName,
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

  moveAndRenameImport(j, root, {
    fromImport: "@navikt/ds-react",
    toImport: "@navikt/ds-react",
    fromName: "Box",
    toName: "BoxNew",
  });

  return root.toSource(toSourceOptions);
}
