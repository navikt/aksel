import type { API, FileInfo } from "jscodeshift";
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
  const imports = root.find(j.ImportDeclaration, {
    source: { value: "@navikt/ds-react" },
  });

  if (imports.size() === 0) {
    return null;
  }

  let localName = "";

  imports.forEach((path) => {
    path.value.specifiers?.forEach((specifier) => {
      if (
        specifier.type === "ImportSpecifier" &&
        specifier.imported.name === config.component
      ) {
        localName = specifier.local?.name || specifier.imported.name;
      }
    });
  });

  if (!localName) {
    return null;
  }

  root
    .find(j.JSXElement, { openingElement: { name: { name: localName } } })
    .forEach((path) => {
      const attributes = path.value.openingElement.attributes;
      if (!attributes) return;

      let variantPropIndex = -1;
      let colorPropIndex = -1;
      let variantValue = "";

      attributes.forEach((attr, index) => {
        if (attr.type !== "JSXAttribute") return;
        if (attr.name.name === config.prop) {
          variantPropIndex = index;
          if (
            attr.value?.type === "StringLiteral" ||
            attr.value?.type === "Literal"
          ) {
            variantValue = attr.value.value as string;
          } else if (
            attr.value?.type === "JSXExpressionContainer" &&
            (attr.value.expression.type === "StringLiteral" ||
              attr.value.expression.type === "Literal")
          ) {
            variantValue = (attr.value.expression as any).value;
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
            let newValue;
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
