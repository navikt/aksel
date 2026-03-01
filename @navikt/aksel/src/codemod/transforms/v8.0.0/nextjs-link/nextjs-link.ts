import type { API, FileInfo, JSXAttribute } from "jscodeshift";
import { getLineTerminator } from "../../../utils/lineterminator";

export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  const root = j(file.source);

  const toSourceOptions = getLineTerminator(file.source);

  let hasChanges = false;

  // Find all Next.js Link imports (both default and named)
  const nextLinkImports = new Map<string, string>(); // localName -> importSource

  root.find(j.ImportDeclaration).forEach((path) => {
    const source = path.node.source.value;
    if (
      source === "next/link" ||
      (typeof source === "string" && source.includes("/next-link"))
    ) {
      path.node.specifiers?.forEach((specifier) => {
        if (specifier.type === "ImportDefaultSpecifier") {
          nextLinkImports.set(specifier.local?.name || "Link", source);
        } else if (specifier.type === "ImportSpecifier") {
          nextLinkImports.set(
            specifier.local?.name || specifier.imported.name,
            source,
          );
        }
      });
    }
  });

  if (nextLinkImports.size === 0) {
    return root.toSource(toSourceOptions);
  }

  // Process each Link component
  nextLinkImports.forEach((importSource, linkName) => {
    root.find(j.JSXElement).forEach((path) => {
      const openingElement = path.node.openingElement;

      // Check if this is a Next.js Link element
      if (
        openingElement.name.type !== "JSXIdentifier" ||
        openingElement.name.name !== linkName
      ) {
        return;
      }

      const attributes = openingElement.attributes || [];

      // Find legacyBehavior and passHref props
      const hasLegacyBehavior = attributes.some(
        (attr) =>
          attr.type === "JSXAttribute" && attr.name.name === "legacyBehavior",
      );

      const hasPassHref = attributes.some(
        (attr) => attr.type === "JSXAttribute" && attr.name.name === "passHref",
      );

      // Only transform if it has legacyBehavior or passHref
      if (!hasLegacyBehavior && !hasPassHref) {
        return;
      }

      // Get the href attribute
      const hrefAttr = attributes.find(
        (attr) => attr.type === "JSXAttribute" && attr.name.name === "href",
      ) as JSXAttribute | undefined;

      // Check if Link has a single child element
      const children = path.node.children || [];
      const childElements = children.filter(
        (child) => child.type === "JSXElement",
      );

      if (childElements.length !== 1) {
        // Skip if there's not exactly one child element
        return;
      }

      const childElement = childElements[0];
      if (childElement.type !== "JSXElement") {
        return;
      }

      const childOpeningElement = childElement.openingElement;

      // Check if the child has an "as" prop
      const childAsAttr = (childOpeningElement.attributes || []).find(
        (attr) => attr.type === "JSXAttribute" && attr.name.name === "as",
      ) as JSXAttribute | undefined;

      // Only transform if the child has as="a" or no "as" prop
      if (childAsAttr && childAsAttr.value?.type === "StringLiteral") {
        const asValue = childAsAttr.value.value;
        if (asValue !== "a") {
          return;
        }
      }

      // Now perform the transformation:
      // 1. Remove legacyBehavior and passHref from Link
      // 2. Move href to child component
      // 3. Change child's "as" prop to reference the Link component
      // 4. Unwrap the Link (replace Link with just its child)

      const newChildAttributes = [...(childOpeningElement.attributes || [])];

      // Remove "as" prop from child if it's "a"
      const asAttrIndex = newChildAttributes.findIndex(
        (attr) => attr.type === "JSXAttribute" && attr.name.name === "as",
      );
      if (asAttrIndex !== -1) {
        newChildAttributes.splice(asAttrIndex, 1);
      }

      // Add "as={LinkComponent}" to child
      newChildAttributes.push(
        j.jsxAttribute(
          j.jsxIdentifier("as"),
          j.jsxExpressionContainer(j.identifier(linkName)),
        ),
      );

      // Add href to child if it exists
      if (hrefAttr) {
        // Check if child already has href
        const childHasHref = newChildAttributes.some(
          (attr) => attr.type === "JSXAttribute" && attr.name.name === "href",
        );
        if (!childHasHref) {
          newChildAttributes.push(hrefAttr);
        }
      }

      // Get other Link attributes (except legacyBehavior, passHref, href)
      const otherLinkAttrs = attributes.filter(
        (attr) =>
          attr.type === "JSXAttribute" &&
          attr.name.name !== "legacyBehavior" &&
          attr.name.name !== "passHref" &&
          attr.name.name !== "href",
      );

      // Add other Link attributes to child
      otherLinkAttrs.forEach((attr) => {
        // Check if child already has this attribute
        const childHasAttr = newChildAttributes.some(
          (childAttr) =>
            childAttr.type === "JSXAttribute" &&
            childAttr.name.name === (attr as JSXAttribute).name.name,
        );
        if (!childHasAttr) {
          newChildAttributes.push(attr);
        }
      });

      // Create new child element with updated attributes
      const newChildOpeningElement = j.jsxOpeningElement(
        childOpeningElement.name,
        newChildAttributes,
        childOpeningElement.selfClosing,
      );

      const newChildElement = j.jsxElement(
        newChildOpeningElement,
        childElement.closingElement,
        childElement.children,
      );

      // Replace the Link element with the transformed child
      j(path).replaceWith(newChildElement);
      hasChanges = true;
    });
  });

  if (hasChanges) {
    return root.toSource(toSourceOptions);
  }

  return root.toSource(toSourceOptions);
}
