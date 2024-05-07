import React, {
  ChangeEvent,
  ChangeEventHandler,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { createContext } from "../../../util/create-context";
import { useClientLayoutEffect } from "../../../util/hooks";
import { FormFieldType, useFormField } from "../../useFormField";
import { ComboboxProps } from "../types";

interface InputContextValue extends FormFieldType {
  clearInput: NonNullable<ComboboxProps["onClear"]>;
  error?: string;
  focusInput: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
  value: string;
  setValue: (text: string) => void;
  onChange: ChangeEventHandler<HTMLInputElement>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  shouldAutocomplete?: boolean;
  toggleOpenButtonRef: React.RefObject<HTMLButtonElement>;
}

const [InputContextProvider, useInputContext] =
  createContext<InputContextValue>({
    name: "InputContext",
    errorMessage: "useInputContext must be used within an InputContextProvider",
  });

const InputProvider = ({ children, value: props }) => {
  const {
    defaultValue = "",
    description,
    disabled,
    error,
    errorId,
    id: externalId,
    value: externalValue,
    onChange: externalOnChange,
    onClear,
    shouldAutocomplete,
    size,
  } = props;
  const formFieldProps = useFormField(
    {
      description,
      disabled,
      error,
      errorId,
      id: externalId,
      size,
    },
    "comboboxfield",
  );
  const inputRef = useRef<HTMLInputElement | null>(null);
  const toggleOpenButtonRef = useRef<HTMLButtonElement>(null);
  const [internalValue, setInternalValue] = useState<string>(defaultValue);

  const value = useMemo(
    () => String(externalValue ?? internalValue),
    [externalValue, internalValue],
  );

  const [searchTerm, setSearchTerm] = useState(value);

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.currentTarget.value;
      externalValue ?? setInternalValue(newValue);
      externalOnChange?.(event);
      setSearchTerm(newValue);
    },
    [externalValue, externalOnChange],
  );

  const setValue = useCallback(
    (text) => {
      setInternalValue(text);
    },
    [setInternalValue],
  );

  const clearInput = useCallback(
    (event: React.PointerEvent | React.KeyboardEvent | React.MouseEvent) => {
      onClear?.(event);
      externalOnChange?.(null, "");
      setValue("");
      setSearchTerm("");
    },
    [externalOnChange, onClear, setValue],
  );

  const focusInput = useCallback(() => {
    inputRef.current?.focus?.();
  }, []);

  useClientLayoutEffect(() => {
    if (shouldAutocomplete && inputRef && value !== searchTerm) {
      inputRef.current?.setSelectionRange?.(searchTerm.length, value.length);
    }
  }, [value, searchTerm, shouldAutocomplete]);

  const contextValue = {
    ...formFieldProps,
    clearInput,
    error,
    focusInput,
    inputRef,
    value,
    setValue,
    onChange,
    searchTerm,
    setSearchTerm,
    shouldAutocomplete,
    toggleOpenButtonRef,
  };

  return (
    <InputContextProvider {...contextValue}>{children}</InputContextProvider>
  );
};

export { InputProvider as InputContextProvider, useInputContext };
