import * as React from "react";
import { HTMLAttributes } from "react";

// Denne skulle vi helst sluppet, men for å enkelt støtte
export interface CustomHTMLButtonAttributes
  extends HTMLAttributes<HTMLButtonElement> {
  autoFocus?: boolean;
  disabled?: boolean;
  form?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  formAction?: string;
  formEncType?: string;
  formMethod?: string;
  formNoValidate?: boolean;
  formTarget?: string;
  name?: string;
  htmlType?: string;
  value?: string | string[] | number;
}
