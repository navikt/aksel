import { describe, expect, test } from "vitest";
import type { AutoCompleteOption } from "../AutoSuggest.types";
import type {
  ExternalOption,
  ExternalPropertyDefinition,
  InternalParsedTextState,
  InternalPropertyDefinition,
  InternalPropertyOption,
} from "../TokenFilter.types";
import { generateAutoCompleteOptions } from "./generate-autocomplete-options";

const properties: ExternalPropertyDefinition[] = [
  {
    groupLabel: "Status values",
    group: "Metadata",
    key: "status",
    label: "Status",
  },
  {
    groupLabel: "Region values",
    group: "Location",
    key: "region",
    label: "Region",
  },
  {
    groupLabel: "Type values",
    group: "",
    key: "type",
    label: "Type",
  },
];

const parsedProperties: InternalPropertyDefinition[] = properties.map(
  (prop) => ({
    key: prop.key,
    label: prop.label,
    groupLabel: prop.groupLabel ?? "",
    group: prop.group ?? "",
    externalProperty: prop,
    operators: prop.operators ?? [],
  }),
);

const statusOptions: ExternalOption[] = [
  { propertyKey: "status", value: "active", label: "Active" },
  { propertyKey: "status", value: "pending", label: "Pending" },
  { propertyKey: "status", value: "inactive", label: "Inactive" },
];

const regionOptions: ExternalOption[] = [
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

const allOptions: ExternalOption[] = [...statusOptions, ...regionOptions];

const parsedOptions: InternalPropertyOption[] = allOptions.map((option) => {
  const property = parsedProperties.find((p) => p.key === option.propertyKey);
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
      const queryState: InternalParsedTextState = {
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
      const queryState: InternalParsedTextState = {
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
      const queryState: InternalParsedTextState = {
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
      const queryState: InternalParsedTextState = {
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
      const queryState: InternalParsedTextState = {
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
        "Region = eu-west-1",
      );
    });

    test("non-empty value: whitespace-aware matching", () => {
      const queryState: InternalParsedTextState = {
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
        "Region = us-east-1",
      );
    });
  });

  describe("property step", () => {
    const statusProperty = parsedProperties[0];

    test("empty value: should return all values for selected property", () => {
      const queryState: InternalParsedTextState = {
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
      const queryState: InternalParsedTextState = {
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
      expect(labels).toContain("Status = active");
      expect(labels).toContain("Status = inactive");
    });

    test("should use specified operator in value suggestions", () => {
      const queryState: InternalParsedTextState = {
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
      const queryState: InternalParsedTextState = {
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
      const queryState: InternalParsedTextState = {
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
      const queryState: InternalParsedTextState = {
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
      const queryState: InternalParsedTextState = {
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
      const queryState: InternalParsedTextState = {
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
      const queryState: InternalParsedTextState = {
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
      const queryState: InternalParsedTextState = {
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
      const queryState: InternalParsedTextState = {
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
      const propertyWithCustomOps: InternalPropertyDefinition = {
        key: "custom",
        label: "Custom",
        groupLabel: "Custom values",
        group: "Custom",
        operators: ["=", "!="],
        externalProperty: {
          key: "custom",
          label: "Custom",
          operators: ["=", "!="],
        },
      };

      const queryState: InternalParsedTextState = {
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
      const propertyWithObjectOps: InternalPropertyDefinition = {
        key: "custom2",
        label: "Custom2",
        groupLabel: "Custom2 values",
        group: "Custom",
        operators: [
          { operator: ":", type: "single" },
          { operator: "!:", type: "single" },
        ],
        externalProperty: {
          key: "custom2",
          label: "Custom2",
          operators: [
            { operator: ":", type: "single" },
            { operator: "!:", type: "single" },
          ],
        },
      };

      const queryState: InternalParsedTextState = {
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
      const propertyWithMixedOps: InternalPropertyDefinition = {
        key: "mixed",
        label: "Mixed",
        groupLabel: "Mixed values",
        group: "Custom",
        operators: [
          "=",
          { operator: "!=", type: "single" },
          "invalid-operator",
        ],
        externalProperty: {
          key: "mixed",
          label: "Mixed",
          operators: [
            "=",
            { operator: "!=", type: "single" },
            "invalid-operator",
          ],
        },
      };

      const queryState: InternalParsedTextState = {
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
      const queryState: InternalParsedTextState = {
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
      const queryState: InternalParsedTextState = {
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

      const queryState: InternalParsedTextState = {
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
      const queryState: InternalParsedTextState = {
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

      const queryState: InternalParsedTextState = {
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
      const queryState: InternalParsedTextState = {
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
      const propertyWithoutGroupLabel: InternalPropertyDefinition = {
        key: "nogroup",
        label: "NoGroup",
        groupLabel: "",
        group: "Custom",
        operators: [],
        externalProperty: {
          key: "nogroup",
          label: "NoGroup",
        },
      };

      const optionsForProperty: InternalPropertyOption[] = [
        {
          property: propertyWithoutGroupLabel,
          value: "val1",
          label: "Value 1",
          tags: [],
        },
      ];

      const queryState: InternalParsedTextState = {
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
      const optionsWithNull: InternalPropertyOption[] = [
        {
          property: null,
          value: "orphaned",
          label: "Orphaned Value",
          tags: [],
        },
        ...parsedOptions,
      ];

      const queryState: InternalParsedTextState = {
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
      const queryState: InternalParsedTextState = {
        step: "free-text",
        value: "",
      };

      const result = generateAutoCompleteOptions(queryState, [], []);

      expect(result.options).toEqual([]);
    });
  });

  describe("operator prefix filtering", () => {
    test("prefix ':' should match ':' and '!:' operators", () => {
      const queryState: InternalParsedTextState = {
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
      const queryState: InternalParsedTextState = {
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
      const queryState: InternalParsedTextState = {
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
      const queryState: InternalParsedTextState = {
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
