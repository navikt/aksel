import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type InputContextType = {
  value: string;
  onChange: (value: string) => void;
};

const InputContext = createContext<InputContextType>({} as InputContextType);

export const InputContextProvider = ({ children, value: props }) => {
  const { value: externalValue, onChange: externalOnChange } = props;
  const [internalValue, setInternalValue] = useState<string>("");

  const value = useMemo(
    () => String(externalValue ?? internalValue),
    [externalValue, internalValue]
  );

  const onChange = useCallback(
    (val: string) => {
      externalValue ?? setInternalValue(val);
      externalOnChange?.(val);
    },
    [externalValue, externalOnChange]
  );

  return (
    <InputContext.Provider value={{ value, onChange }}>
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
