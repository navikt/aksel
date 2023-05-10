import React, { createContext, useContext, useEffect, useState } from "react";
import usePrevious from "../../../util/usePrevious";

type SelectedOptionsContextType = {
  selectedOptions: string[];
  addSelectedOption: (option: string) => void;
  removeSelectedOption: (option: string) => void;
  setSelectedOptions: (any) => void;
  prevSelectedOptions?: string[];
};

const SelectedOptionsContext = createContext<SelectedOptionsContextType>(
  {} as SelectedOptionsContextType
);

export const SelectedOptionsProvider = ({
  children,
  value,
}: {
  children: any;
  value: {
    selectedOptions: string[];
    onToggleSelected: (option: string, isSelected: boolean) => void;
  };
}) => {
  const { selectedOptions: externalSelectedOptions, onToggleSelected } = value;
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  useEffect(
    () => setSelectedOptions(externalSelectedOptions || []),
    [externalSelectedOptions]
  );

  const prevSelectedOptions = usePrevious<string[]>(selectedOptions);

  const addSelectedOption = (option: string) => {
    setSelectedOptions((prevSelectedOptions) => [
      ...prevSelectedOptions,
      option,
    ]);
    onToggleSelected?.(option, true);
  };

  const removeSelectedOption = (option: string) => {
    setSelectedOptions((prevSelectedOptions) =>
      prevSelectedOptions.filter((selectedOption) => selectedOption !== option)
    );
    onToggleSelected?.(option, false);
  };

  const selectedOptionsState = {
    selectedOptions,
    addSelectedOption,
    removeSelectedOption,
    setSelectedOptions,
    prevSelectedOptions,
  };

  return (
    <SelectedOptionsContext.Provider value={selectedOptionsState}>
      {children}
    </SelectedOptionsContext.Provider>
  );
};

export const useSelectedOptionsContext = () => {
  const context = useContext(SelectedOptionsContext);
  if (!context) {
    throw new Error(
      "useSelectedOptionsContext must be used within a SelectedOptionsProvider"
    );
  }
  return context;
};
