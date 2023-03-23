import React, { useCallback, useState } from "react";

//make three methods for custom options
//1. add custom option
//2. remove custom option
//3. set custom options, for special cases

export interface CustomOptionProps {
  value?: string;
  event?: React.MouseEvent<HTMLElement>;
}

const useCustomOptions = (setSelectedOptions) => {
  const [customOptions, setCustomOptions] = useState<string[]>([]);

  //handle clicking
  //handle enter
  const removeCustomOption = useCallback(
    ({ value, event }: CustomOptionProps) => {
      const newValue =
        value || (event?.target as HTMLElement)?.textContent?.trim?.();
      if (newValue)
        setCustomOptions(customOptions.filter((o) => o !== newValue));
    },
    [customOptions, setCustomOptions]
  );

  const addCustomOption = useCallback(
    ({ value, event }: CustomOptionProps) => {
      const newValue =
        value || (event?.target as HTMLElement)?.textContent?.trim?.();
      if (newValue) {
        setCustomOptions((prevOptions) => [...prevOptions, newValue]);
        setSelectedOptions((selectedOptions) => [
          ...selectedOptions,
          newValue.trim(),
        ]);
      }
    },
    [setCustomOptions, setSelectedOptions]
  );

  return {
    customOptions,
    setCustomOptions,
    removeCustomOption,
    addCustomOption,
  };
};

export default useCustomOptions;
