import React, { createContext, useContext } from "react";
import usePrevious from "../../../util/usePrevious";

type SelectedOptionsContextType = {
  selectedOptions: string[];
  addSelectedOption: (option: string) => void;
  removeSelectedOption: (option: string) => void;
  setSelectedOptions: (any) => void;
  prevSelectedOptions: string[];
};

const SelectedOptionsContext = createContext<SelectedOptionsContextType>(
  {} as SelectedOptionsContextType
);

export const SelectedOptionsProvider = ({ children, value }) => {
  const { selectedOptions, setSelectedOptions } = value;
  const prevSelectedOptions = usePrevious(selectedOptions);

  const addSelectedOption = (option: string) => {
    setSelectedOptions((prevSelectedOptions) => [
      ...prevSelectedOptions,
      option,
    ]);
  };

  const removeSelectedOption = (option: string) => {
    setSelectedOptions((prevSelectedOptions) =>
      prevSelectedOptions.filter((selectedOption) => selectedOption !== option)
    );
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
