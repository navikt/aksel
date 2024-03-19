import React from "react";
import { Heading, HeadingProps } from "../typography";

export interface FormSummaryHeadingProps extends Omit<HeadingProps, "size"> {}

export default function FormSummaryHeading(props: FormSummaryHeadingProps) {
  return <Heading level="2" size="medium" {...props} />;
}
