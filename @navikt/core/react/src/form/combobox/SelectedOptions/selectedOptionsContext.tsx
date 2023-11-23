import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import usePrevious from "../../../util/usePrevious";
import { useInputContext } from "../Input/inputContext";
import { useCustomOptionsContext } from "../customOptionsContext";
import { ComboboxProps } from "../types";

type SelectedOptionsContextType = {
  addSelectedOption: (option: string) => void;
  canSelectMoreOptions: boolean;
  isMultiSelect?: boolean;
  removeSelectedOption: (option: string) => void;
  prevSelectedOptions?: string[];
  selectedOptions: string[];
  maxSelectedOptions?: number;
  setSelectedOptions: (any) => void;
  maxSelectedMessage?: string;
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
    | "maxSelectedOptions"
    | "maxSelectedMessage"
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
    maxSelectedOptions,
    maxSelectedMessage,
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
        setSelectedOptions((oldSelectedOptions) => [
          ...oldSelectedOptions,
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
        setSelectedOptions((oldSelectedOptions) =>
          oldSelectedOptions.filter(
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

  const canSelectMoreOptions =
    !maxSelectedOptions || selectedOptions.length < maxSelectedOptions;

  const selectedOptionsState = {
    addSelectedOption,
    canSelectMoreOptions,
    isMultiSelect,
    removeSelectedOption,
    prevSelectedOptions,
    selectedOptions,
    setSelectedOptions,
    toggleOption,
    maxSelectedOptions,
    maxSelectedMessage,
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
