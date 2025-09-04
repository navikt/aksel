import React, { forwardRef } from "react";
import { Link } from "../../link";
import { useRenameCSS } from "../../theme/Theme";
import { CompositionWarning } from "../../util/composition-warning";
import { useI18n } from "../../util/i18n/i18n.hooks";
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
  const { cn } = useRenameCSS();

  const translate = useI18n("FormSummary");

  return (
    <CompositionWarning.Forbidden
      name="FormSummary.Header"
      message="<FormSummary.EditLink> should not be placed in <FormSummary.Header>. See: https://aksel.nav.no/komponenter/core/formsummary"
    >
      <Link
        ref={ref}
        as={as}
        {...rest}
        className={cn("navds-form-summary__edit", className)}
      >
        {children || translate("editAnswer")}
      </Link>
    </CompositionWarning.Forbidden>
  );
});

export default FormSummaryEditLink;
