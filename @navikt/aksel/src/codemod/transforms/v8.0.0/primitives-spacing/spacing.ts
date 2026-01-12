import type { API, FileInfo } from "jscodeshift";
import {
  findComponentImport,
  findJSXElement,
  findProps,
} from "../../../utils/ast";
import { getLineTerminator } from "../../../utils/lineterminator";
import { legacySpacingTokenMap } from "../spacing.utils";

export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  const root = j(file.source);

  /**
   * Migrate Primitives to `space` from `spacing`
   */
  const primitives = [
    "Box",
    "Box.New",
    "BoxNew",
    "HGrid",
    "Stack",
    "HStack",
    "VStack",
    "Bleed",
  ];

  const affectedProps = [
    "padding",
    "paddingInline",
    "paddingBlock",
    "margin",
    "marginInline",
    "marginBlock",
    "inset",
    "top",
    "right",
    "bottom",
    "left",
    "gap",
  ];

  for (const primitive of primitives) {
    const name = findComponentImport({ root, j, name: primitive });
    if (!name) {
      continue;
    }

    findJSXElement({
      root,
      j,
      name,
      originalName: primitive,
    }).forEach((path) => {
      for (const prop of affectedProps) {
        findProps({ j, path, name: prop }).forEach((attr) => {
          const attrValue = attr.value.value;

          if (attrValue.type === "StringLiteral") {
            /* padding="32" */
            attrValue.value = convertSpacingToSpace(attrValue.value);
          } else if (attrValue.type === "JSXExpressionContainer") {
            /* padding={{xs: "16", sm: "32"}} */
            const expression = attrValue.expression;
            if (expression.type === "ObjectExpression") {
              /* xs, md, sm */
              expression.properties.forEach((property) => {
                if (property.type === "ObjectProperty") {
                  if (property.value.type === "StringLiteral") {
                    property.value.value = convertSpacingToSpace(
                      property.value.value,
                    );
                  }
                }
              });
            }
          }
        });
      }
    });
  }

  return root.toSource(getLineTerminator(file.source));
}

/**
 * Takes an old valid spacing-token and returns the new converted space-token
 * oldValue: "8", "8 10", "8 auto", "auto auto", "full px"
 * @returns "space-32", "space-32 space-40"
 */
function convertSpacingToSpace(oldValue: string): string {
  const spacingTokens = oldValue.split(" ");

  const newSpacing = [];
  for (const spacingToken of spacingTokens) {
    if (spacingToken === "px") {
      /* We replace "px" with new `space-1` */
      newSpacing.push(`space-1`);
    } else if (
      ["auto", "full", "px"].includes(spacingToken) ||
      spacingToken.startsWith("space-")
    ) {
      newSpacing.push(spacingToken);
    } else if (!legacySpacingTokenMap.get(spacingToken)) {
      console.warn(`Possibly invalid spacing token found: ${spacingToken}\n`);
      newSpacing.push(spacingToken);
    } else {
      newSpacing.push(`space-${legacySpacingTokenMap.get(spacingToken)}`);
    }
  }

  return newSpacing.join(" ");
}
