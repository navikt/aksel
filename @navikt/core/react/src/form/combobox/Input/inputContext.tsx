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
}

const InputContext = createContext<InputContextType>({} as InputContextType);

export const InputContextProvider = ({ children, value: props }) => {
  const {
    description,
    disabled,
    error,
    errorId,
    id: externalId,
    value: externalValue,
    onChange: externalOnChange,
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
  const [internalValue, setInternalValue] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");

  const value = useMemo(
    () => String(externalValue ?? internalValue),
    [externalValue, internalValue]
  );

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target?.value;
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
