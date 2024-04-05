import cl from "clsx";
import React, { forwardRef } from "react";
import { Link, LinkProps } from "../link";
import { OverridableComponent } from "../util/types";

export type FormSummaryEditProps = Partial<LinkProps>;

export const FormSummaryEdit: OverridableComponent<
  FormSummaryEditProps,
  HTMLAnchorElement
> = forwardRef(({ children = "Endre svar", className, ...rest }, ref) => (
  <Link
    {...rest}
    ref={ref}
    className={cl("navds-form-summary__edit", className)}
  >
    {children}
  </Link>
));

export default FormSummaryEdit;
