import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import usePrevious from "../../../util/usePrevious";
import { useInputContext } from "../Input/inputContext";
import { ComboboxProps } from "../types";
import { useCustomOptionsContext } from "../customOptionsContext";

type SelectedOptionsContextType = {
  addSelectedOption: (option: string) => void;
  isMultiSelect?: boolean;
  removeSelectedOption: (option: string) => void;
  prevSelectedOptions?: string[];
  selectedOptions: string[];
  setSelectedOptions: (any) => void;
  toggleOption: (
    option: string,
    event: React.KeyboardEvent | React.PointerEvent
  ) => void;
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
    | "allowNewValues"
    | "isMultiSelect"
    | "options"
    | "selectedOptions"
    | "onToggleSelected"
  >;
}) => {
  const { clearInput, focusInput } = useInputContext();
  const {
    customOptions,
    removeCustomOption,
    addCustomOption,
    setCustomOptions,
  } = useCustomOptionsContext();
  const {
    allowNewValues,
    isMultiSelect,
    selectedOptions: externalSelectedOptions,
    onToggleSelected,
    options,
  } = value;
  const [internalSelectedOptions, setSelectedOptions] = useState<string[]>([]);
  const selectedOptions = useMemo(
    () =>
      externalSelectedOptions ?? [...customOptions, ...internalSelectedOptions],
    [customOptions, externalSelectedOptions, internalSelectedOptions]
  );

  const addSelectedOption = useCallback(
    (option: string) => {
      const isCustomOption = !options
        .map((opt) => opt.toLowerCase())
        .includes(option?.toLowerCase?.());
      if (isCustomOption) {
        allowNewValues && addCustomOption(option);
        !isMultiSelect && setSelectedOptions([]);
      } else if (isMultiSelect) {
        setSelectedOptions((prevSelectedOptions) => [
          ...prevSelectedOptions,
          option,
        ]);
      } else {
        setSelectedOptions([option]);
        setCustomOptions([]);
      }
      onToggleSelected?.(option, true, isCustomOption);
    },
    [
      addCustomOption,
      allowNewValues,
      isMultiSelect,
      onToggleSelected,
      options,
      setCustomOptions,
    ]
  );

  const removeSelectedOption = useCallback(
    (option: string) => {
      const isCustomOption = customOptions.includes(option);
      if (isCustomOption) {
        removeCustomOption(option);
      } else {
        setSelectedOptions((prevSelectedOptions) =>
          prevSelectedOptions.filter(
            (selectedOption) => selectedOption !== option
          )
        );
      }
      onToggleSelected?.(option, false, isCustomOption);
    },
    [customOptions, onToggleSelected, removeCustomOption]
  );

  const toggleOption = useCallback(
    (option: string, event: React.KeyboardEvent | React.PointerEvent) => {
      if (selectedOptions.includes(option)) {
        removeSelectedOption(option);
      } else {
        addSelectedOption(option);
      }
      clearInput(event);
      focusInput();
    },
    [
      addSelectedOption,
      clearInput,
      focusInput,
      removeSelectedOption,
      selectedOptions,
    ]
  );

  const prevSelectedOptions = usePrevious<string[]>(selectedOptions);

  const selectedOptionsState = {
    addSelectedOption,
    isMultiSelect,
    removeSelectedOption,
    prevSelectedOptions,
    selectedOptions,
    setSelectedOptions,
    toggleOption,
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
