import cl from "clsx";
import React, { forwardRef } from "react";
import { Link, LinkProps } from "../link";
import { OverridableComponent } from "../util/types";

export interface FormSummaryEditButtonProps extends Partial<LinkProps> {}

export const FormSummaryEditButton: OverridableComponent<
  FormSummaryEditButtonProps,
  HTMLAnchorElement
> = forwardRef(({ children = "Endre svar", className, ...rest }, ref) => (
  <Link
    {...rest}
    ref={ref}
    className={cl("form-summary__edit-button", className)}
  >
    {children}
  </Link>
));

export default FormSummaryEditButton;
// TODO Bør den hete EditLink?
