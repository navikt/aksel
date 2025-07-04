import { describe, expect, test } from "vitest";
import { isNew } from "../index";

describe("Utils test", () => {
  test("isNew", () => {
    const before = new Date(new Date().setDate(new Date().getDate() - 180));
    const after = new Date(new Date().setDate(new Date().getDate() - 89));

    expect(isNew(before.toString())).toBeFalsy();
    expect(isNew(after.toString())).toBeTruthy();
  });
});
