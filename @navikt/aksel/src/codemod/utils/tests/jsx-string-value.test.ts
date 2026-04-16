import jscodeshift from "jscodeshift";
import { describe, expect, test } from "vitest";
import { getJSXLiteralValue, getJSXStringValue } from "../jsx-value";

const j = jscodeshift.withParser("tsx");

function getAttrValue(source: string) {
  const root = j(source);
  const attr = root.find(j.JSXAttribute, { name: { name: "prop" } });
  return attr.paths()[0]?.value.value ?? null;
}

describe("getJSXLiteralValue", () => {
  test("returns null for null/undefined input", () => {
    expect(getJSXLiteralValue(null)).toBe(null);
    expect(getJSXLiteralValue(undefined)).toBe(null);
  });

  test('handles StringLiteral: prop="value"', () => {
    const node = getAttrValue('<Component prop="hello" />');
    expect(getJSXLiteralValue(node)).toBe("hello");
  });

  test("handles empty StringLiteral", () => {
    const node = getAttrValue('<Component prop="" />');
    expect(getJSXLiteralValue(node)).toBe("");
  });

  test('handles JSXExpressionContainer with StringLiteral: prop={"value"}', () => {
    const node = getAttrValue('<Component prop={"hello"} />');
    expect(getJSXLiteralValue(node)).toBe("hello");
  });

  test("handles TemplateLiteral without expressions: prop={`value`}", () => {
    const node = getAttrValue("<Component prop={`hello`} />");
    expect(getJSXLiteralValue(node)).toBe("hello");
  });

  test("returns null for TemplateLiteral with expressions", () => {
    // biome-ignore lint/suspicious/noTemplateCurlyInString: Testing only
    const node = getAttrValue("<Component prop={`hello ${name}`} />");
    expect(getJSXLiteralValue(node)).toBe(null);
  });

  test("handles numeric values: prop={42}", () => {
    const node = getAttrValue("<Component prop={42} />");
    expect(getJSXLiteralValue(node)).toBe(42);
  });

  test("handles negative numbers: prop={-5}", () => {
    const node = getAttrValue("<Component prop={-5} />");
    expect(getJSXLiteralValue(node)).toBe(-5);
  });

  test("handles floating point numbers: prop={3.14}", () => {
    const node = getAttrValue("<Component prop={3.14} />");
    expect(getJSXLiteralValue(node)).toBe(3.14);
  });

  test("handles boolean true: prop={true}", () => {
    const node = getAttrValue("<Component prop={true} />");
    expect(getJSXLiteralValue(node)).toBe(true);
  });

  test("handles boolean false: prop={false}", () => {
    const node = getAttrValue("<Component prop={false} />");
    expect(getJSXLiteralValue(node)).toBe(false);
  });

  test("returns null for variable references", () => {
    const node = getAttrValue("<Component prop={someVar} />");
    expect(getJSXLiteralValue(node)).toBe(null);
  });

  test("returns null for function calls", () => {
    const node = getAttrValue("<Component prop={getValue()} />");
    expect(getJSXLiteralValue(node)).toBe(null);
  });

  test("returns null for object expressions", () => {
    const node = getAttrValue('<Component prop={{ key: "value" }} />');
    expect(getJSXLiteralValue(node)).toBe(null);
  });

  test("handles strings with special characters", () => {
    const node = getAttrValue('<Component prop={"hello, world! 👋"} />');
    expect(getJSXLiteralValue(node)).toBe("hello, world! 👋");
  });

  test("handles multiline template literal without expressions", () => {
    const node = getAttrValue(`<Component prop={\`hello
world\`} />`);
    expect(getJSXLiteralValue(node)).toBe("hello\nworld");
  });
});

describe("getJSXStringValue", () => {
  test("returns string for StringLiteral", () => {
    const node = getAttrValue('<Component prop="hello" />');
    expect(getJSXStringValue(node)).toBe("hello");
  });

  test("returns null for numeric values", () => {
    const node = getAttrValue("<Component prop={42} />");
    expect(getJSXStringValue(node)).toBe(null);
  });

  test("returns null for boolean values", () => {
    const node = getAttrValue("<Component prop={true} />");
    expect(getJSXStringValue(node)).toBe(null);
  });
});
