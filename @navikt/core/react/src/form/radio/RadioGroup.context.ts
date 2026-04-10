import { createContext } from "react";

export interface RadioGroupContextProps {
  name: string;
  defaultValue?: any;
  value?: any;
  onChange: (value: any) => void;
  required?: boolean;
}

export const RadioGroupContext = createContext<RadioGroupContextProps | null>(
  null,
);
