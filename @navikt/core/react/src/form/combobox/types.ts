import React, { InputHTMLAttributes } from "react";
import { FormFieldProps } from "../useFormField";

export type ComboboxClearEvent =
  | {
      trigger: "Click";
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>;
    }
  | { trigger: "Escape"; event: React.KeyboardEvent<HTMLDivElement> }
  | { trigger: "Enter"; event: React.KeyboardEvent<HTMLButtonElement> };

export interface ComboboxProps
  extends FormFieldProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "onChange" | "value"> {
  allowNewValues?: boolean;
  isListOpen?: boolean;
  options: string[];
  selectedOptions?: string[];
  onClear?: (e: ComboboxClearEvent) => void;
  clearButton?: boolean;
  clearButtonLabel?: string;
  toggleListButton?: boolean;
  toggleListButtonLabel?: string;
  isLoading?: boolean;
  onChange?: (value: string) => void;
  onToggleSelected?: (option: string, isSelected: boolean) => void;
  hideLabel?: boolean;
  label: React.ReactNode;
  children?: React.ReactNode;
  shouldShowSelectedOptions?: boolean;
  value?: string;
  inputClassName?: string | undefined;
  singleSelect?: boolean;
  shouldAutocomplete?: boolean;
}
