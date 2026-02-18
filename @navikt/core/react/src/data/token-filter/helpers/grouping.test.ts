import { describe, expect, test } from "vitest";
import { createGroups } from "./grouping";

interface TestItem {
  name: string;
  group?: string;
  value: string;
}

describe("createGroups", () => {
  describe("basic grouping", () => {
    test("groups items by label", () => {
      const items: TestItem[] = [
        { name: "Item 1", group: "Group A", value: "1" },
        { name: "Item 2", group: "Group B", value: "2" },
        { name: "Item 3", group: "Group A", value: "3" },
      ];

      const groups = createGroups(items, (item) => item.group);

      expect(groups).toHaveLength(2);
      expect(groups[0].label).toBe("Group A");
      expect(groups[0].options).toHaveLength(2);
      expect(groups[1].label).toBe("Group B");
      expect(groups[1].options).toHaveLength(1);
    });

    test("uses default group for items without group label", () => {
      const items: TestItem[] = [
        { name: "Item 1", group: "Group A", value: "1" },
        { name: "Item 2", value: "2" },
      ];

      const groups = createGroups(items, (item) => item.group, "Default");

      expect(groups).toHaveLength(2);
      expect(groups[0].label).toBe("Group A");
      expect(groups[1].label).toBe("Default");
      expect(groups[1].options).toHaveLength(1);
    });

    test("places default group last", () => {
      const items: TestItem[] = [
        { name: "No group", value: "0" },
        { name: "Item 1", group: "Group A", value: "1" },
        { name: "Item 2", group: "Group B", value: "2" },
      ];

      const groups = createGroups(items, (item) => item.group, "Default");

      expect(groups).toHaveLength(3);
      expect(groups[2].label).toBe("Default");
    });

    test("returns empty array when no items", () => {
      const groups = createGroups([], (item: TestItem) => item.group);

      expect(groups).toEqual([]);
    });
  });

  describe("empty string handling", () => {
    test("treats empty string as default group", () => {
      const items: TestItem[] = [
        { name: "Item 1", group: "Group A", value: "1" },
        { name: "Item 2", group: "", value: "2" },
      ];

      const groups = createGroups(items, (item) => item.group, "Properties");

      expect(groups).toHaveLength(2);
      expect(groups[0].label).toBe("Group A");
      expect(groups[1].label).toBe("Properties");
      expect(groups[1].options).toHaveLength(1);
    });

    test("treats whitespace-only string as default group", () => {
      const items: TestItem[] = [
        { name: "Item 1", group: "Group A", value: "1" },
        { name: "Item 2", group: "   ", value: "2" },
      ];

      const groups = createGroups(items, (item) => item.group, "Default");

      expect(groups).toHaveLength(2);
      expect(groups[1].label).toBe("Default");
      expect(groups[1].options).toHaveLength(1);
    });
  });

  describe("null/undefined handling", () => {
    test("treats undefined group as default group", () => {
      const items: TestItem[] = [
        { name: "Item 1", group: "Group A", value: "1" },
        { name: "Item 2", group: undefined, value: "2" },
      ];

      const groups = createGroups(items, (item) => item.group, "Default");

      expect(groups).toHaveLength(2);
      expect(groups[1].label).toBe("Default");
    });

    test("treats null group as default group", () => {
      const items: TestItem[] = [
        { name: "Item 1", group: "Group A", value: "1" },
        { name: "Item 2", group: null as any, value: "2" },
      ];

      const groups = createGroups(items, (item) => item.group, "Default");

      expect(groups).toHaveLength(2);
      expect(groups[1].label).toBe("Default");
    });

    test("skips null/undefined items", () => {
      const items = [
        { name: "Item 1", group: "Group A", value: "1" },
        null as any,
        undefined as any,
        { name: "Item 2", group: "Group A", value: "2" },
      ];

      const groups = createGroups(items, (item) => item.group);

      expect(groups).toHaveLength(1);
      expect(groups[0].options).toHaveLength(2);
    });
  });

  describe("edge cases", () => {
    test("handles all items in default group", () => {
      const items: TestItem[] = [
        { name: "Item 1", value: "1" },
        { name: "Item 2", value: "2" },
      ];

      const groups = createGroups(items, (item) => item.group, "All");

      expect(groups).toHaveLength(1);
      expect(groups[0].label).toBe("All");
      expect(groups[0].options).toHaveLength(2);
    });

    test("handles single item", () => {
      const items: TestItem[] = [
        { name: "Item 1", group: "Group A", value: "1" },
      ];

      const groups = createGroups(items, (item) => item.group);

      expect(groups).toHaveLength(1);
      expect(groups[0].label).toBe("Group A");
      expect(groups[0].options).toHaveLength(1);
    });

    test("preserves item order within groups", () => {
      const items: TestItem[] = [
        { name: "Item 3", group: "Group A", value: "3" },
        { name: "Item 1", group: "Group A", value: "1" },
        { name: "Item 2", group: "Group A", value: "2" },
      ];

      const groups = createGroups(items, (item) => item.group);

      expect(groups[0].options[0].value).toBe("3");
      expect(groups[0].options[1].value).toBe("1");
      expect(groups[0].options[2].value).toBe("2");
    });

    test("trims group labels", () => {
      const items: TestItem[] = [
        { name: "Item 1", group: "  Group A  ", value: "1" },
        { name: "Item 2", group: "Group A", value: "2" },
      ];

      const groups = createGroups(items, (item) => item.group);

      expect(groups).toHaveLength(1);
      expect(groups[0].label).toBe("Group A");
      expect(groups[0].options).toHaveLength(2);
    });
  });

  describe("custom default group label", () => {
    test("uses custom default group label", () => {
      const items: TestItem[] = [{ name: "Item 1", value: "1" }];

      const groups = createGroups(
        items,
        (item) => item.group,
        "Custom Default",
      );

      expect(groups[0].label).toBe("Custom Default");
    });

    test("defaults to 'Default' when not provided", () => {
      const items: TestItem[] = [{ name: "Item 1", value: "1" }];

      const groups = createGroups(items, (item) => item.group);

      expect(groups[0].label).toBe("Default");
    });
  });
});
