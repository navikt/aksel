import cl from "clsx";
import React, { forwardRef, useContext } from "react";
import { BodyLong } from "../typography/BodyLong";
import { ExpansionCardContext } from "./ExpansionCard";

export interface ExpansionCardContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Content inside ExpansionCard.Content
   */
  children: React.ReactNode;
}

export type ExpansionCardContentType = React.ForwardRefExoticComponent<
  ExpansionCardContentProps & React.RefAttributes<HTMLDivElement>
>;

const ExpansionCardContent: ExpansionCardContentType = forwardRef(
  ({ children, className, ...rest }, ref) => {
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
        className={cl("navds-expansioncard__content", {
          "navds-expansioncard__content--closed": !panelContext.open,
        })}
        aria-hidden={!panelContext.open}
      >
        {children}
      </BodyLong>
    );
  }
);

export default ExpansionCardContent;
