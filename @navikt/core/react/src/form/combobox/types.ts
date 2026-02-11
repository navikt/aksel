import React, { InputHTMLAttributes } from "react";
import { FormFieldProps } from "../useFormField";

/**
 * A more complex version of options for the Combobox.
 * Used for separating the label and the value of the option.
 */
export type ComboboxOption = {
  /**
   * The label to display in the dropdown list
   */
  label: string;
  /**
   * The programmatic value of the option, for use internally. Will be returned from onToggleSelected.
   */
  value: string;
};

export interface ComboboxProps
  extends
    FormFieldProps,
    Omit<
      InputHTMLAttributes<HTMLInputElement>,
      | "size"
      | "onChange"
      | "value"
      | "defaultValue"
      | "onClick"
      | "onInput"
      | "type"
      | "role"
      | "onKeyUp"
      | "onKeyDown"
      | "autoComplete"
    > {
  /**
   * Combobox label.
   */
  label: React.ReactNode;
  /**
   * List of options
   */
  options: string[] | ComboboxOption[];
  /**
   * If enabled, adds an option to add the value of the input as an option whenever there are no options matching the value.
   */
  allowNewValues?: boolean;
  /**
   * @deprecated The clear button has been removed. This prop has no effect.
   */
  clearButton?: boolean;
  /**
   * @deprecated The clear button has been removed. This prop has no effect.
   */
  clearButtonLabel?: string;
  /**
   * A list of options to display in the dropdown list.
   * If provided, this overrides the internal search logic in the component.
   * Useful for e.g. searching on a server or when overriding the search algorithm to search for synonyms or similar.
   */
  filteredOptions?: string[] | ComboboxOption[];
  /**
   * Optionally hide the label visually.
   * Not recommended, but can be considered for e.g. search fields in the top menu.
   */
  hideLabel?: boolean;
  /**
   * Custom class name for the input field.
   *
   * If used for styling, please consider using tokens instead.
   */
  inputClassName?: string | undefined;
  /**
   * Controlled open/closed state for the dropdown list
   */
  isListOpen?: boolean;
  /**
   * Set to `true` when doing an async search and waiting for new filteredOptions.
   *
   * Will show a spinner in the dropdown and announce to screen readers that it is loading.
   */
  isLoading?: boolean;
  /**
   * Set to `true` to allow multiple selections.
   *
   * This will display selected values as a list of Chips in front of the input field, instead of a selection replacing the value of the input.
   *
   */
  isMultiSelect?: boolean;
  /**
   * Callback function triggered whenever the value of the input field is triggered.
   *
   * @param value The value after change
   */
  onChange?: (value: string) => void;
  /**
   * Callback function triggered whenever the input field is cleared.
   *
   * @param event
   */
  onClear?: (
    event: React.PointerEvent | React.KeyboardEvent | React.FocusEvent,
  ) => void;
  /**
   * Callback function triggered whenever an option is selected or de-selected.
   *
   * @param option The option value
   * @param isSelected Whether the option has been selected or unselected
   * @param isCustomOption Whether the option comes from user input, instead of from the list
   */
  onToggleSelected?: (
    option: ComboboxOption["value"],
    isSelected: boolean,
    isCustomOption: boolean,
  ) => void;
  /**
   * List of selected options.
   *
   * Use this prop when controlling the selected state outside for the component,
   * e.g. for a filter, where options can be toggled elsewhere/programmatically.
   */
  selectedOptions?: string[] | ComboboxOption[];
  /**
   * Maximum number of selected options.
   * @example maxSelected={3}
   */
  maxSelected?:
    | {
        /** @deprecated Provide a number instead of an object */
        limit: number;
      }
    | number;
  /**
   * Set to `true` to enable inline autocomplete.
   *
   * @default false
   */
  shouldAutocomplete?: boolean;
  /**
   * When set to `true` displays selected options as Chips before the input field
   *
   * @default true
   */
  shouldShowSelectedOptions?: boolean;
  /**
   * When set to `true` displays the toggle button for opening/closing the dropdown list
   *
   * @default true
   */
  toggleListButton?: boolean;
  /**
   * Set this to override the value of the input field.
   *
   * This converts the input to a controlled input, so you have to use onChange to update the value.
   */
  value?: string;
  /**
   * Initial value of the input field. Only works when the input is uncontrolled.
   */
  defaultValue?: string;
}
