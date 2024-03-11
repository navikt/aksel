import { ComboboxOption } from "../types";

const normalizeText = (text: string): string =>
  typeof text === "string" ? text.toLocaleLowerCase().trim() : "";

const isPartOfText = (value: string, text: string) =>
  normalizeText(text).startsWith(normalizeText(value ?? ""));

const getMatchingValuesFromList = (value: string, list: ComboboxOption[]) =>
  list.filter((listItem) => isPartOfText(value, listItem.label));

const getFilteredOptionsId = (comboboxId: string) =>
  `${comboboxId}-filtered-options`;

const getOptionId = (comboboxId: string, option: string) =>
  `${comboboxId.toLocaleLowerCase()}-option-${option
    .replace(" ", "-")
    .toLocaleLowerCase()}`;

const getAddNewOptionId = (comboboxId: string) =>
  `${comboboxId}-combobox-new-option`;

const getIsLoadingId = (comboboxId: string) => `${comboboxId}-is-loading`;

const getNoHitsId = (comboboxId: string) => `${comboboxId}-no-hits`;

const getMaxSelectedOptionsId = (comboboxId: string) =>
  `${comboboxId}-max-selected-options`;

export default {
  normalizeText,
  isPartOfText,
  getMatchingValuesFromList,
  getFilteredOptionsId,
  getAddNewOptionId,
  getOptionId,
  getIsLoadingId,
  getNoHitsId,
  getMaxSelectedOptionsId,
};
