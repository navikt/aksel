import React, { forwardRef } from "react";
import { Heading, HeadingProps } from "../../typography";

export interface FormSummaryHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * Heading text.
   */
  children: React.ReactNode;
  /**
   * The heading level.
   */
  level: Exclude<HeadingProps["level"], "1">;
}

export const FormSummaryHeading = forwardRef<
  HTMLHeadingElement,
  FormSummaryHeadingProps
>((props: FormSummaryHeadingProps, ref) => (
  <Heading ref={ref} {...props} size="medium" />
));

export default FormSummaryHeading;
