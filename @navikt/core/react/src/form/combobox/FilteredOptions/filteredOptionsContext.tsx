import React, {
  useState,
  useMemo,
  createContext,
  useContext,
  useCallback,
  useRef,
  SetStateAction,
} from "react";
import cl from "clsx";
import { useCustomOptionsContext } from "../customOptionsContext";
import { useInputContext } from "../Input/inputContext";
import usePrevious from "../../../util/usePrevious";
import { useClientLayoutEffect } from "../../../util";
import useVirtualFocus from "./useVirtualFocus";

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
  isListOpen: boolean;
  isLoading?: boolean;
  filteredOptions: string[];
  isMouseLastUsedInputDevice: boolean;
  setIsMouseLastUsedInputDevice: React.Dispatch<SetStateAction<boolean>>;
  isValueNew: boolean;
  toggleIsListOpen: (newState?: boolean) => void;
  currentOption: string | null;
  moveFocusUp: () => void;
  moveFocusDown: () => void;
  moveFocusToElement: (id: string) => void;
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
    filteredOptions: externalFilteredOptions,
    isListOpen: isExternalListOpen,
    isLoading,
    options,
  } = props;
  const filteredOptionsRef = useRef<HTMLUListElement | null>(null);
  const virtualFocus = useVirtualFocus(filteredOptionsRef.current);
  const {
    inputProps: { "aria-describedby": partialAriaDescribedBy, id },
    value,
    searchTerm,
    setValue,
    setSearchTerm,
    shouldAutocomplete,
  } = useInputContext();

  const [isInternalListOpen, setInternalListOpen] = useState(false);
  const { customOptions } = useCustomOptionsContext();

  const filteredOptions = useMemo(() => {
    if (externalFilteredOptions) {
      return externalFilteredOptions;
    }
    const opts = [...customOptions, ...options];
    return getMatchingValuesFromList(searchTerm, opts);
  }, [customOptions, externalFilteredOptions, options, searchTerm]);

  const previousSearchTerm = usePrevious(searchTerm);

  const [isMouseLastUsedInputDevice, setIsMouseLastUsedInputDevice] =
    useState(false);

  useClientLayoutEffect(() => {
    if (
      shouldAutocomplete &&
      normalizeText(searchTerm) !== "" &&
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

  const toggleIsListOpen = useCallback(
    (newState?: boolean) => {
      virtualFocus.moveFocusToTop();
      setInternalListOpen((oldState) => newState ?? !oldState);
    },
    [virtualFocus]
  );

  const isValueNew = useMemo(
    () => Boolean(value) && !isValueInList(value, filteredOptions),
    [value, filteredOptions]
  );

  const ariaDescribedBy = useMemo(() => {
    let activeOption;
    if (!isLoading && filteredOptions.length === 0) {
      activeOption = `${id}-no-hits`;
    } else if ((value && value !== "") || isLoading) {
      if (shouldAutocomplete && filteredOptions[0]) {
        activeOption = `${id}-option-${filteredOptions[0].replace(" ", "-")}`;
      } else if (isListOpen && isLoading) {
        activeOption = `${id}-is-loading`;
      }
    }
    return cl(activeOption, partialAriaDescribedBy) || undefined;
  }, [
    isListOpen,
    isLoading,
    value,
    partialAriaDescribedBy,
    shouldAutocomplete,
    filteredOptions,
    id,
  ]);

  // TODO: Re-write or remove after re-write?
  const currentOption = useMemo(
    () => virtualFocus.activeElement?.getAttribute("data-value"),
    [virtualFocus]
  );

  // TODO: Can be deleted if we move toggleIsListOpen(false) to the event handling in Input.tsx
  const moveFocusUp = useCallback(() => {
    if (virtualFocus.isFocusOnTheTop) {
      toggleIsListOpen(false);
    }
    virtualFocus.moveFocusUp();
  }, [toggleIsListOpen, virtualFocus]);

  // TODO: Can be deleted if we move toggleIsListOpen(true) to the event handling in Input.tsx
  const moveFocusDown = useCallback(() => {
    if (virtualFocus.activeElement === null || !isListOpen) {
      toggleIsListOpen(true);
    }
    virtualFocus.moveFocusDown();
  }, [isListOpen, toggleIsListOpen, virtualFocus]);

  const activeDecendantId = useMemo(
    () => virtualFocus.activeElement?.getAttribute("id") || undefined,
    [virtualFocus.activeElement]
  );

  const filteredOptionsState = {
    activeDecendantId,
    allowNewValues,
    filteredOptionsRef,
    shouldAutocomplete,
    isListOpen,
    isLoading,
    filteredOptions,
    isMouseLastUsedInputDevice,
    setIsMouseLastUsedInputDevice,
    isValueNew,
    toggleIsListOpen,
    currentOption,
    moveFocusUp,
    moveFocusDown,
    moveFocusToElement: virtualFocus.moveFocusToElement,
    moveFocusToInput: virtualFocus.moveFocusToTop,
    moveFocusToEnd: virtualFocus.moveFocusToBottom,
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
