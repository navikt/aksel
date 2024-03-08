import { ComboboxOption } from "./types";

/**
 *
 * @param option ComboboxOption will be compared by both label and value, while a string option is checked if it matches either the label or value in the list.
 * @param list
 */
const isInList = (option: ComboboxOption | string, list: ComboboxOption[]) => {
  if (typeof option === "string") {
    return list.some(
      (listItem) =>
        listItem.label.toLocaleLowerCase() === option.toLocaleLowerCase() ||
        listItem.value.toLocaleLowerCase() === option.toLocaleLowerCase(),
    );
  } else {
    return list.some(
      (listItem) =>
        listItem.label.toLocaleLowerCase() ===
          option.label.toLocaleLowerCase() &&
        listItem.value.toLocaleLowerCase() === option.value.toLocaleLowerCase(),
    );
  }
};

const mapToComboboxOptionArray = (options?: string[] | ComboboxOption[]) => {
  return options?.map((option: string | ComboboxOption) =>
    typeof option === "string" ? { label: option, value: option } : option,
  );
};

const toComboboxOption = (value: string): ComboboxOption => ({
  label: value,
  value,
});

export { isInList, mapToComboboxOptionArray, toComboboxOption };
