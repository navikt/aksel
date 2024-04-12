import cl from "clsx";
import React, { forwardRef } from "react";
import { Link } from "../../link";
import { OverridableComponent } from "../../util/types";

// export type FormSummaryEditProps = Partial<LinkProps>;
export interface FormSummaryEditProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * URL to the relevant part of the form, where the answers can be edited.
   */
  href?: string;
  /**
   * Link text.
   *
   * [How to write good links](https://aksel.nav.no/god-praksis/artikler/lenker).
   * @default "Endre svar"
   */
  children?: React.ReactNode;
}

export const FormSummaryEditLink: OverridableComponent<
  FormSummaryEditProps,
  HTMLAnchorElement
> = forwardRef(({ children = "Endre svar", className, ...rest }, ref) => (
  <Link
    ref={ref}
    {...rest}
    className={cl("navds-form-summary__edit", className)}
  >
    {children}
  </Link>
));

export default FormSummaryEditLink;
