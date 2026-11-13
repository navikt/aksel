import React, { type HTMLAttributes, forwardRef } from "react";
import { cl } from "../../../utils/helpers";
import {
  FormSummaryAnswer,
  type FormSummaryAnswerProps,
} from "../answer/FormSummaryAnswer";
import {
  FormSummaryAnswers,
  type FormSummaryAnswersProps,
} from "../answers/FormSummaryAnswers";
import {
  FormSummaryEditLink,
  type FormSummaryEditProps,
} from "../edit-link/FormSummaryEditLink";
import {
  FormSummaryFooter,
  type FormSummaryFooterProps,
} from "../footer/FormSummaryFooter";
import {
  FormSummaryHeader,
  type FormSummaryHeaderProps,
} from "../header/FormSummaryHeader";
import {
  FormSummaryHeading,
  type FormSummaryHeadingProps,
} from "../heading/FormSummaryHeading";
import {
  FormSummaryLabel,
  type FormSummaryLabelProps,
} from "../label/FormSummaryLabel";
import {
  FormSummaryValue,
  type FormSummaryValueProps,
} from "../value/FormSummaryValue";

interface FormSummaryProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Must include:
   *
   *  - `<FormSummary.Header>`
   *  - `<FormSummary.Answers>`
   *  - `<FormSummary.Footer>` (optional)
   */
  children: React.ReactNode;
}

const FormSummaryRoot = forwardRef<HTMLDivElement, FormSummaryProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <div ref={ref} {...rest} className={cl("aksel-form-summary", className)}>
        {children}
      </div>
    );
  },
);

/**
 * A summary of a previously answered form.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/formsummary)
 *
 * @example
 * <FormSummary>
 *   <FormSummary.Header>
 *     <FormSummary.Heading level="2">HeadingTekst</FormSummary.Heading>
 *   </FormSummary.Header>
 *   <FormSummary.Answers>
 *     <FormSummary.Answer>
 *       <FormSummary.Label>Navn</FormSummary.Label>
 *       <FormSummary.Value>Ola Nordmann</FormSummary.Value>
 *     </FormSummary.Answer>
 *   </FormSummary.Answers>
 *   <FormSummary.Footer>
 *     <FormSummary.EditLink href="#" />
 *   </FormSummary.Footer>
 * </FormSummary>
 */
const FormSummary = Object.assign(FormSummaryRoot, {
  /**
   * Must include `<FormSummary.Heading>`.
   */
  Header: FormSummaryHeader,
  /**
   * Typographic Heading to use in the `FormSummary.Header` component.
   */
  Heading: FormSummaryHeading,
  /**
   * Link to edit the answers to use in the `FormSummary.Footer` component. Should link to the relevant part of the form.
   */
  EditLink: FormSummaryEditLink,
  /**
   * Wrapper component for the answers.
   */
  Answers: FormSummaryAnswers,
  /**
   * Wrapper component for each answer. To be used in the `FormSummary.Answers` component.
   */
  Answer: FormSummaryAnswer,
  /**
   * Corresponds to the question in the form. To be used in the `FormSummary.Answer` component.
   */
  Label: FormSummaryLabel,
  /**
   * Corresponds to the answer in the form. To be used in the `FormSummary.Answer` component.
   */
  Value: FormSummaryValue,
  /**
   * Footer component for the form summary, if applicable this is a good place for `<FormSummary.EditLink>`.
   */
  Footer: FormSummaryFooter,
});

export {
  FormSummary,
  FormSummaryAnswer,
  FormSummaryAnswers,
  FormSummaryEditLink,
  FormSummaryFooter,
  FormSummaryHeader,
  FormSummaryHeading,
  FormSummaryLabel,
  FormSummaryValue,
};
export type {
  FormSummaryAnswerProps,
  FormSummaryAnswersProps,
  FormSummaryEditProps,
  FormSummaryFooterProps,
  FormSummaryHeaderProps,
  FormSummaryHeadingProps,
  FormSummaryLabelProps,
  FormSummaryProps,
  FormSummaryValueProps,
};
