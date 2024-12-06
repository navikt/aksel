import React, { useCallback, useEffect, useMemo, useState } from "react";
import { createContext } from "../../../util/create-context";
import { usePrevious } from "../../../util/hooks";
import { useInputContext } from "../Input/Input.context";
import { isInList } from "../combobox-utils";
import { useComboboxCustomOptions } from "../customOptionsContext";
import { ComboboxOption, ComboboxProps } from "../types";

type SelectedOptionsContextValue = {
  addSelectedOption: (option: ComboboxOption) => void;
  isMultiSelect?: boolean;
  removeSelectedOption: (option: ComboboxOption) => void;
  prevSelectedOptions?: ComboboxOption[];
  selectedOptions: ComboboxOption[];
  maxSelected?: ComboboxProps["maxSelected"] & { isLimitReached: boolean };
  setSelectedOptions: (any) => void;
  toggleOption: (
    option: ComboboxOption,
    event: React.KeyboardEvent | React.PointerEvent,
  ) => void;
};

const [SelectedOptionsContextProvider, useSelectedOptionsContext] =
  createContext<SelectedOptionsContextValue>();

const SelectedOptionsProvider = ({
  children,
  value,
}: {
  children: any;
  value: Pick<
    ComboboxProps,
    "allowNewValues" | "isMultiSelect" | "onToggleSelected" | "maxSelected"
  > & { options: ComboboxOption[]; selectedOptions?: ComboboxOption[] };
}) => {
  const { clearInput, focusInput, setHideCaret } = useInputContext();
  const {
    customOptions,
    removeCustomOption,
    addCustomOption,
    setCustomOptions,
  } = useComboboxCustomOptions();
  const {
    allowNewValues,
    isMultiSelect,
    selectedOptions: externalSelectedOptions,
    onToggleSelected,
    options,
    maxSelected,
  } = value;
  const [internalSelectedOptions, setSelectedOptions] = useState<
    ComboboxOption[]
  >([]);
  const selectedOptions = useMemo(
    () =>
      externalSelectedOptions ?? [...customOptions, ...internalSelectedOptions],
    [customOptions, externalSelectedOptions, internalSelectedOptions],
  );

  const addSelectedOption = useCallback(
    (option: ComboboxOption) => {
      const isCustomOption = !isInList(option, options);
      if (isCustomOption) {
        allowNewValues && addCustomOption(option);
        !isMultiSelect && setSelectedOptions([]);
      } else if (isMultiSelect) {
        setSelectedOptions((oldSelectedOptions) => [
          ...oldSelectedOptions,
          option,
        ]);
      } else {
        setSelectedOptions([option]);
        setCustomOptions([]);
      }
      onToggleSelected?.(option.value, true, isCustomOption);
    },
    [
      addCustomOption,
      allowNewValues,
      isMultiSelect,
      onToggleSelected,
      options,
      setCustomOptions,
    ],
  );

  const removeSelectedOption = useCallback(
    (option: ComboboxOption) => {
      const isCustomOption = isInList(option, customOptions);
      if (isCustomOption) {
        removeCustomOption(option);
      } else {
        setSelectedOptions((oldSelectedOptions) =>
          oldSelectedOptions.filter(
            (selectedOption) => selectedOption !== option,
          ),
        );
      }
      onToggleSelected?.(option.value, false, isCustomOption);
    },
    [customOptions, onToggleSelected, removeCustomOption],
  );

  const isLimitReached =
    (!!maxSelected?.limit && selectedOptions.length >= maxSelected.limit) ||
    (!isMultiSelect && selectedOptions.length > 0);

  // biome-ignore lint/correctness/useExhaustiveDependencies: We explicitly want to run this effect when selectedOptions changes to match the view with the selected options.
  useEffect(() => {
    setHideCaret(isLimitReached);
  }, [isLimitReached, selectedOptions, setHideCaret]);

  const toggleOption = useCallback(
    (
      option: ComboboxOption,
      event: React.KeyboardEvent | React.PointerEvent,
    ) => {
      if (isInList(option.value, selectedOptions)) {
        removeSelectedOption(option);
      } else if (isMultiSelect && isLimitReached) {
        return;
      } else {
        addSelectedOption(option);
      }
      clearInput(event);
      focusInput();
    },
    [
      addSelectedOption,
      clearInput,
      focusInput,
      removeSelectedOption,
      selectedOptions,
      isLimitReached,
      isMultiSelect,
    ],
  );

  const prevSelectedOptions = usePrevious<ComboboxOption[]>(selectedOptions);

  const selectedOptionsState = {
    addSelectedOption,
    isMultiSelect,
    removeSelectedOption,
    prevSelectedOptions,
    selectedOptions,
    setSelectedOptions,
    toggleOption,
    maxSelected: maxSelected && {
      ...maxSelected,
      isLimitReached,
    },
  };

  return (
    <SelectedOptionsContextProvider {...selectedOptionsState}>
      {children}
    </SelectedOptionsContextProvider>
  );
};

export { SelectedOptionsProvider, useSelectedOptionsContext };
