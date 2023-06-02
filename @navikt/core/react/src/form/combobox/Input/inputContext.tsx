import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useFormField, FormFieldType } from "../../useFormField";

interface InputContextType extends FormFieldType {
  value: string;
  onChange: (value: string) => void;
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
    size: _size,
  } = props;
  const formFieldProps = useFormField(
    {
      description,
      disabled,
      error,
      errorId,
      id: externalId,
      size: _size,
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
    (val: string) => {
      externalValue ?? setInternalValue(val);
      externalOnChange?.(val);
      setSearchTerm(val);
    },
    [externalValue, externalOnChange]
  );

  return (
    <InputContext.Provider
      value={{ ...formFieldProps, value, onChange, searchTerm, setSearchTerm }}
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
