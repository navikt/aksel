import React from "react";
import Combobox from "./Combobox";
import { FilteredOptionsProvider } from "./FilteredOptions/filteredOptionsContext";
import { CustomOptionsProvider } from "./customOptionsContext";
import { SelectedOptionsProvider } from "./SelectedOptions/selectedOptionsContext";

export default function ComboboxProvider(props) {
  const {
    children,
    isListOpen,
    selectedOptions,
    setSelectedOptions,
    options,
    ...rest
  } = props;
  return (
    <SelectedOptionsProvider value={{ selectedOptions, setSelectedOptions }}>
      <CustomOptionsProvider>
        <FilteredOptionsProvider value={{ isListOpen, options }}>
          <Combobox {...rest}>{children}</Combobox>
        </FilteredOptionsProvider>
      </CustomOptionsProvider>
    </SelectedOptionsProvider>
  );
}
