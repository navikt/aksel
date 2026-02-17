import { describe, expect, test } from "vitest";
import type { QueryFilteringProperty } from "../TokenFilter.types";
import { QUERY_OPERATORS, parseQueryText } from "./parse-query-text.test";
import type { ParsedText } from "./parse-query-text.test";

const properties: QueryFilteringProperty[] = [
  { key: "status", propertyLabel: "Status" },
  { key: "hostname", propertyLabel: "Hostname" },
  { key: "instance-id", propertyLabel: "Instance ID" },
  { key: "region", propertyLabel: "Region" },
  { key: "availability-zone", propertyLabel: "Availability Zone" },
];

describe("parseQueryText", () => {
  describe("property matching", () => {
    test("should match a basic property", () => {
      const result = parseQueryText("Status", properties);
      expect(result.step).toBe("operator");
      const operatorResult = result as Extract<
        ParsedText,
        { step: "operator" }
      >;
      expect(operatorResult.property.key).toBe("status");
    });

    test("should match property case-insensitively", () => {
      const result = parseQueryText("status", properties);
      expect(result.step).toBe("operator");
      const operatorResult = result as Extract<
        ParsedText,
        { step: "operator" }
      >;
      expect(operatorResult.property.key).toBe("status");
    });

    test("should match property with mixed casing", () => {
      const result = parseQueryText("sTaTuS", properties);
      expect(result.step).toBe("operator");
      const operatorResult = result as Extract<
        ParsedText,
        { step: "operator" }
      >;
      expect(operatorResult.property.key).toBe("status");
    });

    test("should use longest matching property when properties overlap", () => {
      const result = parseQueryText("Instance ID", properties);
      expect(result.step).toBe("operator");
      const operatorResult = result as Extract<
        ParsedText,
        { step: "operator" }
      >;
      expect(operatorResult.property.key).toBe("instance-id");
    });

    test("should use longest matching property: Availability Zone vs Zone", () => {
      const result = parseQueryText("Availability Zone", properties);
      expect(result.step).toBe("operator");
      const operatorResult = result as Extract<
        ParsedText,
        { step: "operator" }
      >;
      expect(operatorResult.property.key).toBe("availability-zone");
    });

    test("should return free-text when no property matches", () => {
      const result = parseQueryText("NonExistentProperty", properties);
      expect(result.step).toBe("free-text");
    });
  });

  describe("operator matching", () => {
    test("should match exact operator", () => {
      const result = parseQueryText("Status=value", properties);
      expect(result.step).toBe("property");
      const propertyResult = result as Extract<
        ParsedText,
        { step: "property" }
      >;
      expect(propertyResult.operator).toBe("=");
      expect(propertyResult.value).toBe("value");
    });

    test("should match >= operator before > operator (specificity)", () => {
      const result = parseQueryText("Status>=value", properties);
      expect(result.step).toBe("property");
      const propertyResult = result as Extract<
        ParsedText,
        { step: "property" }
      >;
      expect(propertyResult.operator).toBe(">=");
      expect(propertyResult.value).toBe("value");
    });

    test("should match <= operator before < operator (specificity)", () => {
      const result = parseQueryText("Status<=value", properties);
      expect(result.step).toBe("property");
      const propertyResult = result as Extract<
        ParsedText,
        { step: "property" }
      >;
      expect(propertyResult.operator).toBe("<=");
      expect(propertyResult.value).toBe("value");
    });

    test("should match != operator before = operator", () => {
      const result = parseQueryText("Status!=value", properties);
      expect(result.step).toBe("property");
      const propertyResult = result as Extract<
        ParsedText,
        { step: "property" }
      >;
      expect(propertyResult.operator).toBe("!=");
      expect(propertyResult.value).toBe("value");
    });

    test("should match !: operator", () => {
      const result = parseQueryText("Status!:value", properties);
      expect(result.step).toBe("property");
      const propertyResult = result as Extract<
        ParsedText,
        { step: "property" }
      >;
      expect(propertyResult.operator).toBe("!:");
    });

    test("should match !^ operator", () => {
      const result = parseQueryText("Status!^value", properties);
      expect(result.step).toBe("property");
      const propertyResult = result as Extract<
        ParsedText,
        { step: "property" }
      >;
      expect(propertyResult.operator).toBe("!^");
    });

    test("should match : operator", () => {
      const result = parseQueryText("Status:value", properties);
      expect(result.step).toBe("property");
      const propertyResult = result as Extract<
        ParsedText,
        { step: "property" }
      >;
      expect(propertyResult.operator).toBe(":");
    });

    test("should match ^ operator", () => {
      const result = parseQueryText("Status^value", properties);
      expect(result.step).toBe("property");
      const propertyResult = result as Extract<
        ParsedText,
        { step: "property" }
      >;
      expect(propertyResult.operator).toBe("^");
    });

    test("should match operator case-insensitively", () => {
      const result = parseQueryText("Status=value", properties);
      expect(result.step).toBe("property");
      const propertyResult = result as Extract<
        ParsedText,
        { step: "property" }
      >;
      expect(propertyResult.operator).toBe("=");
    });
  });

  describe("operator prefix matching", () => {
    test("should recognize incomplete <= operator as < operator", () => {
      const result = parseQueryText("Status<", properties);
      expect(result.step).toBe("property");
      const operatorResult = result as Extract<
        ParsedText,
        { step: "property" }
      >;
      expect(operatorResult.operator).toBe("<");
    });

    test("should recognize empty string after property as operator prefix", () => {
      const result = parseQueryText("Status", properties);
      expect(result.step).toBe("operator");
      const operatorResult = result as Extract<
        ParsedText,
        { step: "operator" }
      >;
      expect(operatorResult.operatorPrefix).toBe("");
    });

    test("should return free-text when invalid operator character is used", () => {
      const result = parseQueryText("Status@value", properties);
      expect(result.step).toBe("free-text");
    });
  });

  describe("value extraction", () => {
    test("should extract value after operator", () => {
      const result = parseQueryText("Status=active", properties);
      expect(result.step).toBe("property");
      const propertyResult = result as Extract<
        ParsedText,
        { step: "property" }
      >;
      expect(propertyResult.value).toBe("active");
    });

    test("should trim whitespace after operator", () => {
      const result = parseQueryText("Status=   active", properties);
      expect(result.step).toBe("property");
      const propertyResult = result as Extract<
        ParsedText,
        { step: "property" }
      >;
      expect(propertyResult.value).toBe("active");
    });

    test("should handle empty value", () => {
      const result = parseQueryText("Status=", properties);
      expect(result.step).toBe("property");
      const propertyResult = result as Extract<
        ParsedText,
        { step: "property" }
      >;
      expect(propertyResult.value).toBe("");
    });

    test("should handle whitespace-only value", () => {
      const result = parseQueryText("Status=   ", properties);
      expect(result.step).toBe("property");
      const propertyResult = result as Extract<
        ParsedText,
        { step: "property" }
      >;
      expect(propertyResult.value).toBe("");
    });

    test("should preserve value content including spaces", () => {
      const result = parseQueryText("Status=active and running", properties);
      expect(result.step).toBe("property");
      const propertyResult = result as Extract<
        ParsedText,
        { step: "property" }
      >;
      expect(propertyResult.value).toBe("active and running");
    });

    test("should extract multi-part property value", () => {
      const result = parseQueryText("Instance ID=server-123", properties);
      expect(result.step).toBe("property");
      const propertyResult = result as Extract<
        ParsedText,
        { step: "property" }
      >;
      expect(propertyResult.value).toBe("server-123");
    });
  });

  describe("whitespace handling", () => {
    test("should handle whitespace between property and operator", () => {
      const result = parseQueryText("Status   =value", properties);
      expect(result.step).toBe("property");
      const propertyResult = result as Extract<
        ParsedText,
        { step: "property" }
      >;
      expect(propertyResult.operator).toBe("=");
      expect(propertyResult.value).toBe("value");
    });

    test("should handle whitespace after property but before operator", () => {
      const result = parseQueryText("Status >value", properties);
      expect(result.step).toBe("property");
      const propertyResult = result as Extract<
        ParsedText,
        { step: "property" }
      >;
      expect(propertyResult.operator).toBe(">");
      expect(propertyResult.value).toBe("value");
    });

    test("should trim operator prefix whitespace", () => {
      const result = parseQueryText("Status   ", properties);
      expect(result.step).toBe("operator");
      const operatorResult = result as Extract<
        ParsedText,
        { step: "operator" }
      >;
      expect(operatorResult.operatorPrefix).toBe("");
    });
  });

  describe("edge cases", () => {
    test("should handle empty input", () => {
      const result = parseQueryText("", properties);
      expect(result.step).toBe("free-text");
    });

    test("should handle whitespace-only input", () => {
      const result = parseQueryText("   ", properties);
      expect(result.step).toBe("free-text");
    });

    test("should handle property-only input", () => {
      const result = parseQueryText("Status", properties);
      expect(result.step).toBe("operator");
      const operatorResult = result as Extract<
        ParsedText,
        { step: "operator" }
      >;
      expect(operatorResult.operatorPrefix).toBe("");
    });

    test("should handle property with spaces", () => {
      const result = parseQueryText("Instance ID:value", properties);
      expect(result.step).toBe("property");
      const propertyResult = result as Extract<
        ParsedText,
        { step: "property" }
      >;
      expect(propertyResult.property.key).toBe("instance-id");
      expect(propertyResult.operator).toBe(":");
      expect(propertyResult.value).toBe("value");
    });
  });

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

  describe("free-text fallback", () => {
    test("should fallback to free-text when no property is matched", () => {
      const result = parseQueryText("Random text", properties);
      expect(result.step).toBe("free-text");
      const freeTextResult = result as Extract<
        ParsedText,
        { step: "free-text" }
      >;
      expect(freeTextResult.value).toBe("Random text");
    });

    test("should fallback to free-text with partial operator match that is invalid", () => {
      const result = parseQueryText("Status@somevalue", properties);
      expect(result.step).toBe("free-text");
    });
  });
});
