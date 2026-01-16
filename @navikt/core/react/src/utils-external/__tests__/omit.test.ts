import { describe, expect, test } from "vitest";
import { omit } from "../helpers/omit";

describe("omit", () => {
  test("should return a new object without the specified properties", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = omit(obj, ["a", "b"]);
    expect(result).toEqual({ c: 3 });
  });

  test("should not modify the original object", () => {
    const obj = { a: 1, b: 2, c: 3 };
    omit(obj, ["a"]);
    expect(obj).toEqual({ a: 1, b: 2, c: 3 });
  });

  test("should return the same object if no properties are omitted", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = omit(obj, []);
    expect(result).toEqual(obj);
  });

  test("should return an empty object if all properties are omitted", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = omit(obj, ["a", "b", "c"]);
    expect(result).toEqual({});
  });

  test("should ignore properties that do not exist in the original object", () => {
    const obj = { a: 1, b: 2, c: 3 };

    // @ts-expect-error TS-typing will not allow this in most cases, but we still want to test it just in case
    const result = omit(obj, ["d"]);
    expect(result).toEqual(obj);
  });
});
