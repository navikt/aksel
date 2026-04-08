import { createContext } from "react";

interface CheckboxGroupContextProps {
  readonly defaultValue?: readonly any[];
  readonly value?: readonly any[];
  toggleValue(value: any): void;
}

export const CheckboxGroupContext =
  createContext<CheckboxGroupContextProps | null>(null);
