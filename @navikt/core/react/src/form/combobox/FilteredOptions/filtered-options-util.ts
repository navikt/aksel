const normalizeText = (text: string): string =>
  typeof text === "string" ? `${text}`.toLowerCase().trim() : "";

const isPartOfText = (value, text) =>
  normalizeText(text).startsWith(normalizeText(value ?? ""));

const isValueInList = (value, list) =>
  list?.find((listItem) => normalizeText(value) === normalizeText(listItem));

const getMatchingValuesFromList = (value, list) =>
  list?.filter((listItem) => isPartOfText(value, listItem));

const getFilteredOptionsId = (comboboxId: string) =>
  `${comboboxId}-filtered-options`;

const getOptionId = (comboboxId: string, option: string) =>
  `${comboboxId}-option-${option.replace(" ", "-")}`;

const getAddNewOptionId = (comboboxId: string) =>
  `${comboboxId}-combobox-new-option`;

const getIsLoadingId = (comboboxId: string) => `${comboboxId}-is-loading`;

const getNoHitsId = (comboboxId: string) => `${comboboxId}-no-hits`;

export default {
  normalizeText,
  isPartOfText,
  isValueInList,
  getMatchingValuesFromList,
  getFilteredOptionsId,
  getAddNewOptionId,
  getOptionId,
  getIsLoadingId,
  getNoHitsId,
};
