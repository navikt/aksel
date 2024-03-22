import React from "react";
import { Link, LinkProps } from "../link";

export interface FormSummaryEditButtonProps extends Partial<LinkProps> {}

export default function FormSummaryEditButton({
  children = "Endre svar",
  ...rest
}: FormSummaryEditButtonProps) {
  return <Link {...rest}>{children}</Link>;
}

// TODO Bør den hete EditLink?
