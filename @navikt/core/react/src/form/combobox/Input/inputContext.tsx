import React, {
  ChangeEvent,
  ChangeEventHandler,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useFormField, FormFieldType } from "../../useFormField";

interface InputContextType extends FormFieldType {
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

  return (
    <InputContext.Provider
      value={{
        ...formFieldProps,
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
