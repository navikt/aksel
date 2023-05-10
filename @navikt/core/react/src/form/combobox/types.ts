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
  isListOpen: boolean;
  options?: string[];
  selectedOptions: string[];
  setOptions: React.Dispatch<React.SetStateAction<any[]>>;
  setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>;
  onClear?: (e: ComboboxClearEvent) => void;
  clearButton?: boolean;
  clearButtonLabel?: string;
  toggleListButton?: boolean;
  toggleListButtonLabel?: string;
  loading?: boolean;
  onChange?: (value: string) => void;
  hideLabel?: boolean;
  label: React.ReactNode;
  children?: React.ReactNode;
  value?: string;
  inputClassName?: string | undefined;
  singleSelect?: boolean;
}

export interface ComboboxContextProps {
  disabled?: boolean;
  size: "medium" | "small";
}
