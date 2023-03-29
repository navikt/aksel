import React, {
  useState,
  useEffect,
  useMemo,
  createContext,
  useContext,
} from "react";
type FilteredOptionsContextType = {
  filteredOptionsIndex: number;
  setFilteredOptionsIndex: (index: number) => void;
  isListOpen: boolean;
  setInternalListOpen: (open: boolean) => void;
  filteredOptions: string[];
  setFilteredOptions: (options: string[]) => void;
  toggleIsListOpen: (newState?: boolean) => void;
  currentOption: string;
  resetFilteredOptionsIndex: () => void;
};
const FilteredOptionsContext = createContext<FilteredOptionsContextType>(
  {} as FilteredOptionsContextType
);

export const FilteredOptionsProvider = ({ children, value }) => {
  const { isExternalListOpen } = value;
  const [filteredOptionsIndex, setFilteredOptionsIndex] = useState(0);
  const [isInternalListOpen, setInternalListOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);

  useEffect(() => {
    if (isExternalListOpen !== undefined)
      setInternalListOpen(isExternalListOpen);
  }, [isExternalListOpen]);

  const isListOpen = useMemo(() => {
    return isExternalListOpen ?? isInternalListOpen;
  }, [isExternalListOpen, isInternalListOpen]);

  const currentOption = useMemo(() => {
    return filteredOptions[filteredOptionsIndex];
  }, [filteredOptions, filteredOptionsIndex]);

  const toggleIsListOpen = (newState?: boolean) => {
    setInternalListOpen((oldState) => newState ?? !oldState);
  };

  const resetFilteredOptionsIndex = () => {
    setFilteredOptionsIndex(0);
  };

  const filteredOptionsState = {
    filteredOptionsIndex,
    setFilteredOptionsIndex,
    isListOpen,
    setInternalListOpen,
    filteredOptions,
    setFilteredOptions,
    toggleIsListOpen,
    currentOption,
    resetFilteredOptionsIndex,
  };

  return (
    <FilteredOptionsContext.Provider value={filteredOptionsState}>
      {children}
    </FilteredOptionsContext.Provider>
  );
};

export const useFilteredOptionsContext = () => {
  const context = useContext(FilteredOptionsContext);
  if (!context) {
    throw new Error(
      "useFilteredOptionsContext must be used within a FilteredOptionsProvider"
    );
  }
  return context;
};
