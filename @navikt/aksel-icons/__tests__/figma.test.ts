import { describe, expect, test } from "vitest";
import { splitIntoParts } from "../config/figma/fetch-icons";

describe("splitIntoParts", () => {
  test("should split array into parts correctly with odd count array", () => {
    const arr = ["a", "b", "c", "d", "e"];
    const result = splitIntoParts(arr, 4);
    expect(result).toEqual(["a,b", "c,d", "e"]);
  });

  test("should split array into parts correctly with even count array", () => {
    const arr = ["a", "b", "c", "d", "e", "f"];
    const result = splitIntoParts(arr, 4);
    expect(result).toEqual(["a,b", "c,d", "e,f"]);
  });
});
