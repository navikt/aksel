import { describe } from "vitest";
import filteredOptionsUtil from "./filtered-options-util";

describe("filtered options util", () => {
  describe("getOptionId", () => {
    it("should return the correct id", () => {
      expect(filteredOptionsUtil.getOptionId("combobox", "option")).toBe(
        "combobox-option-option",
      );
    });

    it("should return the correct id with spaces", () => {
      expect(
        filteredOptionsUtil.getOptionId("combobox", "option with spaces"),
      ).toBe("combobox-option-option-with-spaces");
    });
  });
});
