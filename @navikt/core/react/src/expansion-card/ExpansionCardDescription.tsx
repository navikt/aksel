import React, { forwardRef } from "react";
import cl from "clsx";
import { BodyShort } from "../typography/BodyShort";

interface ExpansionCardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export type ExpansionCardDescriptionType = React.ForwardRefExoticComponent<
  ExpansionCardDescriptionProps & React.RefAttributes<HTMLParagraphElement>
>;

export const ExpansionCardDescription: ExpansionCardDescriptionType =
  forwardRef(({ className, ...rest }, ref) => (
    <BodyShort
      {...rest}
      as="p"
      ref={ref}
      className={cl("navds-link-panel__description", className)}
    />
  ));
