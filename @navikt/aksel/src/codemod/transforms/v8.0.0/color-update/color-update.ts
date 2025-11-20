import type { API, FileInfo } from "jscodeshift";
import { getLineTerminator } from "../../../utils/lineterminator";

const migrationConfig = {
  component: "Tag",
  prop: "variant",
  changes: {
    warning: { replacement: "outline", color: "warning" },
    "warning-moderate": { replacement: "moderate", color: "warning" },
    "warning-filled": { replacement: "strong", color: "warning" },
    error: { replacement: "outline", color: "danger" },
    "error-moderate": { replacement: "moderate", color: "danger" },
    "error-filled": { replacement: "strong", color: "danger" },
    info: { replacement: "outline", color: "info" },
    "info-moderate": { replacement: "moderate", color: "info" },
    "info-filled": { replacement: "strong", color: "info" },
    success: { replacement: "outline", color: "success" },
    "success-moderate": { replacement: "moderate", color: "success" },
    "success-filled": { replacement: "strong", color: "success" },
    neutral: { replacement: "outline", color: "neutral" },
    "neutral-moderate": { replacement: "moderate", color: "neutral" },
    "neutral-filled": { replacement: "strong", color: "neutral" },
    alt1: { replacement: "outline", color: "meta-purple" },
    "alt1-moderate": { replacement: "moderate", color: "meta-purple" },
    "alt1-filled": { replacement: "strong", color: "meta-purple" },
    alt2: { replacement: "outline", color: "meta-lime" },
    "alt2-moderate": { replacement: "moderate", color: "meta-lime" },
    "alt2-filled": { replacement: "strong", color: "meta-lime" },
    alt3: { replacement: "outline", color: "info" },
    "alt3-moderate": { replacement: "moderate", color: "info" },
    "alt3-filled": { replacement: "strong", color: "info" },
  },
};

export default function transformer(file: FileInfo, api: API) {
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
        specifier.imported.name === migrationConfig.component
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
        if (attr.name.name === migrationConfig.prop) {
          variantPropIndex = index;
          if (attr.value?.type === "StringLiteral") {
            variantValue = attr.value.value;
          } else if (
            attr.value?.type === "JSXExpressionContainer" &&
            attr.value.expression.type === "StringLiteral"
          ) {
            variantValue = attr.value.expression.value;
          }
        }
        if (attr.name.name === "data-color") {
          colorPropIndex = index;
        }
      });

      if (variantPropIndex !== -1 && variantValue) {
        const config = migrationConfig.changes[variantValue];
        if (config) {
          // Update variant prop
          const originalAttr = attributes[variantPropIndex];
          if (originalAttr.type !== "JSXAttribute") return;
          let newValue;

          if (originalAttr.value?.type === "JSXExpressionContainer") {
            newValue = j.jsxExpressionContainer(j.literal(config.replacement));
          } else {
            newValue = j.literal(config.replacement);
          }

          const newAttr = j.jsxAttribute(
            j.jsxIdentifier(migrationConfig.prop),
            newValue,
          );
          newAttr.comments = originalAttr.comments;
          attributes[variantPropIndex] = newAttr;

          // Add data-color prop if it doesn't exist
          if (colorPropIndex === -1) {
            const colorAttr = j.jsxAttribute(
              j.jsxIdentifier("data-color"),
              j.literal(config.color),
            );
            attributes.unshift(colorAttr);
          }
        }
      }
    });

  const toSourceOptions = getLineTerminator(file.source);
  return root.toSource(toSourceOptions);
}
