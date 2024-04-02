import React, { HTMLAttributes, forwardRef } from "react";
import { Box } from "../layout/box";
import FormSummaryAnswer from "./FormSummaryAnswer";
import FormSummaryAnswers from "./FormSummaryAnswers";
import FormSummaryEditButton from "./FormSummaryEditButton";
import FormSummaryHeader from "./FormSummaryHeader";
import FormSummaryHeading from "./FormSummaryHeading";
import FormSummaryLabel from "./FormSummaryLabel";
import FormSummaryValue from "./FormSummaryValue";

interface FormSummaryComponent
  extends React.ForwardRefExoticComponent<
    FormSummaryProps & React.RefAttributes<HTMLDivElement>
  > {
  /**
   * Must include:
   * - `<FormSummary.Heading>`
   * - `<FormSummary.EditButton>`
   */
  Header: typeof FormSummaryHeader;
  /**
   * Typographic Heading to use in the `FormSummary.Header` component.
   */
  Heading: typeof FormSummaryHeading;
  /**
   * ButtonLink to edit the answers to use in the `FormSummary.Header` component. Should link to the relevant part of the form.
   */
  EditButton: typeof FormSummaryEditButton;
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
   *    <FormSummary.Heading>HeadingTekst</FormSummary.Heading>
   *    <FormSummary.EditButton />
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
 * @example
 * <FormSummary>
 *   <FormSummary.Header>
 *    <FormSummary.Heading>HeadingTekst</FormSummary.Heading>
 *    <FormSummary.EditButton />
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
  ({ children, ...rest }, ref) => {
    return (
      <Box
        ref={ref}
        {...rest}
        as="section"
        borderRadius="large"
        borderColor="border-subtle"
        borderWidth="1"
      >
        {children}
      </Box>
    );
  },
) as FormSummaryComponent;

FormSummary.Header = FormSummaryHeader;
FormSummary.Heading = FormSummaryHeading;
FormSummary.EditButton = FormSummaryEditButton;
FormSummary.Answers = FormSummaryAnswers;
FormSummary.Answer = FormSummaryAnswer;
FormSummary.Label = FormSummaryLabel;
FormSummary.Value = FormSummaryValue;

export default FormSummary;
