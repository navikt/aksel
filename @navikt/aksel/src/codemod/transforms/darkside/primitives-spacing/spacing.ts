import type { API, FileInfo } from "jscodeshift";
import { getLineTerminator } from "../../../utils/lineterminator";
import {
  findComponentImport,
  findJSXElement,
  findProp,
} from "../darkside.utils";

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
    "Hgrid",
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
    const name = findComponentImport({ file, j, name: primitive });
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
        findProp({ j, path, name: prop }).forEach((attr) => {
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

const legacySpacingTokenLookup = {
  "32": "128",
  "24": "96",
  "20": "80",
  "18": "72",
  "16": "64",
  "14": "56",
  "12": "48",
  "11": "44",
  "10": "40",
  "9": "36",
  "8": "32",
  "7": "28",
  "6": "24",
  "5": "20",
  "4": "16",
  "3": "12",
  "2": "8",
  "1-alt": "6",
  "1": "4",
  "05": "2",
  "0": "0",
};

const uniqueSpacingOptions = ["auto", "full", "px"];

/**
 * Takes an old valid spacing-token and returns the new converted space-token
 * oldValue: "8", "8 10", "8 auto", "auto auto", "full px"
 * @returns "space-32", "space-32 space-40"
 */
function convertSpacingToSpace(oldValue: string): string {
  const spacingTokens = oldValue.split(" ");

  const newSpacing = [];
  for (const spacingToken of spacingTokens) {
    if (
      uniqueSpacingOptions.includes(spacingToken) ||
      spacingToken.startsWith("space-")
    ) {
      newSpacing.push(spacingToken);
    } else if (!(spacingToken in legacySpacingTokenLookup)) {
      console.warn(`Possibly invalid spacing token found: ${spacingToken}\n`);
      newSpacing.push(spacingToken);
    } else {
      newSpacing.push(`space-${legacySpacingTokenLookup[spacingToken]}`);
    }
  }

  return newSpacing.join(" ");
}
