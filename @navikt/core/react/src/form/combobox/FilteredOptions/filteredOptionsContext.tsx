import cl from "clsx";
import React, { SetStateAction, useCallback, useMemo, useState } from "react";
import { createContext } from "../../../util/create-context";
import { useClientLayoutEffect, usePrevious } from "../../../util/hooks";
import { useInputContext } from "../Input/Input.context";
import { useSelectedOptionsContext } from "../SelectedOptions/selectedOptionsContext";
import { toComboboxOption } from "../combobox-utils";
import { useComboboxCustomOptions } from "../customOptionsContext";
import { ComboboxOption, ComboboxProps } from "../types";
import filteredOptionsUtils from "./filtered-options-util";
import useVirtualFocus, { VirtualFocusType } from "./useVirtualFocus";

type FilteredOptionsProps = {
  children: React.ReactNode;
  value: Pick<ComboboxProps, "allowNewValues" | "isListOpen" | "isLoading"> & {
    filteredOptions?: ComboboxOption[];
    options: ComboboxOption[];
  };
};

type FilteredOptionsContextValue = {
  activeDecendantId?: string;
  allowNewValues?: boolean;
  ariaDescribedBy?: string;
  setFilteredOptionsRef: React.Dispatch<
    React.SetStateAction<HTMLUListElement | null>
  >;
  isListOpen: boolean;
  isLoading?: boolean;
  filteredOptions: ComboboxOption[];
  isMouseLastUsedInputDevice: boolean;
  setIsMouseLastUsedInputDevice: React.Dispatch<SetStateAction<boolean>>;
  isValueNew: boolean;
  toggleIsListOpen: (newState?: boolean) => void;
  currentOption?: ComboboxOption;
  shouldAutocomplete?: boolean;
  virtualFocus: VirtualFocusType;
};
const [FilteredOptionsContextProvider, useFilteredOptionsContext] =
  createContext<FilteredOptionsContextValue>({
    name: "FilteredOptionsContext",
    errorMessage:
      "useFilteredOptionsContext must be used within a FilteredOptionsProvider",
  });

const FilteredOptionsProvider = ({
  children,
  value: props,
}: FilteredOptionsProps) => {
  const {
    allowNewValues,
    filteredOptions: externalFilteredOptions,
    isListOpen: isExternalListOpen,
    isLoading,
    options,
  } = props;
  const [filteredOptionsRef, setFilteredOptionsRef] =
    useState<HTMLUListElement | null>(null);
  const virtualFocus = useVirtualFocus(filteredOptionsRef);
  const {
    inputProps: { "aria-describedby": partialAriaDescribedBy, id },
    value,
    searchTerm,
    setValue,
    setSearchTerm,
    shouldAutocomplete,
  } = useInputContext();
  const { maxSelected } = useSelectedOptionsContext();

  const [isInternalListOpen, setInternalListOpen] = useState(false);
  const { customOptions } = useComboboxCustomOptions();

  const filteredOptions = useMemo(() => {
    if (externalFilteredOptions) {
      return externalFilteredOptions;
    }
    const opts = [...customOptions, ...options];
    return filteredOptionsUtils.getMatchingValuesFromList(searchTerm, opts);
  }, [customOptions, externalFilteredOptions, options, searchTerm]);

  const previousSearchTerm = usePrevious(searchTerm);

  const [isMouseLastUsedInputDevice, setIsMouseLastUsedInputDevice] =
    useState(false);

  const filteredOptionsMap = useMemo(() => {
    const initialMap = {
      [filteredOptionsUtils.getAddNewOptionId(id)]: allowNewValues
        ? toComboboxOption(value)
        : undefined,
      ...customOptions.reduce((acc, customOption) => {
        const _id = filteredOptionsUtils.getOptionId(id, customOption.label);
        acc[_id] = customOption;
        return acc;
      }, {}),
    };

    // Add the options to the map
    const finalMap = options.reduce((map, _option) => {
      const _id = filteredOptionsUtils.getOptionId(id, _option.label);
      map[_id] = _option;
      return map;
    }, initialMap);

    return finalMap;
  }, [allowNewValues, customOptions, id, options, value]);

  useClientLayoutEffect(() => {
    if (
      shouldAutocomplete &&
      filteredOptionsUtils.normalizeText(searchTerm) !== "" &&
      (previousSearchTerm?.length || 0) < searchTerm.length &&
      filteredOptions.length > 0
    ) {
      setValue(
        `${searchTerm}${filteredOptions[0].label.substring(searchTerm.length)}`,
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
    [virtualFocus],
  );

  const isValueNew = useMemo(
    () =>
      Boolean(value) &&
      !filteredOptionsMap[filteredOptionsUtils.getOptionId(id, value)],
    [filteredOptionsMap, id, value],
  );

  const ariaDescribedBy = useMemo(() => {
    let activeOption: string = "";
    if (!isLoading && filteredOptions.length === 0 && !allowNewValues) {
      activeOption = filteredOptionsUtils.getNoHitsId(id);
    } else if (value || isLoading) {
      if (shouldAutocomplete && filteredOptions[0]) {
        activeOption = filteredOptionsUtils.getOptionId(
          id,
          filteredOptions[0].label,
        );
      } else if (isListOpen && isLoading) {
        activeOption = filteredOptionsUtils.getIsLoadingId(id);
      }
    }
    const maybeMaxSelectedOptionsId =
      maxSelected?.isLimitReached &&
      filteredOptionsUtils.getMaxSelectedOptionsId(id);

    return (
      cl(activeOption, maybeMaxSelectedOptionsId, partialAriaDescribedBy) ||
      undefined
    );
  }, [
    isListOpen,
    isLoading,
    maxSelected?.isLimitReached,
    value,
    partialAriaDescribedBy,
    shouldAutocomplete,
    filteredOptions,
    id,
    allowNewValues,
  ]);

  const currentOption = useMemo(
    () =>
      filteredOptionsMap[virtualFocus.activeElement?.getAttribute("id") || -1],
    [filteredOptionsMap, virtualFocus],
  );

  const activeDecendantId = useMemo(
    () => virtualFocus.activeElement?.getAttribute("id") || undefined,
    [virtualFocus.activeElement],
  );

  const filteredOptionsState = {
    activeDecendantId,
    allowNewValues,
    setFilteredOptionsRef,
    shouldAutocomplete,
    isListOpen,
    isLoading,
    filteredOptions,
    isMouseLastUsedInputDevice,
    setIsMouseLastUsedInputDevice,
    isValueNew,
    toggleIsListOpen,
    currentOption,
    virtualFocus,
    ariaDescribedBy,
  };

  return (
    <FilteredOptionsContextProvider {...filteredOptionsState}>
      {children}
    </FilteredOptionsContextProvider>
  );
};

export { FilteredOptionsProvider, useFilteredOptionsContext };
