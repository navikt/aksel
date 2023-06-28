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
      allowNewValues = false,
      children,
      defaultValue,
      error,
      errorId,
      id,
      isListOpen,
      isLoading = false,
      isMultiSelect,
      onToggleSelected,
      selectedOptions,
      options,
      value,
      onChange,
      shouldAutocomplete,
      size,
      ...rest
    } = props;
    return (
      <InputContextProvider
        value={{
          defaultValue,
          error,
          errorId,
          id,
          value,
          onChange,
          shouldAutocomplete,
          size,
        }}
      >
        <SelectedOptionsProvider
          value={{
            isMultiSelect,
            selectedOptions,
            onToggleSelected,
          }}
        >
          <CustomOptionsProvider>
            <FilteredOptionsProvider
              value={{
                allowNewValues,
                isListOpen,
                isLoading,
                isMultiSelect,
                options,
              }}
            >
              <Combobox {...rest}>{children}</Combobox>
            </FilteredOptionsProvider>
          </CustomOptionsProvider>
        </SelectedOptionsProvider>
      </InputContextProvider>
    );
  }
);

export default ComboboxProvider;
