import { describe, expect, test } from "vitest";
import type { AutoCompleteOption } from "../AutoSuggest.types";
import type {
  ParsedOption,
  ParsedProperty,
  QueryFilteringOption,
  QueryFilteringProperty,
} from "../TokenFilter.types";
import { generateAutoCompleteOptions } from "./generate-autocomplete-options";
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
  operators: prop.operators ?? [],
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

    test("invalid prefix: should return empty suggestions", () => {
      const queryState: ParsedText = {
        step: "operator",
        property: statusProperty,
        operatorPrefix: "invalid",
      };

      const result = generateAutoCompleteOptions(
        queryState,
        parsedProperties,
        parsedOptions,
      );

      expect(result.value).toBe("Status invalid");
      expect(result.options).toEqual([]);
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

  describe("custom operators configuration", () => {
    test("property with string-format operators should filter to only those operators", () => {
      const propertyWithCustomOps: ParsedProperty = {
        propertyKey: "custom",
        propertyLabel: "Custom",
        groupValuesLabel: "Custom values",
        propertyGroup: "Custom",
        operators: ["=", "!="],
        externalProperty: {
          key: "custom",
          propertyLabel: "Custom",
          operators: ["=", "!="],
        },
      };

      const queryState: ParsedText = {
        step: "operator",
        property: propertyWithCustomOps,
        operatorPrefix: "",
      };

      const result = generateAutoCompleteOptions(
        queryState,
        [propertyWithCustomOps],
        [],
      );

      expect(result.options[0].options).toHaveLength(2);
      const operatorSymbols = result.options[0].options.map(
        (o) => (o as AutoCompleteOption).value.split(" ")[1],
      );
      expect(operatorSymbols).toEqual(["=", "!="]);
    });

    test("property with object-format operators should extract operator strings", () => {
      const propertyWithObjectOps: ParsedProperty = {
        propertyKey: "custom2",
        propertyLabel: "Custom2",
        groupValuesLabel: "Custom2 values",
        propertyGroup: "Custom",
        operators: [
          { operator: ":", tokenType: "single" },
          { operator: "!:", tokenType: "single" },
        ],
        externalProperty: {
          key: "custom2",
          propertyLabel: "Custom2",
          operators: [
            { operator: ":", tokenType: "single" },
            { operator: "!:", tokenType: "single" },
          ],
        },
      };

      const queryState: ParsedText = {
        step: "operator",
        property: propertyWithObjectOps,
        operatorPrefix: "",
      };

      const result = generateAutoCompleteOptions(
        queryState,
        [propertyWithObjectOps],
        [],
      );

      expect(result.options[0].options).toHaveLength(2);
      const operatorSymbols = result.options[0].options.map(
        (o) => (o as AutoCompleteOption).value.split(" ")[1],
      );
      expect(operatorSymbols).toEqual([":", "!:"]);
    });

    test("property with mixed operator formats should normalize and filter", () => {
      const propertyWithMixedOps: ParsedProperty = {
        propertyKey: "mixed",
        propertyLabel: "Mixed",
        groupValuesLabel: "Mixed values",
        propertyGroup: "Custom",
        operators: [
          "=",
          { operator: "!=", tokenType: "single" },
          "invalid-operator",
        ],
        externalProperty: {
          key: "mixed",
          propertyLabel: "Mixed",
          operators: [
            "=",
            { operator: "!=", tokenType: "single" },
            "invalid-operator",
          ],
        },
      };

      const queryState: ParsedText = {
        step: "operator",
        property: propertyWithMixedOps,
        operatorPrefix: "",
      };

      const result = generateAutoCompleteOptions(
        queryState,
        [propertyWithMixedOps],
        [],
      );

      expect(result.options[0].options).toHaveLength(2);
      const operatorSymbols = result.options[0].options.map(
        (o) => (o as AutoCompleteOption).value.split(" ")[1],
      );
      expect(operatorSymbols).toEqual(["=", "!="]);
    });
  });

  describe("edge case: operator without value", () => {
    test("should return empty options when operator is present but value is empty", () => {
      const queryState: ParsedText = {
        step: "free-text",
        value: "",
        operator: "!=",
      };

      const result = generateAutoCompleteOptions(
        queryState,
        parsedProperties,
        parsedOptions,
      );

      expect(result.value).toBe("");
      expect(result.options).toEqual([]);
    });

    test("should return empty options when operator-start input has no value", () => {
      const queryState: ParsedText = {
        step: "free-text",
        value: "",
        operator: ":",
      };

      const result = generateAutoCompleteOptions(
        queryState,
        parsedProperties,
        parsedOptions,
      );

      expect(result.value).toBe("");
      expect(result.options).toEqual([]);
    });
  });

  describe("scoped vs non-scoped value suggestions", () => {
    test("scoped to property should only show values from that property", () => {
      const statusProperty = parsedProperties[0];

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

      expect(result.options).toHaveLength(1);
      expect(result.options[0].label).toBe("Status values");
      expect(result.options[0].options).toHaveLength(3);
      expect(
        (result.options[0].options[0] as AutoCompleteOption).value,
      ).toContain("Status");
    });

    test("non-scoped (free-text) with empty value should show all properties", () => {
      const queryState: ParsedText = {
        step: "free-text",
        value: "",
      };

      const result = generateAutoCompleteOptions(
        queryState,
        parsedProperties,
        parsedOptions,
      );

      const propertyGroups = result.options.filter(
        (g) => g.label === "Metadata" || g.label === "Location",
      );
      expect(propertyGroups.length).toBeGreaterThan(0);
    });

    test("scoped property search should not include property labels in search fields", () => {
      const statusProperty = parsedProperties[0];

      const queryState: ParsedText = {
        step: "property",
        property: statusProperty,
        operator: "=",
        value: "region",
      };

      const result = generateAutoCompleteOptions(
        queryState,
        parsedProperties,
        parsedOptions,
      );

      expect(result.options).toHaveLength(0);
    });

    test("non-scoped search should include property labels in search", () => {
      const queryState: ParsedText = {
        step: "free-text",
        value: "region",
      };

      const result = generateAutoCompleteOptions(
        queryState,
        parsedProperties,
        parsedOptions,
      );

      const _regionOptions = result.options.find(
        (g) => g.label === "Region values",
      );
      expect(_regionOptions).toBeDefined();
    });
  });

  describe("properties with no groupValuesLabel", () => {
    test("should default to 'Values' when groupValuesLabel is empty", () => {
      const propertyWithoutGroupLabel: ParsedProperty = {
        propertyKey: "nogroup",
        propertyLabel: "NoGroup",
        groupValuesLabel: "",
        propertyGroup: "Custom",
        operators: [],
        externalProperty: {
          key: "nogroup",
          propertyLabel: "NoGroup",
        },
      };

      const optionsForProperty: ParsedOption[] = [
        {
          property: propertyWithoutGroupLabel,
          value: "val1",
          label: "Value 1",
          tags: [],
        },
      ];

      const queryState: ParsedText = {
        step: "property",
        property: propertyWithoutGroupLabel,
        operator: "=",
        value: "",
      };

      const result = generateAutoCompleteOptions(
        queryState,
        [propertyWithoutGroupLabel],
        optionsForProperty,
      );

      expect(result.options[0].label).toBe("Values");
    });
  });

  describe("null or missing property references", () => {
    test("should skip options with null property reference", () => {
      const optionsWithNull: ParsedOption[] = [
        {
          property: null,
          value: "orphaned",
          label: "Orphaned Value",
          tags: [],
        },
        ...parsedOptions,
      ];

      const queryState: ParsedText = {
        step: "free-text",
        value: "orphaned",
      };

      const result = generateAutoCompleteOptions(
        queryState,
        parsedProperties,
        optionsWithNull,
      );

      const orphanedOption = result.options.some((g) =>
        g.options.some((o) => o.label === "Orphaned Value"),
      );
      expect(orphanedOption).toBe(false);
    });

    test("should skip properties with no data", () => {
      const queryState: ParsedText = {
        step: "free-text",
        value: "",
      };

      const result = generateAutoCompleteOptions(queryState, [], []);

      expect(result.options).toEqual([]);
    });
  });

  describe("operator prefix filtering", () => {
    test("prefix ':' should match ':' and '!:' operators", () => {
      const queryState: ParsedText = {
        step: "operator",
        property: parsedProperties[0],
        operatorPrefix: ":",
      };

      const result = generateAutoCompleteOptions(
        queryState,
        parsedProperties,
        parsedOptions,
      );

      expect(result.options[0].options.length).toBeGreaterThan(0);
      const operators = result.options[0].options.map(
        (o) => (o as AutoCompleteOption).value.split(" ")[1],
      );
      expect(operators).toContain(":");
    });

    test("prefix '>' should match '>', '>=', '!>' operators", () => {
      const queryState: ParsedText = {
        step: "operator",
        property: parsedProperties[0],
        operatorPrefix: ">",
      };

      const result = generateAutoCompleteOptions(
        queryState,
        parsedProperties,
        parsedOptions,
      );

      expect(result.options[0].options.length).toBeGreaterThan(0);
      const operators = result.options[0].options.map(
        (o) => (o as AutoCompleteOption).value.split(" ")[1],
      );
      expect(operators).toContain(">");
      expect(operators).toContain(">=");
    });
  });

  describe("buildQueryString integration", () => {
    test("query string should contain property, operator, and value", () => {
      const queryState: ParsedText = {
        step: "property",
        property: parsedProperties[0],
        operator: "=",
        value: "active",
      };

      const result = generateAutoCompleteOptions(
        queryState,
        parsedProperties,
        parsedOptions,
      );

      expect(result.options[0].options.length).toBeGreaterThan(0);
      const queryStr = (result.options[0].options[0] as AutoCompleteOption)
        .value;
      expect(queryStr).toContain("Status");
      expect(queryStr).toContain("=");
      expect(queryStr).toContain("active");
    });

    test("operator-step value should only contain property and operator", () => {
      const queryState: ParsedText = {
        step: "operator",
        property: parsedProperties[0],
        operatorPrefix: "=",
      };

      const result = generateAutoCompleteOptions(
        queryState,
        parsedProperties,
        parsedOptions,
      );

      expect(result.value).toBe("Status =");
    });
  });
});
