import { ComboboxOption } from "./types";

/**
 *
 * @param option ComboboxOption will be compared by both label and value, while a string option is checked if it matches either the label or value in the list.
 * @param list
 */
const isInList = (option: ComboboxOption | string, list: ComboboxOption[]) => {
  if (typeof option === "string") {
    return list.some(
      (listItem) => listItem.label === option || listItem.value === option,
    );
  }

  return list.some(
    (listItem) =>
      listItem.label === option.label && listItem.value === option.value,
  );
};

const toComboboxOption = (value: string): ComboboxOption => ({
  label: value,
  value,
});

const mapToComboboxOptionArray = (options?: string[] | ComboboxOption[]) => {
  return options?.map((option: string | ComboboxOption) =>
    typeof option === "string" ? toComboboxOption(option) : option,
  );
};

export { isInList, mapToComboboxOptionArray, toComboboxOption };
