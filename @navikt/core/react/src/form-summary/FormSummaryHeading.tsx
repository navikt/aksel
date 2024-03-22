import cl from "clsx";
import React from "react";
import { Heading, HeadingProps } from "../typography";

export interface FormSummaryHeadingProps extends Omit<HeadingProps, "size"> {}

export default function FormSummaryHeading(props: FormSummaryHeadingProps) {
  return (
    <Heading
      level={props.level ? props.level : "3"}
      size="medium"
      className={cl("shrink", props.className)}
      {...props}
    />
  );
}
