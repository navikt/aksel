import type { OptionGroup } from "../AutoSuggest.types";

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
 *
 * Returns:
 * [
 *   { label: "Metadata", options: [{ name: "Status", group: "Metadata" }] },
 *   { label: "Location", options: [{ name: "Region", group: "Location" }] },
 *   { label: "Properties", options: [{ name: "Type", group: "" }] }
 * ]
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

export { createGroups };
