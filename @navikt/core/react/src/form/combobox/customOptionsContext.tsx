import React, { createContext, useCallback, useContext, useState } from "react";
import { useInputContext } from "./Input/inputContext";

type CustomOptionsContextType = {
  customOptions: string[];
  removeCustomOption: (option: string) => void;
  addCustomOption: (option: string) => void;
  setCustomOptions: React.Dispatch<React.SetStateAction<string[]>>;
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
  const [customOptions, setCustomOptions] = useState<string[]>([]);
  const { focusInput } = useInputContext();
  const { isMultiSelect } = value;

  const removeCustomOption = useCallback(
    (option: string) => {
      setCustomOptions((prevCustomOptions) =>
        prevCustomOptions.filter((o) => o !== option),
      );
      focusInput();
    },
    [focusInput, setCustomOptions],
  );

  const addCustomOption = useCallback(
    (option: string) => {
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
