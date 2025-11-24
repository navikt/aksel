import type { API, FileInfo } from "jscodeshift";
import { legacyTokenConfig } from "../../../../darkside/config/legacy.tokens";
import { findComponentImport, findProps } from "../../../utils/ast";
import { getLineTerminator } from "../../../utils/lineterminator";
import transformBoxNewToBox from "../box-new/box-new";

const propsAffected = ["background", "borderColor", "shadow"];

export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  const root = j(file.source);

  const toSourceOptions = getLineTerminator(file.source);

  if (file.source.includes("TODO: Aksel Box migration")) {
    return root.toSource(toSourceOptions);
  }

  const localName = findComponentImport({
    root,
    j,
    name: "Box",
    packageType: "react",
  });

  if (!localName) {
    return;
  }

  const astElements = root.find(j.JSXElement, {
    openingElement: {
      name: {
        type: "JSXIdentifier",
        name: localName,
      },
    },
  });

  const tokenComments: TokenComments = [];

  for (const astElement of astElements.paths()) {
    for (const prop of propsAffected) {
      findProps({ j, path: astElement, name: prop }).forEach((attr) => {
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
        } else if (
          attrvalue.type === "JSXExpressionContainer" &&
          attrvalue.expression.type === "StringLiteral"
        ) {
          const literal = attrvalue.expression;
          const config = legacyTokenConfig[literal.value];
          if (config?.replacement) {
            literal.value = config.replacement;
          } else {
            const tokenComment: TokenComment = {
              prop,
              token: literal.value,
            };
            if (config?.comment) {
              tokenComment.comment = config.comment;
            }
            tokenComments.push(tokenComment);
          }
        }
      });
    }

    findProps({ j, path: astElement, name: "borderRadius" }).forEach((attr) => {
      const attrValue = attr.value.value;

      if (attrValue.type === "StringLiteral") {
        /* borderRadius="xlarge" */
        attrValue.value = convertBorderRadiusToRadius(attrValue.value);
      } else if (attrValue.type === "JSXExpressionContainer") {
        /* borderRadius={{xs: "xlarge", sm: "large"}} */
        const expression = attrValue.expression;
        if (expression.type === "ObjectExpression") {
          /* xs, md, sm */
          expression.properties.forEach((property) => {
            if (property.type === "ObjectProperty") {
              if (property.value.type === "StringLiteral") {
                property.value.value = convertBorderRadiusToRadius(
                  property.value.value,
                );
              }
            }
          });
        } else if (expression.type === "StringLiteral") {
          expression.value = convertBorderRadiusToRadius(expression.value);
        }
      }
    });
  }

  const blockComment = createFileComments({ tokenComments });

  if (blockComment) {
    return `${blockComment ? blockComment + "\n\n" : ""}${root.toSource(
      toSourceOptions,
    )}`;
  }

  file.source = root.toSource(toSourceOptions);

  return transformBoxNewToBox(file, api);
}

type TokenComment = {
  prop: string;
  token: string;
  comment?: string;
};

type TokenComments = TokenComment[];

const createFileComments = ({
  tokenComments,
}: {
  tokenComments: TokenComments;
}) => {
  if (tokenComments.length === 0) {
    return null;
  }

  let constructedComment =
    "/*\nTODO: Aksel Box migration:\nCould not migrate the following:\n";

  for (const { prop, token, comment } of tokenComments.values()) {
    constructedComment += `  - ${prop}=${token}\n`;
    if (comment) {
      constructedComment += `    - ${comment}\n`;
    }
  }

  constructedComment += "*/";

  return constructedComment;
};

const legacyBorderRadiusNameTokenLookup = {
  full: "full",
  xlarge: "12",
  large: "8",
  medium: "4",
  small: "2",
};

/**
 * Takes an old valid border-radius token and returns the new converted radius token
 * oldValue: "xlarge", "full"
 * @returns "12", "full"
 */
function convertBorderRadiusToRadius(oldValue: string): string {
  const radiusTokens = oldValue.split(" ");

  const newRadius = [];
  for (const radiusToken of radiusTokens) {
    if (radiusToken === "full") {
      newRadius.push(radiusToken);
    } else if (!(radiusToken in legacyBorderRadiusNameTokenLookup)) {
      console.warn(`Possibly invalid radius token found: ${radiusToken}\n`);
      newRadius.push(radiusToken);
    } else {
      newRadius.push(`${legacyBorderRadiusNameTokenLookup[radiusToken]}`);
    }
  }

  return newRadius.join(" ");
}
