import type { JSXAttribute, JSXExpressionContainer } from "jscodeshift";

type AttributeValue =
  | JSXAttribute["value"]
  | JSXExpressionContainer["expression"];

type LiteralValue = string | number | boolean;

/**
 * Extracts a literal value (string, number, or boolean) from a JSX attribute value.
 * Handles the following patterns:
 * - `prop="value"` (StringLiteral)
 * - `prop={"value"}` (JSXExpressionContainer with StringLiteral)
 * - `prop={`value`}` (TemplateLiteral with no expressions)
 * - `prop={42}` (NumericLiteral)
 * - `prop={true}` / `prop={false}` (BooleanLiteral)
 *
 * @param node - The JSX attribute value node to extract the value from
 * @returns The literal value if it can be extracted, otherwise null
 *
 * @example
 * ```tsx
 * getJSXLiteralValue(attr.value) // where attr is prop="hello" => "hello"
 * getJSXLiteralValue(attr.value) // where attr is prop={42} => 42
 * getJSXLiteralValue(attr.value) // where attr is prop={true} => true
 * ```
 */
export function getJSXLiteralValue(node: AttributeValue): LiteralValue | null {
  if (!node) return null;

  if (node.type === "StringLiteral") {
    return node.value;
  }

  if (node.type === "NumericLiteral") {
    return node.value;
  }

  if (node.type === "UnaryExpression") {
    const unary = node;
    if (unary.operator === "-" && unary.argument.type === "NumericLiteral") {
      return -unary.argument.value;
    }
    return null;
  }

  if (node.type === "BooleanLiteral") {
    return node.value;
  }

  if (node.type === "Literal") {
    const value = node.value;
    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      return value;
    }
    return null;
  }

  if (node.type === "TemplateLiteral") {
    const template = node;
    if (template.expressions.length === 0 && template.quasis.length === 1) {
      return template.quasis[0].value.cooked ?? null;
    }
    return null;
  }

  if (node.type === "JSXExpressionContainer") {
    return getJSXLiteralValue(node.expression);
  }

  return null;
}

/**
 * Extracts the string value from a JSX attribute value.
 * Convenience wrapper around `getJSXLiteralValue` that only returns strings.
 *
 * @param node - The JSX attribute value node to extract the string from
 * @returns The string value if it can be extracted, otherwise null
 */
export function getJSXStringValue(node: AttributeValue): string | null {
  const value = getJSXLiteralValue(node);
  return typeof value === "string" ? value : null;
}
