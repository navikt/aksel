import type { OptionGroup } from "./generate-autocomplete-options";

/**
 * Groups items into labeled groups with support for a default group.
 * Empty or whitespace-only group labels are treated as belonging to the default group.
 *
 * @returns Array of groups with non-empty options
 *
 * @example
 * const properties = [
 *   { name: "Status", group: "Metadata" },
 *   { name: "Region", group: "Location" },
 *   { name: "Type", group: "" },
 * ];
 * const groups = createGroups(
 *   properties,
 *   (p) => p.group,
 *   "Properties"
 * );
 * // Returns:
 * // [
 * //   { label: "Metadata", options: [{ name: "Status", group: "Metadata" }] },
 * //   { label: "Location", options: [{ name: "Region", group: "Location" }] },
 * //   { label: "Properties", options: [{ name: "Type", group: "" }] }
 * // ]
 */
function createGroups<T>(
  items: T[],
  getGroupLabel: (item: T) => string | undefined | null,
  defaultGroupLabel = "Default",
): OptionGroup<T>[] {
  const defaultGroup: OptionGroup<T> = {
    label: defaultGroupLabel,
    options: [],
  };
  const customGroups: Record<string, OptionGroup<T>> = {};

  for (const item of items) {
    if (!item) {
      continue;
    }

    const rawLabel = getGroupLabel(item);
    const groupLabel = rawLabel?.trim();

    /* Empty string after trim or falsy values go to default group */
    if (!groupLabel) {
      defaultGroup.options.push(item);
      continue;
    }

    if (!customGroups[groupLabel]) {
      customGroups[groupLabel] = {
        label: groupLabel,
        options: [],
      };
    }

    customGroups[groupLabel].options.push(item);
  }

  /* Custom groups first, then default group if it has items */
  const groups: OptionGroup<T>[] = [...Object.values(customGroups)];

  if (defaultGroup.options.length > 0) {
    groups.push(defaultGroup);
  }

  return groups;
}

/**
 * Filters items and groups them with support for a default group.
 * Empty or whitespace-only group labels are treated as belonging to the default group.
 *
 * @param items - Array of items to filter and group
 * @param shouldInclude - Predicate function to determine if an item should be included
 * @param getGroupLabel - Function to extract the group label from an item
 * @param defaultGroupLabel - Label for items without a group (default: "Default")
 * @returns Array of groups with non-empty options
 *
 * @example
 * const options = [
 *   { name: "Active", type: "status", value: "active" },
 *   { name: "US East", type: "region", value: "us-east" },
 *   { name: "Inactive", type: "status", value: "inactive" },
 * ];
 * const groups = filterAndGroup(
 *   options,
 *   (o) => o.type === "status",
 *   (o) => o.type,
 *   "Values"
 * );
 * // Returns:
 * // [{ label: "status", options: [{ name: "Active", ... }, { name: "Inactive", ... }] }]
 */
function filterAndGroup<T>(
  items: T[],
  shouldInclude: (item: T) => boolean,
  getGroupLabel: (item: T) => string | undefined | null,
  defaultGroupLabel = "Default",
): OptionGroup<T>[] {
  const filteredItems = items.filter(shouldInclude);
  return createGroups(filteredItems, getGroupLabel, defaultGroupLabel);
}

export { createGroups, filterAndGroup };
