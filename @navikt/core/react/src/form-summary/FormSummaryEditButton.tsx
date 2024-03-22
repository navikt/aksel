import cl from "clsx";
import React from "react";
import { Link, LinkProps } from "../link";

export interface FormSummaryEditButtonProps extends Partial<LinkProps> {}

export default function FormSummaryEditButton({
  children = "Endre svar",
  className,
  ...rest
}: FormSummaryEditButtonProps) {
  return (
    <Link {...rest} className={cl("form-summary__edit-button", className)}>
      {children}
    </Link>
  );
}

// TODO Bør den hete EditLink?
