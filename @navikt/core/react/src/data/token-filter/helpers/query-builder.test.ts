import { describe, expect, test } from "vitest";
import { buildQueryString } from "./query-builder";

describe("buildQueryString", () => {
  describe("basic query building", () => {
    test("builds complete query with all parts", () => {
      expect(buildQueryString("Status", "=", "active")).toBe("Status = active");
    });

    test("builds query with property and operator only", () => {
      expect(buildQueryString("Status", "=", "")).toBe("Status =");
    });

    test("builds query with property only", () => {
      expect(buildQueryString("Status", "", "")).toBe("Status");
    });

    test("returns empty string when all parts are empty", () => {
      expect(buildQueryString("", "", "")).toBe("");
    });
  });

  describe("operator variations", () => {
    test("builds query with contains operator", () => {
      expect(buildQueryString("Name", ":", "test")).toBe("Name : test");
    });

    test("builds query with not equal operator", () => {
      expect(buildQueryString("Status", "!=", "inactive")).toBe(
        "Status != inactive",
      );
    });

    test("builds query with starts with operator", () => {
      expect(buildQueryString("ID", "^", "prefix")).toBe("ID ^ prefix");
    });

    test("builds query with greater than or equal operator", () => {
      expect(buildQueryString("Count", ">=", "10")).toBe("Count >= 10");
    });

    test("builds query with all comparison operators", () => {
      expect(buildQueryString("Value", ">", "5")).toBe("Value > 5");
      expect(buildQueryString("Value", "<", "5")).toBe("Value < 5");
      expect(buildQueryString("Value", ">=", "5")).toBe("Value >= 5");
      expect(buildQueryString("Value", "<=", "5")).toBe("Value <= 5");
    });
  });

  describe("whitespace handling", () => {
    test("joins parts with single space", () => {
      expect(buildQueryString("Property", "=", "value")).toBe(
        "Property = value",
      );
    });

    test("does not add extra spaces for missing parts", () => {
      expect(buildQueryString("Property", "", "value")).toBe("Property value");
    });

    test("handles value with spaces", () => {
      expect(buildQueryString("Region", "=", "US East")).toBe(
        "Region = US East",
      );
    });

    test("handles property with spaces", () => {
      expect(buildQueryString("Instance ID", "=", "12345")).toBe(
        "Instance ID = 12345",
      );
    });
  });

  describe("edge cases", () => {
    test("handles numeric values", () => {
      expect(buildQueryString("Count", "=", "123")).toBe("Count = 123");
    });

    test("handles special characters in value", () => {
      expect(buildQueryString("Path", "=", "/var/log")).toBe("Path = /var/log");
    });

    test("handles hyphenated values", () => {
      expect(buildQueryString("Region", "=", "us-east-1")).toBe(
        "Region = us-east-1",
      );
    });

    test("omits operator when undefined", () => {
      expect(buildQueryString("Status", undefined as any, "active")).toBe(
        "Status active",
      );
    });

    test("omits value when null", () => {
      expect(buildQueryString("Status", "=", null as any)).toBe("Status =");
    });

    test("filters out falsy values correctly", () => {
      // 0 is falsy but should be filtered by Boolean()
      expect(buildQueryString("Count", "=", "0")).toBe("Count = 0");
      // Empty string is falsy and should be filtered
      expect(buildQueryString("Test", "", "")).toBe("Test");
    });
  });

  describe("real-world examples", () => {
    test("builds property-only queries for operator selection", () => {
      expect(buildQueryString("Status", "!", "")).toBe("Status !");
    });

    test("builds complete filter queries", () => {
      expect(buildQueryString("Availability Zone", ":", "east")).toBe(
        "Availability Zone : east",
      );
    });

    test("builds negation queries", () => {
      expect(buildQueryString("Status", "!=", "terminated")).toBe(
        "Status != terminated",
      );
      expect(buildQueryString("Name", "!:", "test")).toBe("Name !: test");
      expect(buildQueryString("ID", "!^", "prod")).toBe("ID !^ prod");
    });
  });
});
