import cl from "clsx";
import React, { forwardRef, useContext } from "react";
import { BodyLong } from "../typography";
import { ExpansionCardContext } from "./context";

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
      "<ExpansionCard.Content> has to be used within an <ExpansionCard>",
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
      data-open={panelContext.open}
    >
      <div className="navds-expansioncard__content-inner">{children}</div>
    </BodyLong>
  );
});

export default ExpansionCardContent;
