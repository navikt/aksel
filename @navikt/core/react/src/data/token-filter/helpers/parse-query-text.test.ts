import { describe, expect, test } from "vitest";
import type {
  ParsedProperty,
  QueryFilteringProperty,
} from "../TokenFilter.types";
import { parseQueryText } from "./parse-query-text";
import type { ParsedText } from "./parse-query-text";

const properties: QueryFilteringProperty[] = [
  {
    groupValuesLabel: "",
    group: "testgroup",
    key: "status",
    propertyLabel: "Status",
  },
  {
    groupValuesLabel: "",
    group: "testgroup",
    key: "hostname",
    propertyLabel: "Hostname",
  },
  {
    groupValuesLabel: "",
    group: "testgroup",
    key: "instance-id",
    propertyLabel: "Instance ID",
  },
  {
    groupValuesLabel: "",
    group: "testgroup",
    key: "region",
    propertyLabel: "Region",
  },
  {
    groupValuesLabel: "",
    group: "testgroup",
    key: "availability-zone",
    propertyLabel: "Availability Zone",
  },
];

const parsedProperties: ParsedProperty[] = properties.map((prop) => ({
  propertyKey: prop.key,
  propertyLabel: prop.propertyLabel,
  groupValuesLabel: prop.groupValuesLabel ?? "",
  propertyGroup: prop.group ?? "",
  externalProperty: prop,
  operators: prop.operators ?? [],
}));

describe("parseQueryText", () => {
  describe("value extraction", () => {
    test("should extract value after operator", () => {
      const result = parseQueryText("Status=active", parsedProperties);
      expect(result.step).toBe("property");
      const propertyResult = result as Extract<
        ParsedText,
        { step: "property" }
      >;
      expect(propertyResult.value).toBe("active");
    });

    test("should trim whitespace after operator", () => {
      const result = parseQueryText("Status=   active", parsedProperties);
      expect(result.step).toBe("property");
      const propertyResult = result as Extract<
        ParsedText,
        { step: "property" }
      >;
      expect(propertyResult.value).toBe("active");
    });

    test("should handle empty value", () => {
      const result = parseQueryText("Status=", parsedProperties);
      expect(result.step).toBe("property");
      const propertyResult = result as Extract<
        ParsedText,
        { step: "property" }
      >;
      expect(propertyResult.value).toBe("");
    });

    test("should handle whitespace-only value", () => {
      const result = parseQueryText("Status=   ", parsedProperties);
      expect(result.step).toBe("property");
      const propertyResult = result as Extract<
        ParsedText,
        { step: "property" }
      >;
      expect(propertyResult.value).toBe("");
    });

    test("should preserve value content including spaces", () => {
      const result = parseQueryText(
        "Status=active and running",
        parsedProperties,
      );
      expect(result.step).toBe("property");
      const propertyResult = result as Extract<
        ParsedText,
        { step: "property" }
      >;
      expect(propertyResult.value).toBe("active and running");
    });

    test("should extract multi-part property value", () => {
      const result = parseQueryText("Instance ID=server-123", parsedProperties);
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
      const result = parseQueryText("Status   =value", parsedProperties);
      expect(result.step).toBe("property");
      const propertyResult = result as Extract<
        ParsedText,
        { step: "property" }
      >;
      expect(propertyResult.operator).toBe("=");
      expect(propertyResult.value).toBe("value");
    });

    test("should handle whitespace after property but before operator", () => {
      const result = parseQueryText("Status >value", parsedProperties);
      expect(result.step).toBe("property");
      const propertyResult = result as Extract<
        ParsedText,
        { step: "property" }
      >;
      expect(propertyResult.operator).toBe(">");
      expect(propertyResult.value).toBe("value");
    });

    test("should trim operator prefix whitespace", () => {
      const result = parseQueryText("Status   ", parsedProperties);
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
      const result = parseQueryText("", parsedProperties);
      expect(result.step).toBe("free-text");
    });

    test("should handle whitespace-only input", () => {
      const result = parseQueryText("   ", parsedProperties);
      expect(result.step).toBe("free-text");
    });

    test("should handle property-only input", () => {
      const result = parseQueryText("Status", parsedProperties);
      expect(result.step).toBe("operator");
      const operatorResult = result as Extract<
        ParsedText,
        { step: "operator" }
      >;
      expect(operatorResult.operatorPrefix).toBe("");
    });

    test("should handle property with spaces", () => {
      const result = parseQueryText("Instance ID:value", parsedProperties);
      expect(result.step).toBe("property");
      const propertyResult = result as Extract<
        ParsedText,
        { step: "property" }
      >;
      expect(propertyResult.property.propertyKey).toBe("instance-id");
      expect(propertyResult.operator).toBe(":");
      expect(propertyResult.value).toBe("value");
    });
  });

  describe("free-text fallback", () => {
    test("should fallback to free-text when no property is matched", () => {
      const result = parseQueryText("Random text", parsedProperties);
      expect(result.step).toBe("free-text");
      const freeTextResult = result as Extract<
        ParsedText,
        { step: "free-text" }
      >;
      expect(freeTextResult.value).toBe("Random text");
    });

    test("should fallback to free-text with partial operator match that is invalid", () => {
      const result = parseQueryText("Status@somevalue", parsedProperties);
      expect(result.step).toBe("free-text");
    });
  });
});
