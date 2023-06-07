import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import usePrevious from "../../../util/usePrevious";
import { useInputContext } from "../Input/inputContext";
import { ComboboxProps } from "../types";

type SelectedOptionsContextType = {
  selectedOptions: string[];
  addSelectedOption: (option: string) => void;
  removeSelectedOption: (option: string) => void;
  setSelectedOptions: (any) => void;
  prevSelectedOptions?: string[];
  singleSelect?: boolean;
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
    "selectedOptions" | "singleSelect" | "onToggleSelected"
  >;
}) => {
  const { setSearchTerm, setValue } = useInputContext();
  const {
    selectedOptions: externalSelectedOptions,
    singleSelect,
    onToggleSelected,
  } = value;
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  useEffect(
    () => setSelectedOptions(externalSelectedOptions || []),
    [externalSelectedOptions]
  );

  const addSelectedOption = useCallback(
    (option: string) => {
      if (singleSelect) {
        setSelectedOptions([option]);
        setValue(option);
        setSearchTerm(option);
      } else {
        setSelectedOptions((prevSelectedOptions) => [
          ...prevSelectedOptions,
          option,
        ]);
      }
      onToggleSelected?.(option, true);
    },
    [onToggleSelected, setSearchTerm, setValue, singleSelect]
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
    selectedOptions,
    addSelectedOption,
    removeSelectedOption,
    setSelectedOptions,
    prevSelectedOptions,
    singleSelect,
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
