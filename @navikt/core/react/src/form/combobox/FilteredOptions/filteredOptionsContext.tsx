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
    const newIndex = Math.max(0, filteredOptionsIndex - 1);
    setFilteredOptionsIndex(newIndex);
    scrollToOption(newIndex);
  }, [filteredOptionsIndex, scrollToOption])

  const moveFocusDown = useCallback(() => {
    const newIndex = Math.min(
      filteredOptionsIndex + 1,
      filteredOptionsMemo.length - 1
    );
    setFilteredOptionsIndex(newIndex);
    scrollToOption(newIndex);
  }, [filteredOptionsMemo, filteredOptionsIndex, scrollToOption])

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
