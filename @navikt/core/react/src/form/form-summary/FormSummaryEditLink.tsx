import cl from "clsx";
import React, { forwardRef } from "react";
import { Link } from "../../link";
import { useI18n } from "../../util/i18n/i18n.context";
import { OverridableComponent } from "../../util/types";

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
> = forwardRef(({ children, className, as = "a", ...rest }, ref) => {
  const translate = useI18n("FormSummary");
  return (
    <Link
      ref={ref}
      as={as}
      {...rest}
      className={cl("navds-form-summary__edit", className)}
    >
      {children || translate("editAnswer")}
    </Link>
  );
});

export default FormSummaryEditLink;
