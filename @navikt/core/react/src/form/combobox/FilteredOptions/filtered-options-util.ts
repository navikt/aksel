import { ComboboxOption } from "../types";

const normalizeText = (text: string): string =>
  typeof text === "string" ? text.toLocaleLowerCase().trim() : "";

const isPartOfText = (value: string, text: string) =>
  normalizeText(text).includes(normalizeText(value ?? ""));

const getMatchingValuesFromList = (value: string, list: ComboboxOption[]) =>
  list.filter((listItem) => isPartOfText(value, listItem.label));

const getFirstValueStartingWith = (text: string, list: ComboboxOption[]) => {
  return list.find((listItem) =>
    normalizeText(listItem.label).startsWith(text.toLocaleLowerCase()),
  );
};

const getFilteredOptionsId = (comboboxId: string) =>
  `${comboboxId}-filtered-options`;

const getOptionId = (comboboxId: string, option: string) =>
  `${comboboxId}-option-${option}`.replace(/\s/g, "-").toLocaleLowerCase();

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
  getFirstValueStartingWith,
};
