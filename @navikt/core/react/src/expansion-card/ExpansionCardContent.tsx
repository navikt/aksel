import cl from "clsx";
import React, { forwardRef, useContext } from "react";
import { BodyLong } from "../typography/BodyLong";
import { ExpansionCardContext } from "./ExpansionCard";

export interface ExpansionCardContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ExpansionCardContent = forwardRef<
  HTMLDivElement,
  ExpansionCardContentProps
>(({ children, className, ...rest }, ref) => {
  const panelContext = useContext(ExpansionCardContext);

  if (panelContext === null) {
    console.error(
      "<ExpansionCard.Content> has to be used within an <ExpansionCard>"
    );
    return null;
  }

  return (
    <BodyLong
      {...rest}
      ref={ref}
      as="div"
      className={cl("navds-expansioncard__content", className, {
        "navds-expansioncard__content--closed": !panelContext.open,
      })}
      aria-hidden={!panelContext.open}
      size={panelContext.size}
    >
      <div className="navds-expansioncard__content-inner">{children}</div>
    </BodyLong>
  );
});

export default ExpansionCardContent;
