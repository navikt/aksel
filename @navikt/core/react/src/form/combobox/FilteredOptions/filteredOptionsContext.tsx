import React, {
  useState,
  useEffect,
  useMemo,
  createContext,
  useContext,
  useCallback,
  useRef,
} from "react";
import { useCustomOptionsContext } from "../customOptionsContext";
import { useInputContext } from "../Input/inputContext";

const normalizeText = (text: string) =>
  typeof text === "string" ? text.toLowerCase().trim() : "";

const isPartOfText = (value, text) =>
  normalizeText(text).includes(normalizeText(value ?? ""));

const isValueInList = (value, list) =>
  list?.find((listItem) => value === listItem);

const getMatchingValuesFromList = (value, list) =>
  list?.filter((listItem) => isPartOfText(value, listItem));

type FilteredOptionsContextType = {
  filteredOptionsRef: React.RefObject<HTMLUListElement>;
  filteredOptionsIndex: number | null;
  setFilteredOptionsIndex: (index: number) => void;
  isListOpen: boolean;
  setInternalListOpen: (open: boolean) => void;
  filteredOptions: string[];
  isValueNew: boolean;
  toggleIsListOpen: (newState?: boolean) => void;
  currentOption: string | null;
  resetFilteredOptionsIndex: () => void;
  moveFocusUp: () => void;
  moveFocusDown: () => void;
};
const FilteredOptionsContext = createContext<FilteredOptionsContextType>(
  {} as FilteredOptionsContextType
);

export const FilteredOptionsProvider = ({ children, value: props }) => {
  const { isListOpen: isExternalListOpen, options, singleSelect } = props;
  const filteredOptionsRef = useRef<HTMLUListElement | null>(null);
  const { value, setSearchTerm, onChange, searchTerm } = useInputContext();

  const [filteredOptionsIndex, setFilteredOptionsIndex] = useState<
    number | null
  >(null);
  const [isInternalListOpen, setInternalListOpen] = useState(false);
  const { customOptions } = useCustomOptionsContext();

  const filteredOptions = useMemo(() => {
    const opts = [...customOptions, ...options];
    setFilteredOptionsIndex(null);
    return getMatchingValuesFromList(singleSelect ? searchTerm : value, opts);
  }, [customOptions, options, singleSelect, searchTerm, value]);

  useEffect(() => {
    if (isExternalListOpen !== undefined)
      setInternalListOpen(isExternalListOpen);
  }, [isExternalListOpen]);

  const isListOpen = useMemo(() => {
    return isExternalListOpen ?? isInternalListOpen;
  }, [isExternalListOpen, isInternalListOpen]);

  const toggleIsListOpen = useCallback((newState?: boolean) => {
    setFilteredOptionsIndex(null);
    setInternalListOpen((oldState) => newState ?? !oldState);
  }, []);

  useEffect(() => {
    if (value) {
      toggleIsListOpen(true);
    } else {
      toggleIsListOpen(false);
    }
  }, [value, toggleIsListOpen]);

  const currentOption = useMemo(() => {
    if (filteredOptionsIndex == null) {
      return null;
    }
    if (filteredOptionsIndex === -1) {
      return value;
    }
    if (singleSelect) {
      onChange(filteredOptions[filteredOptionsIndex]);
      setSearchTerm(searchTerm);
    }
    return filteredOptions[filteredOptionsIndex];
  }, [
    filteredOptionsIndex,
    singleSelect,
    filteredOptions,
    value,
    onChange,
    setSearchTerm,
    searchTerm,
  ]);

  const isValueNew = useMemo(
    () => Boolean(value) && !isValueInList(value, filteredOptions),
    [value, filteredOptions]
  );

  const getMinimumIndex = useCallback(() => {
    return isValueNew && !singleSelect ? -1 : 0;
  }, [isValueNew, singleSelect]);

  const resetFilteredOptionsIndex = () => {
    setFilteredOptionsIndex(getMinimumIndex());
  };

  const scrollToOption = useCallback((newIndex: number) => {
    if (filteredOptionsRef.current) {
      const child = filteredOptionsRef.current.children[newIndex + 1];
      const { top, bottom } = child.getBoundingClientRect();
      const parentRect = filteredOptionsRef.current.getBoundingClientRect();
      if (top < parentRect.top || bottom > parentRect.bottom)
        child.scrollIntoView({ block: "nearest" });
    }
  }, []);

  const moveFocusUp = useCallback(() => {
    if (filteredOptionsIndex === null) {
      return;
    }
    if (filteredOptionsIndex === getMinimumIndex()) {
      toggleIsListOpen(false);
      setFilteredOptionsIndex(null);
    }
    const newIndex = Math.max(getMinimumIndex(), filteredOptionsIndex - 1);
    setFilteredOptionsIndex(newIndex);
    scrollToOption(newIndex);
  }, [filteredOptionsIndex, getMinimumIndex, scrollToOption, toggleIsListOpen]);

  // useEffect(() => {
  //   console.log("searchTerm, value", searchTerm, value);
  //   console.log("filteredOptionsIndex", filteredOptionsIndex);
  // }, [filteredOptionsIndex, searchTerm, value]);

  const moveFocusDown = useCallback(() => {
    if (filteredOptionsIndex === null || !isListOpen) {
      toggleIsListOpen(true);
      setFilteredOptionsIndex(getMinimumIndex());
      return;
    }
    const newIndex = Math.min(
      filteredOptionsIndex + 1,
      filteredOptions.length - 1
    );
    setFilteredOptionsIndex(newIndex);
    scrollToOption(newIndex);
  }, [
    filteredOptions.length,
    filteredOptionsIndex,
    getMinimumIndex,
    isListOpen,
    scrollToOption,
    toggleIsListOpen,
  ]);

  const filteredOptionsState = {
    filteredOptionsRef,
    filteredOptionsIndex,
    setFilteredOptionsIndex,
    isListOpen,
    setInternalListOpen,
    filteredOptions,
    isValueNew,
    toggleIsListOpen,
    currentOption,
    resetFilteredOptionsIndex,
    moveFocusUp,
    moveFocusDown,
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
