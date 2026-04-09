import { createContext } from "react";

export interface CheckboxGroupContextProps {
  readonly defaultValue?: readonly any[];
  readonly value?: readonly any[];
  toggleValue(value: any): void;
}

export const CheckboxGroupContext =
  createContext<CheckboxGroupContextProps | null>(null);
