import React, { createContext, useCallback, useContext, useState } from "react";
import usePrevious from "../../../util/usePrevious";
import { useInputContext } from "../Input/inputContext";
import { ComboboxProps } from "../types";

type SelectedOptionsContextType = {
  addSelectedOption: (option: string) => void;
  isMultiSelect?: boolean;
  removeSelectedOption: (option: string) => void;
  prevSelectedOptions?: string[];
  selectedOptions: string[];
  setSelectedOptions: (any) => void;
};

const SelectedOptionsContext = createContext<SelectedOptionsContextType>(
  {} as SelectedOptionsContextType
);

export const SelectedOptionsProvider = ({
  children,
  value,
}: {
  children: any;
  value: Pick<
    ComboboxProps,
    "isMultiSelect" | "selectedOptions" | "onToggleSelected"
  >;
}) => {
  const { setSearchTerm, setValue } = useInputContext();
  const {
    isMultiSelect,
    selectedOptions: externalSelectedOptions,
    onToggleSelected,
  } = value;
  const [internalSelectedOptions, setSelectedOptions] = useState<string[]>([]);
  const selectedOptions = externalSelectedOptions ?? internalSelectedOptions;

  const addSelectedOption = useCallback(
    (option: string) => {
      if (isMultiSelect) {
        setSelectedOptions((prevSelectedOptions) => [
          ...prevSelectedOptions,
          option,
        ]);
      } else {
        setSelectedOptions([option]);
        setValue(option);
        setSearchTerm(option);
      }
      onToggleSelected?.(option, true);
    },
    [isMultiSelect, onToggleSelected, setSearchTerm, setValue]
  );

  const removeSelectedOption = useCallback(
    (option: string) => {
      setSelectedOptions((prevSelectedOptions) =>
        prevSelectedOptions.filter(
          (selectedOption) => selectedOption !== option
        )
      );
      onToggleSelected?.(option, false);
    },
    [onToggleSelected]
  );

  const prevSelectedOptions = usePrevious<string[]>(selectedOptions);

  const selectedOptionsState = {
    addSelectedOption,
    isMultiSelect,
    removeSelectedOption,
    prevSelectedOptions,
    selectedOptions,
    setSelectedOptions,
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
