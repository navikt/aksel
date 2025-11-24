import type {
  API,
  FileInfo,
  JSXAttribute,
  JSXExpressionContainer,
  Literal,
} from "jscodeshift";
import { getLineTerminator } from "./lineterminator";

export interface MigrationConfig {
  component: string;
  prop: string;
  changes: Record<string, { replacement?: string; color: string }>;
}

export function moveVariantToDataColor(
  file: FileInfo,
  api: API,
  config: MigrationConfig,
) {
  const j = api.jscodeshift;
  const root = j(file.source);

  /* Find all imports from @navikt/ds-react */
  const imports = root.find(j.ImportDeclaration).filter((path) => {
    const sourceValue = path.value.source.value;
    return (
      typeof sourceValue === "string" &&
      (sourceValue === "@navikt/ds-react" ||
        sourceValue.startsWith("@navikt/ds-react/"))
    );
  });

  if (imports.size() === 0) {
    return null;
  }

  const [rootComponent, subComponent] = config.component.split(".");
  let localName = "";

  imports.forEach((path) => {
    path.value.specifiers?.forEach((specifier) => {
      if (
        specifier.type === "ImportSpecifier" &&
        specifier.imported.name === rootComponent
      ) {
        localName = specifier.local?.name || specifier.imported.name;
      }
    });
  });

  if (!localName) {
    return null;
  }

  const elementSearch = subComponent
    ? {
        openingElement: {
          name: {
            type: "JSXMemberExpression",
            object: { name: localName },
            property: { name: subComponent },
          },
        },
      }
    : { openingElement: { name: { name: localName } } };

  root.find(j.JSXElement, elementSearch as any).forEach((path) => {
    const attributes = path.value.openingElement.attributes;
    if (!attributes) return;

    let variantPropIndex = -1;
    let colorPropIndex = -1;
    let variantValue = "";

    attributes.forEach((attr, index) => {
      if (attr.type !== "JSXAttribute") return;
      if (attr.name.name === config.prop) {
        variantPropIndex = index;
        const value = getStringValue(attr.value);
        if (value) {
          variantValue = value;
        }
      }
      if (attr.name.name === "data-color") {
        colorPropIndex = index;
      }
    });

    if (variantPropIndex !== -1 && variantValue) {
      const changeConfig = config.changes[variantValue];
      if (changeConfig) {
        const originalAttr = attributes[variantPropIndex];
        if (originalAttr.type !== "JSXAttribute") return;

        // Handle variant prop update or removal
        if (changeConfig.replacement) {
          let newValue: JSXExpressionContainer | Literal;
          if (originalAttr.value?.type === "JSXExpressionContainer") {
            newValue = j.jsxExpressionContainer(
              j.literal(changeConfig.replacement),
            );
          } else {
            newValue = j.literal(changeConfig.replacement);
          }

          const newAttr = j.jsxAttribute(
            j.jsxIdentifier(config.prop),
            newValue,
          );
          newAttr.comments = originalAttr.comments;
          attributes[variantPropIndex] = newAttr;
        } else {
          // Remove the variant prop if no replacement is specified
          attributes.splice(variantPropIndex, 1);
          // Adjust colorPropIndex if it was after the removed prop
          if (colorPropIndex > variantPropIndex) {
            colorPropIndex--;
          }
        }

        // Add data-color prop if it doesn't exist
        if (colorPropIndex === -1) {
          const colorAttr = j.jsxAttribute(
            j.jsxIdentifier("data-color"),
            j.literal(changeConfig.color),
          );
          attributes.unshift(colorAttr);
        }
      }
    }
  });

  const toSourceOptions = getLineTerminator(file.source);
  return root.toSource(toSourceOptions);
}

type AttributeValue =
  | JSXAttribute["value"]
  | JSXExpressionContainer["expression"];

function getStringValue(node: AttributeValue): string | null {
  if (!node) return null;
  if (node.type === "StringLiteral" || node.type === "Literal") {
    return node.value as string;
  }
  if (
    node.type === "TemplateLiteral" &&
    node.expressions.length === 0 &&
    node.quasis.length === 1
  ) {
    return node.quasis[0].value.cooked ?? null;
  }
  if (node.type === "JSXExpressionContainer") {
    return getStringValue(node.expression);
  }
  return null;
}
