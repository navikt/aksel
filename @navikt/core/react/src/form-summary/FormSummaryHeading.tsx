import React, { forwardRef } from "react";
import { Heading, HeadingProps } from "../typography";
import { OverridableComponent } from "../util/types";

export interface FormSummaryHeadingProps extends Omit<HeadingProps, "size"> {}

export const FormSummaryHeading: OverridableComponent<
  FormSummaryHeadingProps,
  HTMLHeadingElement
> = forwardRef((props, ref) => (
  <Heading ref={ref} size="medium" level="3" {...props} />
));

export default FormSummaryHeading;
