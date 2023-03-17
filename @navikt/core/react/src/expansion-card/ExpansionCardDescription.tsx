import React, { forwardRef } from "react";
import cl from "clsx";
import { BodyLong } from "../typography/BodyLong";

interface ExpansionCardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export type ExpansionCardDescriptionType = React.ForwardRefExoticComponent<
  ExpansionCardDescriptionProps & React.RefAttributes<HTMLParagraphElement>
>;

export const ExpansionCardDescription: ExpansionCardDescriptionType =
  forwardRef(({ className, ...rest }, ref) => (
    <BodyLong
      {...rest}
      as="p"
      ref={ref}
      className={cl("navds-link-panel__description", className)}
    />
  ));
