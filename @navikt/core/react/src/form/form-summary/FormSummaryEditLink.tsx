import React, { forwardRef } from "react";
import { PencilIcon } from "@navikt/aksel-icons";
import { Link } from "../../link";
import { cl } from "../../util/className";
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
  const translate = useI18n("FormSummary");

  return (
    <CompositionWarning.Forbidden
      name="FormSummary.Header"
      message="<FormSummary.EditLink> should not be placed in <FormSummary.Header> anymore. See https://aksel.nav.no/komponenter/core/formsummary"
    >
      <Link
        ref={ref}
        as={as}
        {...rest}
        className={cl("aksel-form-summary__edit", className)}
      >
        <PencilIcon aria-hidden fontSize="1.5rem" />
        {children || translate("editAnswer")}
      </Link>
    </CompositionWarning.Forbidden>
  );
});

export default FormSummaryEditLink;
