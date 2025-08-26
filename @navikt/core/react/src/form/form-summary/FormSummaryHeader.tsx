import React, { forwardRef } from "react";
import { useRenameCSS } from "../../theme/Theme";
import { useWarnIfContainsAny } from "../../util/usageWarnings";
import FormSummaryAnswers from "./FormSummaryAnswers";
import FormSummaryEditLink from "./FormSummaryEditLink";

export interface FormSummaryHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Must include `<FormSummary.Heading>`.
   */
  children: React.ReactNode;
}

/**
 * Header slot in `FormSummary`.
 *
 * Should contain only `<FormSummary.Heading>`.
 *
 * ❌ Do not place `<FormSummary.EditLink>` here — it belongs in `<FormSummary.Footer>`.
 * ❌ Do not place `<FormSummary.Answers>` here - it belongs under <FormSummary>.
 *
 * ✔ See documentation: https://aksel.nav.no/komponenter/core/formsummary
 *
 * @example
 * <FormSummary.Header>
 *   <FormSummary.Heading level="2">Personal information</FormSummary.Heading>
 * </FormSummary.Header>
 */
export const FormSummaryHeader = forwardRef<
  HTMLDivElement,
  FormSummaryHeaderProps
>(({ children, className, ...rest }, ref) => {
  const { cn } = useRenameCSS();

  const rules = [
    {
      type: FormSummaryEditLink,
      message:
        "<FormSummary.EditLink> should be placed inside <FormSummary.Footer>, not inside <FormSummary.Header>. See: https://aksel.nav.no/komponenter/core/formsummary",
      severity: "warn",
      key: "formsummary-editlink-in-header",
    },
    {
      type: FormSummaryAnswers,
      message:
        "<FormSummary.Answers> should not be placed inside <FormSummary.Header>. See: https://aksel.nav.no/komponenter/core/formsummary",
      severity: "error",
      key: "formsummary-answers-in-header",
    },
  ] as const;
  useWarnIfContainsAny(children, rules);

  return (
    <header
      ref={ref}
      {...rest}
      className={cn("navds-form-summary__header", className)}
    >
      {children}
    </header>
  );
});

export default FormSummaryHeader;
