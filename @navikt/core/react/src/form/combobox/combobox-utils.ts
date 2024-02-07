import { ComboboxOption } from "./types";

const isInList = (option: ComboboxOption | string, list: ComboboxOption[]) =>
  list
    .map((item) => item.label.toLocaleLowerCase())
    .includes(
      typeof option === "string"
        ? option.toLocaleLowerCase()
        : option.label.toLocaleLowerCase(),
    );

const mapFromStringArrayToComboboxOptionArray = (
  options?: string[] | ComboboxOption[],
) => {
  return options?.map((option: string | ComboboxOption) =>
    typeof option === "string" ? { label: option, value: option } : option,
  );
};

const toComboboxOption = (value: string): ComboboxOption => ({
  label: value,
  value,
});

export { isInList, mapFromStringArrayToComboboxOptionArray, toComboboxOption };
