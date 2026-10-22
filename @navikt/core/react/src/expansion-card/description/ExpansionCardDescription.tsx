import React, { forwardRef, useContext } from "react";
import { BodyLong } from "../../typography";
import { cl } from "../../utils/helpers";
import { ExpansionCardContext } from "../root/ExpansionCardRoot.context";

interface ExpansionCardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

const ExpansionCardDescription = forwardRef<
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
      className={cl("aksel-link-panel__description", className)}
      size={panelContext.size}
    />
  );
});

export { ExpansionCardDescription };
export type { ExpansionCardDescriptionProps };
