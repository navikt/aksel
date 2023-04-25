import React, {
  useState,
  useEffect,
  useMemo,
  createContext,
  useContext,
} from "react";
import { useCustomOptionsContext } from "../customOptionsContext";
import { useInputContext } from "../inputContext";

const normalizeText = (text: string) =>
  typeof text === "string" ? text.toLowerCase().trim() : "";

const isValueInList = (value, list) =>
  list?.filter((listItem) =>
    normalizeText(listItem).includes(normalizeText(value ?? ""))
  );

type FilteredOptionsContextType = {
  filteredOptionsIndex: number;
  setFilteredOptionsIndex: (index: number) => void;
  isListOpen: boolean;
  setInternalListOpen: (open: boolean) => void;
  filteredOptions: string[];
  setFilteredOptions: (options: string[]) => void;
  isValueNew: boolean;
  toggleIsListOpen: (newState?: boolean) => void;
  currentOption: string;
  resetFilteredOptionsIndex: () => void;
};
const FilteredOptionsContext = createContext<FilteredOptionsContextType>(
  {} as FilteredOptionsContextType
);

export const FilteredOptionsProvider = ({ children, value: props }) => {
  const { isExternalListOpen, options } = props;
  const { value } = useInputContext();
  const [filteredOptionsIndex, setFilteredOptionsIndex] = useState(0);
  const [isInternalListOpen, setInternalListOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const { customOptions } = useCustomOptionsContext();

  const filteredOptionsMemo = useMemo(() => {
    const opts = [...customOptions, ...options];
    setFilteredOptionsIndex(0); // TODO: Krasjer dette med noe annet? Kanskje index når vi legger til custom options må sees på?
    return isValueInList(value, opts);
  }, [value, options, customOptions]);

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

  const isValueNew = useMemo(() => {
    const isNew = Boolean(value) && isValueInList(value, filteredOptions);
    if (isNew) {
      setFilteredOptionsIndex(-1); // No item in list should have focus
    }
    return isNew;
  }, [value, filteredOptions]);

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
    filteredOptions: filteredOptionsMemo,
    setFilteredOptions,
    isValueNew,
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
