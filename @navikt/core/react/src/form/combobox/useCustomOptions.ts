import React, { useCallback, useState } from "react";

export interface CustomOptionProps {
  value?: string;
  event?: React.MouseEvent<HTMLElement>;
}

const useCustomOptions = (setSelectedOptions) => {
  const [customOptions, setCustomOptions] = useState<string[]>([]);

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
