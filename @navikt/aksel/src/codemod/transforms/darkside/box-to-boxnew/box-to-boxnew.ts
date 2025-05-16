import type { API, FileInfo, JSCodeshift, JSXIdentifier } from "jscodeshift";
import { legacyTokenConfig } from "../../../../darkside/config/legacy.tokens";
import {
  findComponentImport,
  findJSXElement,
  findProps,
} from "../../../utils/ast";
import { getLineTerminator } from "../../../utils/lineterminator";
import moveAndRenameImport, {
  addPackageImport,
} from "../../../utils/packageImports";

const propsAffected = ["background", "borderColor", "shadow"];

export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  const root = j(file.source);

  const toSourceOptions = getLineTerminator(file.source);

  if (file.source.includes("TODO: aksel box migration")) {
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
    let encounteredUnmigratableProp = false;
    for (const prop of propsAffected) {
      findProps({ j, path: astElement, name: prop }).forEach((attr) => {
        const attrvalue = attr.value.value;
        if (attrvalue.type === "StringLiteral") {
          const config = legacyTokenConfig[attrvalue.value];
          if (config?.replacement) {
            attrvalue.value = config.replacement;
          } else {
            encounteredUnmigratableProp = true;
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
        }
      }
    });

    if (!encounteredUnmigratableProp) {
      // TODO: ?? Box -> BoxNew type fail? (but works)
      (astElement.node.openingElement.name as JSXIdentifier).name = "BoxNew";
      (astElement.node.closingElement.name as JSXIdentifier).name = "BoxNew";
    }
  }

  const blockComment = createFileComments({ tokenComments });

  const importAnalysis = analyzePartialMigration(
    j,
    root.toSource(toSourceOptions),
  );

  if (importAnalysis === "no new") {
    // WHY: we do nothing to the import statements if we couldn't migrate any Box
  }

  if (importAnalysis === "mixed") {
    // WHY: mixed Box and BoxNew == we keep old, and add the new import
    addPackageImport({
      j,
      root,
      packageName: "@navikt/ds-react/Box",
      specifiers: ["BoxNew"],
    });
  }

  if (importAnalysis === "all new") {
    // WHY: when we have only new boxes == we replace the old import with the new one
    moveAndRenameImport(j, root, {
      fromImport: "@navikt/ds-react",
      toImport: "@navikt/ds-react/Box",
      fromName: "Box",
      toName: "BoxNew",
      ignoreAlias: true,
    });
  }

  const output = `${blockComment ? blockComment + "\n\n" : ""}${root.toSource(
    toSourceOptions,
  )}`;

  return output;
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

type MigrationResult = "all new" | "mixed" | "no new";

const analyzePartialMigration = (
  j: JSCodeshift,
  source: string,
): MigrationResult => {
  const root = j(source);

  const astNewElements = findJSXElement({
    root,
    j,
    name: "BoxNew",
    originalName: "BoxNew",
  });

  if (astNewElements.length === 0) {
    return "no new";
  }

  const localName = findComponentImport({
    root,
    j,
    name: "Box",
    packageType: "react",
  });

  if (!localName) {
    // this should never happen
    throw new Error(
      'package imports have been tampered with before the package import "step" in the migration',
    );
  }

  const astOldElements = findJSXElement({
    root,
    j,
    name: localName,
    originalName: "Box",
  });

  if (astOldElements.length === 0) {
    return "all new";
  }

  return "mixed";
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
