import { describe, expect, test } from "vitest";
import type { ParsedProperty } from "../TokenFilter.types";
import {
  QUERY_OPERATORS,
  matchFilteringProperty,
  matchOperator,
  matchOperatorPrefix,
} from "./operators";

describe("QUERY_OPERATORS", () => {
  test("should return QUERY_OPERATORS in specificity order", () => {
    expect(QUERY_OPERATORS[0]).toBe(">=");
    expect(QUERY_OPERATORS[1]).toBe("<=");
    expect(QUERY_OPERATORS[2]).toBe("!=");
    expect(QUERY_OPERATORS[3]).toBe("!:");
    expect(QUERY_OPERATORS[4]).toBe("!^");
  });

  test("should have all required QUERY_OPERATORS", () => {
    const requiredOperators = [
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
    requiredOperators.forEach((op) => {
      expect(QUERY_OPERATORS).toContain(op);
    });
  });
});

describe("matchOperator", () => {
  test("should match exact operator", () => {
    const result = matchOperator(QUERY_OPERATORS, "=value");
    expect(result).toBe("=");
  });

  test("should match >= operator before > operator (specificity)", () => {
    const result = matchOperator(QUERY_OPERATORS, ">=value");
    expect(result).toBe(">=");
  });

  test("should match <= operator before < operator (specificity)", () => {
    const result = matchOperator(QUERY_OPERATORS, "<=value");
    expect(result).toBe("<=");
  });

  test("should match != operator before = operator", () => {
    const result = matchOperator(QUERY_OPERATORS, "!=value");
    expect(result).toBe("!=");
  });

  test("should match !: operator", () => {
    const result = matchOperator(QUERY_OPERATORS, "!:value");
    expect(result).toBe("!:");
  });

  test("should match !^ operator", () => {
    const result = matchOperator(QUERY_OPERATORS, "!^value");
    expect(result).toBe("!^");
  });

  test("should match : operator", () => {
    const result = matchOperator(QUERY_OPERATORS, ":value");
    expect(result).toBe(":");
  });

  test("should match ^ operator", () => {
    const result = matchOperator(QUERY_OPERATORS, "^value");
    expect(result).toBe("^");
  });

  test("should match > operator", () => {
    const result = matchOperator(QUERY_OPERATORS, ">value");
    expect(result).toBe(">");
  });

  test("should match < operator", () => {
    const result = matchOperator(QUERY_OPERATORS, "<value");
    expect(result).toBe("<");
  });

  test("should match operator case-insensitively", () => {
    const result = matchOperator(QUERY_OPERATORS, "=value");
    expect(result).toBe("=");
  });

  test("should return undefined when no operator matches", () => {
    const result = matchOperator(QUERY_OPERATORS, "somevalue");
    expect(result).toBeUndefined();
  });

  test("should return undefined for empty input", () => {
    const result = matchOperator(QUERY_OPERATORS, "");
    expect(result).toBeUndefined();
  });

  test("should match operator from custom operator list", () => {
    const customOperators = ["=", "!="] as const;
    const result = matchOperator(customOperators as any, "!=value");
    expect(result).toBe("!=");
  });
});

describe("matchFilteringProperty", () => {
  const properties: ParsedProperty[] = [
    {
      propertyKey: "status",
      propertyLabel: "Status",
      groupValuesLabel: "",
      propertyGroup: "testgroup",
      externalProperty: {} as any,
      operators: [],
    },
    {
      propertyKey: "hostname",
      propertyLabel: "Hostname",
      groupValuesLabel: "",
      propertyGroup: "testgroup",
      externalProperty: {} as any,
      operators: [],
    },
    {
      propertyKey: "instance-id",
      propertyLabel: "Instance ID",
      groupValuesLabel: "",
      propertyGroup: "testgroup",
      externalProperty: {} as any,
      operators: [],
    },
    {
      propertyKey: "region",
      propertyLabel: "Region",
      groupValuesLabel: "",
      propertyGroup: "testgroup",
      externalProperty: {} as any,
      operators: [],
    },
    {
      propertyKey: "availability-zone",
      propertyLabel: "Availability Zone",
      groupValuesLabel: "",
      propertyGroup: "testgroup",
      externalProperty: {} as any,
      operators: [],
    },
  ];

  test("should match a basic property", () => {
    const result = matchFilteringProperty(properties, "Status");
    expect(result?.propertyKey).toBe("status");
  });

  test("should match property case-insensitively", () => {
    const result = matchFilteringProperty(properties, "status");
    expect(result?.propertyKey).toBe("status");
  });

  test("should match property with mixed casing", () => {
    const result = matchFilteringProperty(properties, "sTaTuS");
    expect(result?.propertyKey).toBe("status");
  });

  test("should use longest matching property when properties overlap", () => {
    const result = matchFilteringProperty(properties, "Instance ID");
    expect(result?.propertyKey).toBe("instance-id");
  });

  test("should prefer longest property: Availability Zone vs Zone", () => {
    const result = matchFilteringProperty(properties, "Availability Zone");
    expect(result?.propertyKey).toBe("availability-zone");
  });

  test("should return undefined when no property matches", () => {
    const result = matchFilteringProperty(properties, "NonExistentProperty");
    expect(result).toBeUndefined();
  });

  test("should return undefined for empty input", () => {
    const result = matchFilteringProperty(properties, "");
    expect(result).toBeUndefined();
  });

  test("should match property from partial input", () => {
    const result = matchFilteringProperty(properties, "Status=value");
    expect(result?.propertyKey).toBe("status");
  });

  test("should match property with spaces in label", () => {
    const result = matchFilteringProperty(properties, "Instance ID:value");
    expect(result?.propertyKey).toBe("instance-id");
  });
});

describe("matchOperatorPrefix", () => {
  test("should return empty string when input is empty", () => {
    const result = matchOperatorPrefix(QUERY_OPERATORS, "");
    expect(result).toBe("");
  });

  test("should return empty string when input is whitespace only", () => {
    const result = matchOperatorPrefix(QUERY_OPERATORS, "   ");
    expect(result).toBe("");
  });

  test("should match exact operator as prefix", () => {
    const result = matchOperatorPrefix(QUERY_OPERATORS, "=");
    expect(result).toBe("=");
  });

  test("should match incomplete >= operator as <  prefix", () => {
    const result = matchOperatorPrefix(QUERY_OPERATORS, "<");
    expect(result).toBe("<");
  });

  test("should match incomplete >= operator as = prefix", () => {
    const result = matchOperatorPrefix(QUERY_OPERATORS, ">");
    expect(result).toBe(">");
  });

  test("should match !: operator prefix", () => {
    const result = matchOperatorPrefix(QUERY_OPERATORS, "!");
    expect(result).toBe("!");
  });

  test("should match !: as operator prefix", () => {
    const result = matchOperatorPrefix(QUERY_OPERATORS, "!:");
    expect(result).toBe("!:");
  });

  test("should match !^ as operator prefix", () => {
    const result = matchOperatorPrefix(QUERY_OPERATORS, "!^");
    expect(result).toBe("!^");
  });

  test("should match : operator prefix", () => {
    const result = matchOperatorPrefix(QUERY_OPERATORS, ":");
    expect(result).toBe(":");
  });

  test("should match ^ operator prefix", () => {
    const result = matchOperatorPrefix(QUERY_OPERATORS, "^");
    expect(result).toBe("^");
  });

  test("should return null for invalid operator prefix", () => {
    const result = matchOperatorPrefix(QUERY_OPERATORS, "@");
    expect(result).toBeNull();
  });

  test("should return null for completely invalid prefix", () => {
    const result = matchOperatorPrefix(QUERY_OPERATORS, "xyz");
    expect(result).toBeNull();
  });

  test("should trim whitespace before checking prefix", () => {
    const result = matchOperatorPrefix(QUERY_OPERATORS, "   =");
    expect(result).toBe("=");
  });

  test("should handle case-insensitive prefix matching", () => {
    const result = matchOperatorPrefix(QUERY_OPERATORS, "!");
    expect(result).toBe("!");
  });

  test("should match >= as valid prefix", () => {
    const result = matchOperatorPrefix(QUERY_OPERATORS, ">");
    expect(result).toBe(">");
  });

  test("should match >= as valid prefix (incomplete)", () => {
    const result = matchOperatorPrefix(QUERY_OPERATORS, ">");
    expect(result).toBe(">");
  });
});
