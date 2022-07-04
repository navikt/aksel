import cl from "classnames";
import React, { forwardRef, useContext } from "react";
import { Collapse, UnmountClosed } from "react-collapse";
import { BodyLong } from "../typography";
import { AccordionItemContext } from "./AccordionItem";

export interface AccordionContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Content inside Accordion.Content
   * If renderContentWhenClosed is false in Accordion.Item,
   * this will be removed from dom when Accordion is closed
   */
  children: React.ReactNode;
}

export type AccordionContentType = React.ForwardRefExoticComponent<
  AccordionContentProps & React.RefAttributes<HTMLDivElement>
>;

const AccordionContent: AccordionContentType = forwardRef(
  ({ children, className, id, ...rest }, ref) => {
    const context = useContext(AccordionItemContext);

    if (context === null) {
      console.error(
        "<Accordion.Content> has to be used within an <Accordion.Item>"
      );
      return null;
    }

    const CollapseComponent = context.renderContentWhenClosed
      ? Collapse
      : UnmountClosed;

    return (
      <div ref={ref} aria-labelledby={context.buttonId} {...rest}>
        <CollapseComponent isOpened={context.open}>
          <BodyLong
            as="div"
            className={cl("navds-accordion__content", className)}
          >
            {children}
          </BodyLong>
        </CollapseComponent>
      </div>
    );
  }
);

export default AccordionContent;
