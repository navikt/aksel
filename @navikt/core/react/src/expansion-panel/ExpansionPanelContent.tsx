import cl from "clsx";
import React, { forwardRef, useContext } from "react";
import AnimateHeight from "../util/AnimateHeight";
import { BodyLong } from "../typography/BodyLong";
import { ExpansionPanelContext } from "./ExpansionPanel";

export interface ExpansionPanelContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Content inside ExpansionPanel.Content
   */
  children: React.ReactNode;
}

export type ExpansionPanelContentType = React.ForwardRefExoticComponent<
  ExpansionPanelContentProps & React.RefAttributes<HTMLDivElement>
>;

const ExpansionPanelContent: ExpansionPanelContentType = forwardRef(
  ({ children, className, ...rest }, ref) => {
    const panelContext = useContext(ExpansionPanelContext);

    if (panelContext === null) {
      console.error(
        "<ExpansionPanel.Content> has to be used within an <ExpansionPanel>"
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
          className={cl("navds-expansionpanel__content", className)}
        >
          {children}
        </BodyLong>
      </AnimateHeight>
    );
  }
);

export default ExpansionPanelContent;
