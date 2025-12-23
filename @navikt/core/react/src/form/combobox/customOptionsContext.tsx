import React, { useCallback, useState } from "react";
import { createStrictContext } from "../../util/create-strict-context";
import { useInputContext } from "./Input/Input.context";
import { ComboboxOption } from "./types";

type CustomOptionsContextValue = {
  customOptions: ComboboxOption[];
  removeCustomOption: (option: ComboboxOption) => void;
  addCustomOption: (option: ComboboxOption) => void;
  setCustomOptions: React.Dispatch<React.SetStateAction<ComboboxOption[]>>;
};

const {
  Provider: ComboboxCustomOptionsProvider,
  useContext: useComboboxCustomOptions,
} = createStrictContext<CustomOptionsContextValue>({
  name: "ComboboxCustomOptions",
  errorMessage:
    "useComboboxCustomOptions must be used within a ComboboxCustomOptionsProvider",
});

const CustomOptionsProvider = ({
  children,
  value,
}: {
  children: any;
  value: { isMultiSelect?: boolean };
}) => {
  const [customOptions, setCustomOptions] = useState<ComboboxOption[]>([]);
  const { focusInput } = useInputContext();
  const { isMultiSelect } = value;

  const removeCustomOption = useCallback(
    (option: ComboboxOption) => {
      setCustomOptions((prevCustomOptions) =>
        prevCustomOptions.filter((o) => o.label !== option.label),
      );
      focusInput();
    },
    [focusInput],
  );

  const addCustomOption = useCallback(
    (option: ComboboxOption) => {
      if (isMultiSelect) {
        setCustomOptions((prevOptions) => [...prevOptions, option]);
      } else {
        setCustomOptions([option]);
      }
      focusInput();
    },
    [focusInput, isMultiSelect],
  );

  const customOptionsState = {
    customOptions,
    removeCustomOption,
    addCustomOption,
    setCustomOptions,
  };

  return (
    <ComboboxCustomOptionsProvider {...customOptionsState}>
      {children}
    </ComboboxCustomOptionsProvider>
  );
};

export { CustomOptionsProvider, useComboboxCustomOptions };
