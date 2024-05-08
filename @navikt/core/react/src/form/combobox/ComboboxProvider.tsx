import React, { forwardRef } from "react";
import Combobox from "./Combobox";
import { FilteredOptionsProvider } from "./FilteredOptions/filteredOptionsContext";
import { InputContextProvider } from "./Input/Input.context";
import { SelectedOptionsProvider } from "./SelectedOptions/selectedOptionsContext";
import { mapToComboboxOptionArray } from "./combobox-utils";
import { CustomOptionsProvider } from "./customOptionsContext";
import { ComboboxProps } from "./types";

/**
 * A component that allows the user to search in a list of options
 *
 * Has options for allowing only one or multiple options to be selected,
 * or adding new, user-submitted values.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/combobox)
 *
 * @example
 * ```jsx
 * const options = ["apple", "banana", "orange"];
 *
 * return (
 *    <Combobox
 *      label="Velg en verdi"
 *      options={options}
 *      id="my-combobox"
 *      shouldAutoComplete
 *    />
 * )
 * ```
 */
const ComboboxProvider = forwardRef<HTMLInputElement, ComboboxProps>(
  (props, ref) => {
    const {
      allowNewValues = false,
      children,
      defaultValue,
      error,
      errorId,
      filteredOptions: externalFilteredOptions,
      id,
      isListOpen,
      isLoading = false,
      isMultiSelect,
      onToggleSelected,
      selectedOptions: externalSelectedOptions,
      maxSelected,
      options: externalOptions,
      value,
      onChange,
      onClear,
      shouldAutocomplete,
      size,
      ...rest
    } = props;
    const options = mapToComboboxOptionArray(externalOptions) || [];
    const filteredOptions = mapToComboboxOptionArray(externalFilteredOptions);
    const selectedOptions = mapToComboboxOptionArray(externalSelectedOptions);
    return (
      <InputContextProvider
        value={{
          defaultValue,
          error,
          errorId,
          id,
          value,
          onChange,
          onClear,
          shouldAutocomplete,
          size,
        }}
      >
        <CustomOptionsProvider value={{ isMultiSelect }}>
          <SelectedOptionsProvider
            value={{
              allowNewValues,
              isMultiSelect,
              selectedOptions,
              maxSelected,
              onToggleSelected,
              options,
            }}
          >
            <FilteredOptionsProvider
              value={{
                allowNewValues,
                filteredOptions,
                isListOpen,
                isLoading,
                options,
              }}
            >
              <Combobox ref={ref} {...rest}>
                {children}
              </Combobox>
            </FilteredOptionsProvider>
          </SelectedOptionsProvider>
        </CustomOptionsProvider>
      </InputContextProvider>
    );
  },
);

export default ComboboxProvider;
