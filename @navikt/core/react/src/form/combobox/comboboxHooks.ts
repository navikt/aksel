import { useCallback, useMemo, useState } from "react";

const useInputValue = (
  setFilteredOptionsIndex: (index: number) => void,
  isListOpen: boolean,
  toggleIsListOpen: (isOpen: boolean) => void,
  externalValue?: string,
  externalOnChange?: (value: string) => void
) => {
  const [internalValue, setInternalValue] = useState<string>("");

  const value = useMemo(
    () => String(externalValue ?? internalValue),
    [externalValue, internalValue]
  );

  const onChange = useCallback(
    (val: string) => {
      externalValue ?? setInternalValue(val);
      externalOnChange?.(val);
      setFilteredOptionsIndex(0);
      if (!isListOpen && !!val) toggleIsListOpen(true);
    },
    [
      externalValue,
      externalOnChange,
      setFilteredOptionsIndex,
      isListOpen,
      toggleIsListOpen,
    ]
  );
  return {
    value,
    onChange,
  };
};

export { useInputValue };
