import React from "react";
import Combobox from "./Combobox";
import { FilteredOptionsProvider } from "./FilteredOptions/filteredOptionsContext";
import { CustomOptionsProvider } from "./customOptionsContext";
import { SelectedOptionsProvider } from "./SelectedOptions/selectedOptionsContext";
import { InputContextProvider } from "./Input/inputContext";

export default function ComboboxProvider(props) {
  const {
    children,
    id,
    isListOpen,
    onToggleSelected,
    selectedOptions,
    options,
    value,
    onChange,
    singleSelect,
    ...rest
  } = props;
  return (
    <InputContextProvider value={{ id, value, onChange }}>
      <SelectedOptionsProvider value={{ selectedOptions, onToggleSelected }}>
        <CustomOptionsProvider>
          <FilteredOptionsProvider
            value={{ isListOpen, options, singleSelect }}
          >
            <Combobox singleSelect={singleSelect} {...rest}>
              {children}
            </Combobox>
          </FilteredOptionsProvider>
        </CustomOptionsProvider>
      </SelectedOptionsProvider>
    </InputContextProvider>
  );
}
