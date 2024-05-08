import React, { useCallback, useMemo, useState } from "react";
import { createContext } from "../../../util/create-context";
import { usePrevious } from "../../../util/hooks";
import { useInputContext } from "../Input/Input.context";
import { isInList } from "../combobox-utils";
import { useComboboxCustomOptions } from "../customOptionsContext";
import { ComboboxOption, ComboboxProps, MaxSelected } from "../types";

type SelectedOptionsContextValue = {
  addSelectedOption: (option: ComboboxOption) => void;
  isMultiSelect?: boolean;
  removeSelectedOption: (option: ComboboxOption) => void;
  prevSelectedOptions?: ComboboxOption[];
  selectedOptions: ComboboxOption[];
  maxSelected?: MaxSelected & { isLimitReached: boolean };
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
  const { clearInput, focusInput } = useInputContext();
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

  const toggleOption = useCallback(
    (
      option: ComboboxOption,
      event: React.KeyboardEvent | React.PointerEvent,
    ) => {
      if (isInList(option.value, selectedOptions)) {
        removeSelectedOption(option);
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
    ],
  );

  const prevSelectedOptions = usePrevious<ComboboxOption[]>(selectedOptions);

  const isLimitReached =
    !!maxSelected?.limit && selectedOptions.length >= maxSelected.limit;

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
