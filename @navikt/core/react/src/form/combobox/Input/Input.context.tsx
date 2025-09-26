import React, { useCallback, useMemo, useRef, useState } from "react";
import { createContext } from "../../../util/create-context";
import { useClientLayoutEffect } from "../../../util/hooks";
import { FormFieldType, useFormField } from "../../useFormField";
import { ComboboxProps } from "../types";

interface InputContextValue extends FormFieldType {
  clearInput: NonNullable<ComboboxProps["onClear"]>;
  error?: ComboboxProps["error"];
  focusInput: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  value: string;
  setValue: (text: string) => void;
  onChange: (newValue: string) => void;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  shouldAutocomplete?: boolean;
  toggleOpenButtonRef: React.RefObject<HTMLDivElement | null>;
  hideCaret: boolean;
  setHideCaret: React.Dispatch<React.SetStateAction<boolean>>;
}

const [InputContextProvider, useInputContext] =
  createContext<InputContextValue>({
    name: "InputContext",
    errorMessage: "useInputContext must be used within an InputContextProvider",
  });

interface Props {
  children: React.ReactNode;
  value: {
    defaultValue: ComboboxProps["defaultValue"];
    description: ComboboxProps["description"];
    disabled: ComboboxProps["disabled"];
    readOnly: ComboboxProps["readOnly"];
    error: ComboboxProps["error"];
    errorId: ComboboxProps["errorId"];
    id: ComboboxProps["id"];
    value: ComboboxProps["value"];
    onChange: ComboboxProps["onChange"];
    onClear: ComboboxProps["onClear"];
    shouldAutocomplete: ComboboxProps["shouldAutocomplete"];
    size: ComboboxProps["size"];
  };
}

const InputProvider = ({ children, value: props }: Props) => {
  const {
    defaultValue = "",
    description,
    disabled,
    readOnly,
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
      readOnly,
      error,
      errorId,
      id: externalId,
      size,
    },
    "comboboxfield",
  );
  const inputRef = useRef<HTMLInputElement | null>(null);
  const toggleOpenButtonRef = useRef<HTMLDivElement>(null);
  const [internalValue, setInternalValue] = useState<string>(defaultValue);
  const [hideCaret, setHideCaret] = useState(false);

  const value = useMemo(
    () => String(externalValue ?? internalValue),
    [externalValue, internalValue],
  );

  const [searchTerm, setSearchTerm] = useState(value);

  const onChange = useCallback(
    (newValue: string) => {
      externalValue ?? setInternalValue(newValue);
      setSearchTerm(newValue);
      externalOnChange?.(newValue);
    },
    [externalValue, externalOnChange],
  );

  const clearInput = useCallback(
    (event: React.PointerEvent | React.KeyboardEvent | React.FocusEvent) => {
      onClear?.(event);
      externalOnChange?.("");
      setInternalValue("");
      setSearchTerm("");
    },
    [externalOnChange, onClear],
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
    setValue: setInternalValue,
    onChange,
    searchTerm,
    setSearchTerm,
    shouldAutocomplete,
    toggleOpenButtonRef,
    hideCaret,
    setHideCaret,
  };

  return (
    <InputContextProvider {...contextValue}>{children}</InputContextProvider>
  );
};

export { InputProvider as InputContextProvider, useInputContext };
