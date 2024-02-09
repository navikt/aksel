import React, { createContext, useCallback, useContext, useState } from "react";
import { ComboboxOption } from "./Combobox.types";
import { useInputContext } from "./parts/input/Input.context";

type CustomOptionsContextType = {
  customOptions: ComboboxOption[];
  removeCustomOption: (option: ComboboxOption) => void;
  addCustomOption: (option: ComboboxOption) => void;
  setCustomOptions: React.Dispatch<React.SetStateAction<ComboboxOption[]>>;
};

const CustomOptionsContext = createContext<CustomOptionsContextType>(
  {} as CustomOptionsContextType,
);

export const CustomOptionsProvider = ({
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
    <CustomOptionsContext.Provider value={customOptionsState}>
      {children}
    </CustomOptionsContext.Provider>
  );
};

export const useCustomOptionsContext = () => {
  const context = useContext(CustomOptionsContext);
  if (!context) {
    throw new Error(
      "useCustomOptionsContext must be used within a CustomOptionsProvider",
    );
  }
  return context;
};
