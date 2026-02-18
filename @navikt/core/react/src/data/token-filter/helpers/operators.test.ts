import { QUERY_OPERATORS } from "./operators";

describe("QUERY_OPERATORS", () => {
  test("should return qUERY_OPERATORS in specificity order", () => {
    const qUERY_OPERATORS = QUERY_OPERATORS;
    expect(qUERY_OPERATORS[0]).toBe(">=");
    expect(qUERY_OPERATORS[1]).toBe("<=");
    expect(qUERY_OPERATORS[2]).toBe("!=");
    expect(qUERY_OPERATORS[3]).toBe("!:");
    expect(qUERY_OPERATORS[4]).toBe("!^");
  });

  test("should have all required qUERY_OPERATORS", () => {
    const qUERY_OPERATORS = QUERY_OPERATORS;
    const requiredQUERY_OPERATORS = [
      "=",
      "!=",
      ":",
      "!:",
      "^",
      "!^",
      ">=",
      "<=",
      "<",
      ">",
    ];
    requiredQUERY_OPERATORS.forEach((op) => {
      expect(qUERY_OPERATORS).toContain(op);
    });
  });
});
