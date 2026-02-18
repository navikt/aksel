import { describe, expect, test } from "vitest";
import type {
  ParsedOption,
  ParsedProperty,
  QueryFilteringOption,
  QueryFilteringProperty,
} from "../TokenFilter.types";
import {
  type AutoCompleteOption,
  generateAutoCompleteOptions,
} from "./generate-autocomplete-options";
import type { ParsedText } from "./parse-query-text";

const properties: QueryFilteringProperty[] = [
  {
    groupValuesLabel: "Status values",
    group: "Metadata",
    key: "status",
    propertyLabel: "Status",
  },
  {
    groupValuesLabel: "Region values",
    group: "Location",
    key: "region",
    propertyLabel: "Region",
  },
  {
    groupValuesLabel: "Type values",
    group: "",
    key: "type",
    propertyLabel: "Type",
  },
];

const parsedProperties: ParsedProperty[] = properties.map((prop) => ({
  propertyKey: prop.key,
  propertyLabel: prop.propertyLabel,
  groupValuesLabel: prop.groupValuesLabel ?? "",
  propertyGroup: prop.group ?? "",
  externalProperty: prop,
}));

const statusOptions: QueryFilteringOption[] = [
  { propertyKey: "status", value: "active", label: "Active" },
  { propertyKey: "status", value: "pending", label: "Pending" },
  { propertyKey: "status", value: "inactive", label: "Inactive" },
];

const regionOptions: QueryFilteringOption[] = [
  {
    propertyKey: "region",
    value: "us-east-1",
    label: "US East",
    tags: ["north america", "usa"],
  },
  {
    propertyKey: "region",
    value: "eu-west-1",
    label: "EU West",
    tags: ["europe"],
  },
];

const allOptions: QueryFilteringOption[] = [...statusOptions, ...regionOptions];

const parsedOptions: ParsedOption[] = allOptions.map((option) => {
  const property = parsedProperties.find(
    (p) => p.propertyKey === option.propertyKey,
  );
  return {
    property: property || null,
    value: option.value,
    label: option.label || String(option.value),
    tags: option.tags || [],
    filteringTags: option.filteringTags || [],
  };
});

describe("generateAutoCompleteOptions v2", () => {
  describe("free-text step", () => {
    test("empty value: should return all properties", () => {
      const queryState: ParsedText = {
        step: "free-text",
        value: "",
      };

      const result = generateAutoCompleteOptions(
        queryState,
        parsedProperties,
        parsedOptions,
      );

      expect(result.value).toBe("");
      expect(result.options).toHaveLength(3);
      expect(
        result.options.find((g) => g.label === "Metadata")?.options,
      ).toHaveLength(1);
      expect(
        result.options.find((g) => g.label === "Location")?.options,
      ).toHaveLength(1);
      expect(
        result.options.find((g) => g.label === "Properties")?.options,
      ).toHaveLength(1);
    });

    test("non-empty value: should return filtered properties and values", () => {
      const queryState: ParsedText = {
        step: "free-text",
        value: "statu",
      };

      const result = generateAutoCompleteOptions(
        queryState,
        parsedProperties,
        parsedOptions,
      );

      expect(result.value).toBe("statu");
      expect(result.options.length).toBeGreaterThan(0);

      const valueGroup = result.options.find(
        (g) => g.label === "Status values",
      );
      expect(valueGroup).toBeDefined();
      expect(valueGroup?.options).toHaveLength(3);
    });

    test("non-empty value with operator '!:': should skip property suggestions", () => {
      const queryState: ParsedText = {
        step: "free-text",
        value: "test",
        operator: "!:",
      };

      const result = generateAutoCompleteOptions(
        queryState,
        parsedProperties,
        parsedOptions,
      );

      expect(result.value).toBe("test");
      const hasPropertyGroups = result.options.some(
        (g) => g.label === "Metadata" || g.label === "Location",
      );
      expect(hasPropertyGroups).toBe(false);
    });

    test("non-empty value: case-insensitive filtering", () => {
      const queryState: ParsedText = {
        step: "free-text",
        value: "STATU",
      };

      const result = generateAutoCompleteOptions(
        queryState,
        parsedProperties,
        parsedOptions,
      );

      expect(result.value).toBe("STATU");
      expect(result.options.length).toBeGreaterThan(0);

      const valueGroup = result.options.find(
        (g) => g.label === "Status values",
      );
      expect(valueGroup).toBeDefined();
      expect(valueGroup?.options).toHaveLength(3);
    });

    test("non-empty value: should match tags", () => {
      const queryState: ParsedText = {
        step: "free-text",
        value: "europe",
      };

      const result = generateAutoCompleteOptions(
        queryState,
        parsedProperties,
        parsedOptions,
      );

      const valueGroup = result.options.find(
        (g) => g.label === "Region values",
      );
      expect(valueGroup).toBeDefined();
      expect(valueGroup?.options).toHaveLength(1);
      expect((valueGroup?.options[0] as AutoCompleteOption).label).toBe(
        "EU West",
      );
    });

    test("non-empty value: whitespace-aware matching", () => {
      const queryState: ParsedText = {
        step: "free-text",
        value: "us east",
      };

      const result = generateAutoCompleteOptions(
        queryState,
        parsedProperties,
        parsedOptions,
      );

      const valueGroup = result.options.find(
        (g) => g.label === "Region values",
      );
      expect(valueGroup).toBeDefined();
      expect(valueGroup?.options).toHaveLength(1);
      expect((valueGroup?.options[0] as AutoCompleteOption).label).toBe(
        "US East",
      );
    });
  });

  describe("property step", () => {
    const statusProperty = parsedProperties[0];

    test("empty value: should return all values for selected property", () => {
      const queryState: ParsedText = {
        step: "property",
        property: statusProperty,
        operator: "=",
        value: "",
      };

      const result = generateAutoCompleteOptions(
        queryState,
        parsedProperties,
        parsedOptions,
      );

      expect(result.value).toBe("");
      expect(result.options).toHaveLength(1);
      expect(result.options[0].label).toBe("Status values");
      expect(result.options[0].options).toHaveLength(3);
    });

    test("non-empty value: should return filtered values", () => {
      const queryState: ParsedText = {
        step: "property",
        property: statusProperty,
        operator: "=",
        value: "act",
      };

      const result = generateAutoCompleteOptions(
        queryState,
        parsedProperties,
        parsedOptions,
      );

      expect(result.value).toBe("act");
      expect(result.options).toHaveLength(1);
      expect(result.options[0].options).toHaveLength(2);
      const labels = result.options[0].options.map((o) => o.label);
      expect(labels).toContain("Active");
      expect(labels).toContain("Inactive");
    });

    test("should use specified operator in value suggestions", () => {
      const queryState: ParsedText = {
        step: "property",
        property: statusProperty,
        operator: "!=",
        value: "",
      };

      const result = generateAutoCompleteOptions(
        queryState,
        parsedProperties,
        parsedOptions,
      );

      expect(
        (result.options[0].options[0] as AutoCompleteOption).value,
      ).toContain("!=");
    });
  });

  describe("operator step", () => {
    const statusProperty = parsedProperties[0];

    test("empty prefix: should return all operators", () => {
      const queryState: ParsedText = {
        step: "operator",
        property: statusProperty,
        operatorPrefix: "",
      };

      const result = generateAutoCompleteOptions(
        queryState,
        parsedProperties,
        parsedOptions,
      );

      expect(result.options).toHaveLength(1);
      expect(result.options[0].label).toBe("Operators");
      expect(result.options[0].options.length).toBe(10);
    });

    test("operator prefix '!': should filter operators starting with '!'", () => {
      const queryState: ParsedText = {
        step: "operator",
        property: statusProperty,
        operatorPrefix: "!",
      };

      const result = generateAutoCompleteOptions(
        queryState,
        parsedProperties,
        parsedOptions,
      );

      expect(result.options).toHaveLength(1);
      expect(result.options[0].label).toBe("Operators");
      expect(result.options[0].options).toHaveLength(3);
      const operators = result.options[0].options.map(
        (o) => o.value.split(" ")[1],
      );
      expect(operators).toEqual(["!=", "!:", "!^"]);
    });

    test("operator prefix '>=': should filter to single operator", () => {
      const queryState: ParsedText = {
        step: "operator",
        property: statusProperty,
        operatorPrefix: ">=",
      };

      const result = generateAutoCompleteOptions(
        queryState,
        parsedProperties,
        parsedOptions,
      );

      expect(result.options).toHaveLength(1);
      expect(result.options[0].options).toHaveLength(1);
      expect(
        (result.options[0].options[0] as AutoCompleteOption).description,
      ).toBe("is greater than or equal to");
    });

    test("invalid prefix: should throw error", () => {
      const queryState: ParsedText = {
        step: "operator",
        property: statusProperty,
        operatorPrefix: "invalid",
      };

      expect(() =>
        generateAutoCompleteOptions(
          queryState,
          parsedProperties,
          parsedOptions,
        ),
      ).toThrow("Detected unhandles state. Implement edgecase");
    });
  });

  describe("operator filtering by description", () => {
    test("should filter operators by description text", () => {
      const queryState: ParsedText = {
        step: "operator",
        property: parsedProperties[0],
        operatorPrefix: "",
      };

      const result = generateAutoCompleteOptions(
        queryState,
        parsedProperties,
        parsedOptions,
      );

      const containsOp = result.options[0].options.find(
        (o) => (o as AutoCompleteOption).description === "contains",
      );
      expect(containsOp).toBeDefined();
    });
  });

  describe("empty groups filtering", () => {
    test("should not return empty option groups", () => {
      const queryState: ParsedText = {
        step: "free-text",
        value: "nonexistent",
      };

      const result = generateAutoCompleteOptions(
        queryState,
        parsedProperties,
        parsedOptions,
      );

      expect(result.options.every((group) => group.options.length > 0)).toBe(
        true,
      );
    });
  });

  describe("value suggestions use correct operator", () => {
    test("free-text step uses '=' operator for all values", () => {
      const queryState: ParsedText = {
        step: "free-text",
        value: "active",
      };

      const result = generateAutoCompleteOptions(
        queryState,
        parsedProperties,
        parsedOptions,
      );

      const valueGroup = result.options.find(
        (g) => g.label === "Status values",
      );
      expect(valueGroup).toBeDefined();
      expect((valueGroup?.options[0] as AutoCompleteOption).value).toContain(
        " = ",
      );
    });

    test("property step uses selected operator", () => {
      const queryState: ParsedText = {
        step: "property",
        property: parsedProperties[0],
        operator: "!:",
        value: "",
      };

      const result = generateAutoCompleteOptions(
        queryState,
        parsedProperties,
        parsedOptions,
      );

      expect(
        (result.options[0].options[0] as AutoCompleteOption).value,
      ).toContain(" !: ");
    });
  });
});
