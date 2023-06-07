import React, { forwardRef } from "react";
import Combobox from "./Combobox";
import { FilteredOptionsProvider } from "./FilteredOptions/filteredOptionsContext";
import { CustomOptionsProvider } from "./customOptionsContext";
import { SelectedOptionsProvider } from "./SelectedOptions/selectedOptionsContext";
import { InputContextProvider } from "./Input/inputContext";
import { ComboboxProps } from "./types";

const ComboboxProvider = forwardRef<HTMLInputElement, ComboboxProps>(
  (props, ref) => {
    const {
      children,
      error,
      errorId,
      id,
      isListOpen,
      onToggleSelected,
      selectedOptions,
      options,
      value,
      onChange,
      singleSelect,
      size,
      ...rest
    } = props;
    return (
      <InputContextProvider
        value={{ error, errorId, id, value, onChange, size }}
      >
        <SelectedOptionsProvider
          value={{ selectedOptions, singleSelect, onToggleSelected }}
        >
          <CustomOptionsProvider>
            <FilteredOptionsProvider
              value={{ isListOpen, options, singleSelect }}
            >
              <Combobox {...rest}>
                {children}
              </Combobox>
            </FilteredOptionsProvider>
          </CustomOptionsProvider>
        </SelectedOptionsProvider>
      </InputContextProvider>
    );
  }
);

export default ComboboxProvider;
