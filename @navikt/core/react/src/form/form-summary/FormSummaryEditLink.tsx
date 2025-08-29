import React, { forwardRef } from "react";
import { Link } from "../../link";
import { useRenameCSS } from "../../theme/Theme";
import { useI18n } from "../../util/i18n/i18n.hooks";
import { useForbidSlot } from "../../util/slotWarningProvider";
import { OverridableComponent } from "../../util/types";

/**
 * Edit link for `FormSummary`. Not for use in `<FormSummary.Header>`.
 */
export interface FormSummaryEditProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  children?: React.ReactNode;
}

export const FormSummaryEditLink: OverridableComponent<
  FormSummaryEditProps,
  HTMLAnchorElement
> = forwardRef(({ children, className, as = "a", ...rest }, ref) => {
  const { cn } = useRenameCSS();
  const translate = useI18n("FormSummary");

  useForbidSlot(
    ["FormSummary.Header"],
    "<FormSummary.EditLink> should NOT be placed inside <FormSummary.Header>. See: https://aksel.nav.no/komponenter/core/formsummary",
    "warn",
    "editlink-in-header",
  );

  return (
    <Link
      ref={ref}
      as={as}
      {...rest}
      className={cn("navds-form-summary__edit", className)}
    >
      {children || translate("editAnswer")}
    </Link>
  );
});

export default FormSummaryEditLink;
