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
});
