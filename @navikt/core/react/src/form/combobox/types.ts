import React, { ChangeEvent, InputHTMLAttributes } from "react";
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
  label: React.ReactNode;
  options: string[];
  allowNewValues?: boolean;
  children?: React.ReactNode;
  clearButton?: boolean;
  clearButtonLabel?: string;
  hideLabel?: boolean;
  inputClassName?: string | undefined;
  isListOpen?: boolean;
  isLoading?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onClear?: (e: ComboboxClearEvent) => void;
  onToggleSelected?: (option: string, isSelected: boolean) => void;
  singleSelect?: boolean;
  selectedOptions?: string[];
  shouldAutocomplete?: boolean;
  shouldShowSelectedOptions?: boolean;
  toggleListButton?: boolean;
  toggleListButtonLabel?: string;
  value?: string;
}
