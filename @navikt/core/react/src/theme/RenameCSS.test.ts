import { describe, expect, test } from "vitest";
import { compositeClassFunction } from "./Theme";

const start = "navds-accordion testclass navds-heading endclass";
const end =
  "startclass navds-accordion navds-heading endclass navds-accordion__header";

const both = start + " " + end;

describe("RenameCSS", () => {
  test("String starts with navds", () => {
    expect(compositeClassFunction(start)).toBe(
      "aksel-accordion testclass aksel-heading endclass",
    );
  });

  test("String ends with navds", () => {
    expect(compositeClassFunction(end)).toBe(
      "startclass aksel-accordion aksel-heading endclass aksel-accordion__header",
    );
  });

  test("String starts and ends with navds", () => {
    expect(compositeClassFunction(both)).toBe(
      "aksel-accordion testclass aksel-heading endclass startclass aksel-accordion aksel-heading endclass aksel-accordion__header",
    );
  });

  test("String does not contain navds", () => {
    expect(compositeClassFunction("startclass endclass")).toBe(
      "startclass endclass",
    );
  });

  test("String is empty", () => {
    expect(compositeClassFunction("")).toBe("");
  });

  test("String contains navds as a substring", () => {
    expect(compositeClassFunction("startclass test-navds-class endclass")).toBe(
      "startclass test-navds-class endclass",
    );
  });

  test("String contains multiple navds occurrences", () => {
    const input = "navds-button navds-icon navds-label";
    const expected = "aksel-button aksel-icon aksel-label";
    expect(compositeClassFunction(input)).toBe(expected);
  });

  test("String contains navds with special characters", () => {
    const input = "navds-button! navds-icon@ navds-#label navds#-label";
    const expected = "aksel-button! aksel-icon@ aksel-#label navds#-label";
    expect(compositeClassFunction(input)).toBe(expected);
  });

  test("String contains mixed navds and non-navds classes", () => {
    const input = "navds-button custom-class navds-icon";
    const expected = "aksel-button custom-class aksel-icon";
    expect(compositeClassFunction(input)).toBe(expected);
  });

  test("String contains only navds", () => {
    const input = "navds";
    const expected = "navds";
    expect(compositeClassFunction(input)).toBe(expected);
  });

  test("String contains navds with numbers", () => {
    const input = "navds-1 navds-2 navds-3";
    const expected = "aksel-1 aksel-2 aksel-3";
    expect(compositeClassFunction(input)).toBe(expected);
  });

  test("String contains different casings", () => {
    const input = "Navds-button NAVds-icon NAVDS-label navDS-component";
    const expected = "Navds-button NAVds-icon NAVDS-label navDS-component";
    expect(compositeClassFunction(input)).toBe(expected);
  });
});
