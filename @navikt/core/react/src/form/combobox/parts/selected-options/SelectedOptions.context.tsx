import React, { useCallback, useMemo, useState } from "react";
import { createContext } from "../../../../util/create-context";
import { usePrevious } from "../../../../util/hooks";
import {
  ComboboxBaseProps,
  ComboboxOption,
  MaxSelected,
} from "../../Combobox.types";
import { useCustomOptionsContext } from "../../customOptionsContext";
import { isInList } from "../../util/combobox-utils";
import { useInputContext } from "../input/Input.context";

type SelectedOptionsContextType = {
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
  createContext<SelectedOptionsContextType>({
    name: "InputContext",
    hookName: "useSelectedOptionsContext",
    providerName: "SelectedOptionsContextProvider",
  });

const SelectedOptionsProvider = ({
  children,
  value,
}: {
  children: any;
  value: Pick<
    ComboboxBaseProps,
    "allowNewValues" | "isMultiSelect" | "onToggleSelected" | "maxSelected"
  > & { options: ComboboxOption[]; selectedOptions?: ComboboxOption[] };
}) => {
  const { clearInput, focusInput } = useInputContext();
  const {
    customOptions,
    removeCustomOption,
    addCustomOption,
    setCustomOptions,
  } = useCustomOptionsContext();
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
      if (isInList(option, selectedOptions)) {
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

export { useSelectedOptionsContext, SelectedOptionsProvider };
