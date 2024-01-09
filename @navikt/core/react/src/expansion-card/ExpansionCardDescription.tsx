import cl from "clsx";
import React, { forwardRef, useContext } from "react";
import { BodyLong } from "../typography";
import { ExpansionCardContext } from "./context";

export interface ExpansionCardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export const ExpansionCardDescription = forwardRef<
  HTMLParagraphElement,
  ExpansionCardDescriptionProps
>(({ className, ...rest }, ref) => {
  const panelContext = useContext(ExpansionCardContext);

  if (panelContext === null) {
    console.error(
      "<ExpansionCard.Description> has to be used within an <ExpansionCard>",
    );
    return null;
  }

  return (
    <BodyLong
      {...rest}
      as="p"
      ref={ref}
      className={cl("navds-link-panel__description", className)}
      size={panelContext.size}
    />
  );
});
