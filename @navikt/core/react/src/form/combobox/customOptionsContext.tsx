import React, { useState, useCallback, createContext, useContext } from "react";
import { useInputContext } from "./Input/inputContext";
import { useSelectedOptionsContext } from "./SelectedOptions/selectedOptionsContext";

type CustomOptionsContextType = {
  customOptions: string[];
  removeCustomOption: (option: string) => void;
  addCustomOption: (option: string) => void;
  setCustomOptions: React.Dispatch<React.SetStateAction<string[]>>;
};

const CustomOptionsContext = createContext<CustomOptionsContextType>(
  {} as CustomOptionsContextType
);

export const CustomOptionsProvider = ({ children }) => {
  const [customOptions, setCustomOptions] = useState<string[]>([]);
  const { focusInput } = useInputContext();
  const { isMultiSelect } = useSelectedOptionsContext();

  const removeCustomOption = useCallback(
    (option) => {
      setCustomOptions((prevCustomOptions) =>
        prevCustomOptions.filter((o) => o !== option)
      );
      focusInput();
    },
    [focusInput, setCustomOptions]
  );

  const addCustomOption = useCallback(
    (option) => {
      if (isMultiSelect) {
        setCustomOptions((prevOptions) => [...prevOptions, option]);
      } else {
        setCustomOptions([option]);
      }
      focusInput();
    },
    [focusInput, isMultiSelect, setCustomOptions]
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
      "useCustomOptionsContext must be used within a CustomOptionsProvider"
    );
  }
  return context;
};
