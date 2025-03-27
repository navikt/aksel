import type { API, Collection, FileInfo, JSCodeshift } from "jscodeshift";
import { forIn } from "lodash";
import { legacyTokenConfig } from "../../../../darkside/config/legacy.tokens";
import { tokens } from "../../../tokens-map";
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

  const tokenComments: TokenComments = [];

  for (const astElement of astElements.paths()) {
    for (const prop of propsAffected) {
      findProp({ j, path: astElement, name: prop }).forEach((attr) => {
        const attrvalue = attr.value.value;
        if (attrvalue.type === "StringLiteral") {
          const config = legacyTokenConfig[attrvalue.value];
          if (config?.replacement) {
            attrvalue.value = config.replacement;
          } else {
            const tokenComment: TokenComment = {
              prop,
              token: attrvalue.value,
            };
            if (config?.comment) {
              tokenComment.comment = config.comment;
            }
            tokenComments.push(tokenComment);
          }
        }
      });
    }
  }

  const blockComment = createFileComments(j, root, { tokenComments });

  // if no new

  // if some new

  // if all new
  moveAndRenameImport(j, root, {
    fromImport: "@navikt/ds-react",
    toImport: "@navikt/ds-react/Box",
    fromName: "Box",
    toName: "BoxNew",
  });

  return `${blockComment ? blockComment + "\n\n" : ""}${root.toSource(
    toSourceOptions,
  )}`;
}

type TokenComment = {
  prop: string;
  token: string;
  comment?: string;
};

type TokenComments = TokenComment[];

const createFileComments = (
  j: JSCodeshift,
  root: Collection<any>,
  { tokenComments }: { tokenComments: TokenComments },
) => {
  if (tokenComments.length == 0) {
    return null;
  }

  let constructedComment =
    "/*\nTODO: aksel box migration:\nCould not migrate the following:\n";

  for (const { prop, token, comment } of tokenComments.values()) {
    constructedComment += `  - ${prop}=${token}\n`;
    if (comment) {
      constructedComment += `    - ${comment}\n`;
    }
  }

  constructedComment += "*/";

  return constructedComment;
};
