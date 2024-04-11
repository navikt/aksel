import React, { forwardRef } from "react";
import { Heading, HeadingProps } from "../../typography";
import { OverridableComponent } from "../../util/types";

export interface FormSummaryHeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * Heading text.
   */
  children: React.ReactNode;
  /**
   * The heading level.
   *
   * @default "3"
   */
  level?: Exclude<HeadingProps["level"], "1">;
}

export const FormSummaryHeading: OverridableComponent<
  FormSummaryHeadingProps,
  HTMLHeadingElement
> = forwardRef(({ level = "3", ...rest }, ref) => (
  <Heading ref={ref} {...rest} size="medium" level={level} />
));

export default FormSummaryHeading;
