import cl from "clsx";
import React, { forwardRef, useContext } from "react";
import AnimateHeight from "../util/AnimateHeight";
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
      <AnimateHeight
        height={panelContext.open ? "auto" : 0}
        duration={200}
        easing="linear"
      >
        <BodyLong
          {...rest}
          as="div"
          ref={ref}
          className={cl("navds-expansioncard__content", className)}
        >
          {children}
        </BodyLong>
      </AnimateHeight>
    );
  }
);

export default ExpansionCardContent;
