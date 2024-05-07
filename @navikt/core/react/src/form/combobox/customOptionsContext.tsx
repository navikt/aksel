import React, { useCallback, useState } from "react";
import { createContext } from "../../util/create-context";
import { useInputContext } from "./Input/Input.context";
import { ComboboxOption } from "./types";

type CustomOptionsContextValue = {
  customOptions: ComboboxOption[];
  removeCustomOption: (option: ComboboxOption) => void;
  addCustomOption: (option: ComboboxOption) => void;
  setCustomOptions: React.Dispatch<React.SetStateAction<ComboboxOption[]>>;
};

const [ComboboxCustomOptionsProvider, useComboboxCustomOptions] =
  createContext<CustomOptionsContextValue>({
    name: "ComboboxCustomOptions",
    errorMessage:
      "useComboboxCustomOptions must be used within a ComboboxCustomOptionsProvider",
  });

const CustomOptionsProvider = ({
  children,
  value,
}: {
  children: any;
  value: { isMultiSelect?: boolean };
}) => {
  const [customOptions, setCustomOptions] = useState<ComboboxOption[]>([]);
  const { focusInput } = useInputContext();
  const { isMultiSelect } = value;

  const removeCustomOption = useCallback(
    (option: ComboboxOption) => {
      setCustomOptions((prevCustomOptions) =>
        prevCustomOptions.filter((o) => o.label !== option.label),
      );
      focusInput();
    },
    [focusInput, setCustomOptions],
  );

  const addCustomOption = useCallback(
    (option: ComboboxOption) => {
      if (isMultiSelect) {
        setCustomOptions((prevOptions) => [...prevOptions, option]);
      } else {
        setCustomOptions([option]);
      }
      focusInput();
    },
    [focusInput, isMultiSelect, setCustomOptions],
  );

  const customOptionsState = {
    customOptions,
    removeCustomOption,
    addCustomOption,
    setCustomOptions,
  };

  return (
    <ComboboxCustomOptionsProvider {...customOptionsState}>
      {children}
    </ComboboxCustomOptionsProvider>
  );
};

export { CustomOptionsProvider, useComboboxCustomOptions };
