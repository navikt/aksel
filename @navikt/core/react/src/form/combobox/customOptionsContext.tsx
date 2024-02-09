import React, { useCallback, useState } from "react";
import { createContext } from "../../util/create-context";
import { ComboboxOption } from "./Combobox.types";
import { useInputContext } from "./parts/input/Input.context";

type CustomOptionsContextType = {
  customOptions: ComboboxOption[];
  removeCustomOption: (option: ComboboxOption) => void;
  addCustomOption: (option: ComboboxOption) => void;
  setCustomOptions: React.Dispatch<React.SetStateAction<ComboboxOption[]>>;
};

const [CustomOptionsContextProvider, useCustomOptionsContext] =
  createContext<CustomOptionsContextType>({
    name: "CustomOptionsContext",
    hookName: "useCustomOptionsContext",
    providerName: "CustomOptionsProvider",
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

  return (
    <CustomOptionsContextProvider
      customOptions={customOptions}
      removeCustomOption={removeCustomOption}
      addCustomOption={addCustomOption}
      setCustomOptions={setCustomOptions}
    >
      {children}
    </CustomOptionsContextProvider>
  );
};

export { CustomOptionsProvider, useCustomOptionsContext };
