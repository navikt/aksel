import React from "react";
import Combobox from "./Combobox";
import { FilteredOptionsProvider } from "./FilteredOptions/filteredOptionsContext";
import { CustomOptionsProvider } from "./customOptionsContext";
import { SelectedOptionsProvider } from "./SelectedOptions/selectedOptionsContext";
import { InputContextProvider } from "./inputContext";

export default function ComboboxProvider(props) {
  const {
    children,
    isListOpen,
    selectedOptions,
    setSelectedOptions,
    options,
    value,
    onChange,
    ...rest
  } = props;
  return (
    <InputContextProvider value={{ value, onChange }}>
      <SelectedOptionsProvider value={{ selectedOptions, setSelectedOptions }}>
        <CustomOptionsProvider>
          <FilteredOptionsProvider value={{ isListOpen, options }}>
            <Combobox {...rest}>{children}</Combobox>
          </FilteredOptionsProvider>
        </CustomOptionsProvider>
      </SelectedOptionsProvider>
    </InputContextProvider>
  );
}
