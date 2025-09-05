import React, { HTMLAttributes, forwardRef } from "react";
import { useRenameCSS } from "../../theme/Theme";
import FormSummaryAnswer from "./FormSummaryAnswer";
import FormSummaryAnswers from "./FormSummaryAnswers";
import FormSummaryEditLink from "./FormSummaryEditLink";
import FormSummaryHeader from "./FormSummaryHeader";
import FormSummaryHeading from "./FormSummaryHeading";
import FormSummaryLabel from "./FormSummaryLabel";
import FormSummaryValue from "./FormSummaryValue";

interface FormSummaryComponent
  extends React.ForwardRefExoticComponent<
    FormSummaryProps & React.RefAttributes<HTMLDivElement>
  > {
  /**
   * @see 🏷️ {@link FormSummaryProps}
   */
  Root: React.ForwardRefExoticComponent<
    FormSummaryProps & React.RefAttributes<HTMLDivElement>
  >;
  /**
   * Must include `<FormSummary.Heading>` and optionally `<FormSummary.EditLink>`.
   */
  Header: typeof FormSummaryHeader;
  /**
   * Typographic Heading to use in the `FormSummary.Header` component.
   */
  Heading: typeof FormSummaryHeading;
  /**
   * Link to edit the answers to use in the `FormSummary.Header` component. Should link to the relevant part of the form.
   */
  EditLink: typeof FormSummaryEditLink;
  /**
   * Wrapper component for the answers.
   */
  Answers: typeof FormSummaryAnswers;
  /**
   * Wrapper component for each answer. To be used in the `FormSummary.Answers` component.
   */
  Answer: typeof FormSummaryAnswer;
  /**
   * Corresponds to the question in the form. To be used in the `FormSummary.Answer` component.
   */
  Label: typeof FormSummaryLabel;
  /**
   * Corresponds to the answer in the form. To be used in the `FormSummary.Answer` component.
   */
  Value: typeof FormSummaryValue;
}

export interface FormSummaryProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Must include:
   *
   *  - `<FormSummary.Header>`
   *  - `<FormSummary.Answers>`
   *
   * @example
   * <FormSummary>
   *   <FormSummary.Header>
   *     <FormSummary.Heading level="2">HeadingTekst</FormSummary.Heading>
   *     <FormSummary.EditLink href="#" />
   *   </FormSummary.Header>
   *   <FormSummary.Answers>
   *     <FormSummary.Answer>
   *       <FormSummary.Label>Navn</FormSummary.Label>
   *       <FormSummary.Value>Ola Nordmann</FormSummary.Value>
   *     </FormSummary.Answer>
   *   </FormSummary.Answers>
   * </FormSummary>
   */
  children: React.ReactNode;
}

/**
 * A summary of a previously answered form.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/formsummary)
 *
 * @example
 * <FormSummary>
 *   <FormSummary.Header>
 *     <FormSummary.Heading level="2">HeadingTekst</FormSummary.Heading>
 *     <FormSummary.EditLink href="#" />
 *   </FormSummary.Header>
 *   <FormSummary.Answers>
 *     <FormSummary.Answer>
 *       <FormSummary.Label>Navn</FormSummary.Label>
 *       <FormSummary.Value>Ola Nordmann</FormSummary.Value>
 *     </FormSummary.Answer>
 *   </FormSummary.Answers>
 * </FormSummary>
 */
export const FormSummary = forwardRef<HTMLDivElement, FormSummaryProps>(
  ({ children, className, ...rest }, ref) => {
    const { cn } = useRenameCSS();

    return (
      <div ref={ref} {...rest} className={cn("navds-form-summary", className)}>
        {children}
      </div>
    );
  },
) as FormSummaryComponent;

FormSummary.Root = FormSummary;
FormSummary.Header = FormSummaryHeader;
FormSummary.Heading = FormSummaryHeading;
FormSummary.EditLink = FormSummaryEditLink;
FormSummary.Answers = FormSummaryAnswers;
FormSummary.Answer = FormSummaryAnswer;
FormSummary.Label = FormSummaryLabel;
FormSummary.Value = FormSummaryValue;

export default FormSummary;
