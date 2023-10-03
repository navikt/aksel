import React, {
  ChangeEvent,
  ChangeEventHandler,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { useFormField, FormFieldType } from "../../useFormField";
import { useClientLayoutEffect } from "../../../util";

interface InputContextType extends FormFieldType {
  clearInput: (event: React.PointerEvent | React.KeyboardEvent) => void;
  error?: string;
  focusInput: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
  value: string;
  setValue: (text: string) => void;
  onChange: ChangeEventHandler<HTMLInputElement>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  shouldAutocomplete?: boolean;
}

const InputContext = createContext<InputContextType>({} as InputContextType);

export const InputContextProvider = ({ children, value: props }) => {
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
    "comboboxfield"
  );
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [internalValue, setInternalValue] = useState<string>(defaultValue);

  const value = useMemo(
    () => String(externalValue ?? internalValue),
    [externalValue, internalValue]
  );

  const [searchTerm, setSearchTerm] = useState(value);

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.currentTarget.value;
      externalValue ?? setInternalValue(value);
      externalOnChange?.(event);
      setSearchTerm(value);
    },
    [externalValue, externalOnChange]
  );

  const setValue = useCallback(
    (text) => {
      setInternalValue(text);
    },
    [setInternalValue]
  );

  const clearInput = useCallback(
    (event: React.PointerEvent | React.KeyboardEvent) => {
      onClear?.(event);
      externalOnChange?.(null, "");
      setValue("");
      setSearchTerm("");
    },
    [externalOnChange, onClear, setValue]
  );

  const focusInput = useCallback(() => {
    inputRef.current?.focus?.();
  }, []);

  useClientLayoutEffect(() => {
    if (shouldAutocomplete && inputRef && value !== searchTerm) {
      inputRef.current?.setSelectionRange?.(searchTerm.length, value.length);
    }
  }, [value, searchTerm, shouldAutocomplete]);

  return (
    <InputContext.Provider
      value={{
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
      }}
    >
      {children}
    </InputContext.Provider>
  );
};

export const useInputContext = () => {
  const context = useContext(InputContext);
  if (!context) {
    throw new Error(
      "useInputContext must be used within an InputContextProvider"
    );
  }
  return context;
};
