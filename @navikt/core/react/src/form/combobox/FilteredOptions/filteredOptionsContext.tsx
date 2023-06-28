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
import usePrevious from "../../../util/usePrevious";

const normalizeText = (text: string): string =>
  typeof text === "string" ? `${text}`.toLowerCase().trim() : "";

const isPartOfText = (value, text) =>
  normalizeText(text).startsWith(normalizeText(value ?? ""));

const isValueInList = (value, list) =>
  list?.find((listItem) => normalizeText(value) === normalizeText(listItem));

const getMatchingValuesFromList = (value, list) =>
  list?.filter((listItem) => isPartOfText(value, listItem));

type FilteredOptionsContextType = {
  activeDecendantId?: string;
  allowNewValues?: boolean;
  ariaDescribedBy?: string;
  filteredOptionsRef: React.RefObject<HTMLUListElement>;
  filteredOptionsIndex: number | null;
  setFilteredOptionsIndex: (index: number) => void;
  isListOpen: boolean;
  setInternalListOpen: (open: boolean) => void;
  isLoading?: boolean;
  filteredOptions: string[];
  isValueNew: boolean;
  toggleIsListOpen: (newState?: boolean) => void;
  currentOption: string | null;
  resetFilteredOptionsIndex: () => void;
  moveFocusUp: () => void;
  moveFocusDown: () => void;
  moveFocusToInput: () => void;
  moveFocusToEnd: () => void;
  shouldAutocomplete?: boolean;
};
const FilteredOptionsContext = createContext<FilteredOptionsContextType>(
  {} as FilteredOptionsContextType
);

export const FilteredOptionsProvider = ({ children, value: props }) => {
  const {
    allowNewValues,
    isListOpen: isExternalListOpen,
    isLoading,
    options,
  } = props;
  const filteredOptionsRef = useRef<HTMLUListElement | null>(null);
  const {
    inputProps: { id },
    value,
    searchTerm,
    setValue,
    setSearchTerm,
    shouldAutocomplete,
  } = useInputContext();
  const [ariaDescribedBy, setAriaDescribedBy] = useState<string>();

  const [filteredOptionsIndex, setFilteredOptionsIndex] = useState<
    number | null
  >(null);
  const [isInternalListOpen, setInternalListOpen] = useState(false);
  const { customOptions } = useCustomOptionsContext();

  const filteredOptions = useMemo(() => {
    const opts = [...customOptions, ...options];
    setFilteredOptionsIndex(null);
    return getMatchingValuesFromList(searchTerm, opts);
  }, [customOptions, options, searchTerm]);

  useEffect(() => {
    if (isExternalListOpen !== undefined)
      setInternalListOpen(isExternalListOpen);
  }, [isExternalListOpen]);

  const previousSearchTerm = usePrevious(searchTerm);

  useEffect(() => {
    if (
      shouldAutocomplete &&
      searchTerm !== "" &&
      (previousSearchTerm?.length || 0) < searchTerm.length &&
      filteredOptions.length > 0 &&
      !isValueInList(searchTerm, filteredOptions)
    ) {
      setValue(
        `${searchTerm}${filteredOptions[0].substring(searchTerm.length)}`
      );
      setSearchTerm(searchTerm);
    }
  }, [
    filteredOptions,
    previousSearchTerm,
    searchTerm,
    setSearchTerm,
    setValue,
    shouldAutocomplete,
  ]);

  const isListOpen = useMemo(() => {
    return isExternalListOpen ?? isInternalListOpen;
  }, [isExternalListOpen, isInternalListOpen]);

  const toggleIsListOpen = useCallback((newState?: boolean) => {
    setFilteredOptionsIndex(null);
    setInternalListOpen((oldState) => newState ?? !oldState);
  }, []);

  const isValueNew = useMemo(
    () => Boolean(value) && !isValueInList(value, filteredOptions),
    [value, filteredOptions]
  );

  const getMinimumIndex = useCallback(() => {
    return isValueNew && allowNewValues ? -1 : 0;
  }, [allowNewValues, isValueNew]);

  useEffect(() => {
    if (!isLoading && filteredOptions.length === 0) {
      setAriaDescribedBy(`${id}-no-hits`);
    } else if ((value && value !== "") || isLoading) {
      toggleIsListOpen(true);
      if (shouldAutocomplete && filteredOptions[0]) {
        //setFilteredOptionsIndex(getMinimumIndex());
        setAriaDescribedBy(
          `${id}-option-${filteredOptions[0].replace(" ", "-")}`
        );
      } else if (isLoading) {
        setAriaDescribedBy(`${id}-is-loading`);
      }
    } else {
      toggleIsListOpen(false);
      setAriaDescribedBy(undefined);
    }
  }, [
    getMinimumIndex,
    isLoading,
    value,
    shouldAutocomplete,
    toggleIsListOpen,
    filteredOptions,
    id,
  ]);

  const currentOption = useMemo(() => {
    if (filteredOptionsIndex == null) {
      return null;
    }
    if (filteredOptionsIndex === -1) {
      return value;
    }
    return filteredOptions[filteredOptionsIndex];
  }, [filteredOptionsIndex, filteredOptions, value]);

  const resetFilteredOptionsIndex = () => {
    setFilteredOptionsIndex(getMinimumIndex());
  };

  const scrollToOption = useCallback((newIndex: number) => {
    if (
      filteredOptionsRef.current &&
      filteredOptionsRef.current.children[newIndex]
    ) {
      const child = filteredOptionsRef.current.children[newIndex];
      const { top, bottom } = child.getBoundingClientRect();
      const parentRect = filteredOptionsRef.current.getBoundingClientRect();
      if (top < parentRect.top || bottom > parentRect.bottom) {
        child.scrollIntoView({ block: "nearest" });
      }
    }
  }, []);

  useEffect(() => {
    if (filteredOptionsIndex !== null && isListOpen) {
      scrollToOption(filteredOptionsIndex);
    }
  }, [filteredOptionsIndex, isListOpen, scrollToOption]);

  const moveFocusToInput = useCallback(() => {
    setFilteredOptionsIndex(null);
    toggleIsListOpen(false);
  }, [toggleIsListOpen]);

  const moveFocusToEnd = useCallback(() => {
    const lastIndex = filteredOptions.length - 1;
    toggleIsListOpen(true);
    setFilteredOptionsIndex(lastIndex);
  }, [filteredOptions.length, toggleIsListOpen]);

  const moveFocusUp = useCallback(() => {
    if (filteredOptionsIndex === null) {
      return;
    }
    if (filteredOptionsIndex === getMinimumIndex()) {
      toggleIsListOpen(false);
      setFilteredOptionsIndex(null);
    } else {
      const newIndex = Math.max(getMinimumIndex(), filteredOptionsIndex - 1);
      setFilteredOptionsIndex(newIndex);
    }
  }, [filteredOptionsIndex, getMinimumIndex, toggleIsListOpen]);

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
  }, [
    filteredOptions.length,
    filteredOptionsIndex,
    getMinimumIndex,
    isListOpen,
    toggleIsListOpen,
  ]);

  const activeDecendantId = useMemo(() => {
    if (filteredOptionsIndex === null) {
      return undefined;
    } else if (filteredOptionsIndex === -1) {
      return `${id}-combobox-new-option`;
    } else {
      return `${id}-option-${currentOption?.replace(" ", "-")}`;
    }
  }, [filteredOptionsIndex, currentOption, id]);

  const filteredOptionsState = {
    activeDecendantId,
    allowNewValues,
    filteredOptionsRef,
    filteredOptionsIndex,
    setFilteredOptionsIndex,
    shouldAutocomplete,
    isListOpen,
    setInternalListOpen,
    isLoading,
    filteredOptions,
    isValueNew,
    toggleIsListOpen,
    currentOption,
    resetFilteredOptionsIndex,
    moveFocusUp,
    moveFocusDown,
    moveFocusToInput,
    moveFocusToEnd,
    ariaDescribedBy,
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
