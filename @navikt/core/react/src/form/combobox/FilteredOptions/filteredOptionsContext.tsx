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
import { useInputContext } from "../inputContext";

const normalizeText = (text: string) =>
  typeof text === "string" ? text.toLowerCase().trim() : "";

const isValueInList = (value, list) =>
  list?.filter((listItem) =>
    normalizeText(listItem).includes(normalizeText(value ?? ""))
  );

type FilteredOptionsContextType = {
  filteredOptionsRef: React.RefObject<HTMLUListElement>;
  filteredOptionsIndex: number | null;
  setFilteredOptionsIndex: (index: number) => void;
  isListOpen: boolean;
  setInternalListOpen: (open: boolean) => void;
  filteredOptions: string[];
  setFilteredOptions: (options: string[]) => void;
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
  const { isExternalListOpen, options } = props;
  const filteredOptionsRef = useRef<HTMLUListElement | null>(null);
  const { value } = useInputContext();
  const [filteredOptionsIndex, setFilteredOptionsIndex] = useState<
    number | null
  >(null);
  const [isInternalListOpen, setInternalListOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const { customOptions } = useCustomOptionsContext();

  const filteredOptionsMemo = useMemo(() => {
    const opts = [...customOptions, ...options];
    setFilteredOptionsIndex(null);
    return isValueInList(value, opts);
  }, [value, options, customOptions]);

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
    if (!filteredOptionsIndex) {
      return null;
    }
    return filteredOptions[filteredOptionsIndex];
  }, [filteredOptions, filteredOptionsIndex]);

  const isValueNew = useMemo(() => {
    const isNew = Boolean(value) && isValueInList(value, filteredOptions);
    if (isNew) {
      setFilteredOptionsIndex(-1); // -1 indicates the "add new"-option should have focus
    }
    return isNew;
  }, [value, filteredOptions]);

  const getMinimumIndex = useCallback(
    () => (isValueNew ? -1 : 0),
    [isValueNew]
  );

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

  const moveFocusDown = useCallback(() => {
    if (filteredOptionsIndex === null || !isListOpen) {
      toggleIsListOpen(true);
      setFilteredOptionsIndex(getMinimumIndex());
      return;
    }
    const newIndex = Math.min(
      filteredOptionsIndex + 1,
      filteredOptionsMemo.length - 1
    );
    setFilteredOptionsIndex(newIndex);
    scrollToOption(newIndex);
  }, [
    filteredOptionsMemo,
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
    filteredOptions: filteredOptionsMemo,
    setFilteredOptions,
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
