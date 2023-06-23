import React, {
  useState,
  useCallback,
  createContext,
  useContext,
  MouseEvent,
} from "react";
import { useSelectedOptionsContext } from "./SelectedOptions/selectedOptionsContext";
import { useInputContext } from "./Input/inputContext";

export interface CustomOptionProps {
  value?: string;
  event?: MouseEvent<HTMLElement>;
}

type CustomOptionsContextType = {
  customOptions: string[];
  setCustomOptions: (options: string[]) => void;
  removeCustomOption: ({ value, event }: CustomOptionProps) => void;
  addCustomOption: ({ value, event }: CustomOptionProps) => void;
};

const CustomOptionsContext = createContext<CustomOptionsContextType>(
  {} as CustomOptionsContextType
);

export const CustomOptionsProvider = ({ children }) => {
  const [customOptions, setCustomOptions] = useState<string[]>([]);
  const { setSelectedOptions } = useSelectedOptionsContext();
  const { focusInput } = useInputContext();

  const removeCustomOption = useCallback(
    ({ value, event }: CustomOptionProps) => {
      const newValue =
        value || (event?.target as HTMLElement)?.textContent?.trim?.();
      if (newValue)
        setCustomOptions(customOptions.filter((o) => o !== newValue));
    },
    [customOptions, setCustomOptions]
  );

  const addCustomOption = useCallback(
    ({ value, event }: CustomOptionProps) => {
      const newValue =
        value || (event?.target as HTMLElement)?.textContent?.trim?.();
      if (newValue) {
        setCustomOptions((prevOptions) => [...prevOptions, newValue]);
        setSelectedOptions((selectedOptions) => [
          ...selectedOptions,
          newValue.trim(),
        ]);
        focusInput();
      }
    },
    [focusInput, setCustomOptions, setSelectedOptions]
  );

  const customOptionsState = {
    customOptions,
    setCustomOptions,
    removeCustomOption,
    addCustomOption,
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
