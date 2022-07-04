import cl from "clsx";
import React, { forwardRef, useContext } from "react";
import AnimateHeight from "react-animate-height";
import { BodyLong } from "../typography";
import { AccordionItemContext } from "./AccordionItem";

export interface AccordionContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Content inside Accordion.Content
   */
  children: React.ReactNode;
}

export type AccordionContentType = React.ForwardRefExoticComponent<
  AccordionContentProps & React.RefAttributes<HTMLDivElement>
>;

const AccordionContent: AccordionContentType = forwardRef(
  ({ children, className, ...rest }, ref) => {
    const context = useContext(AccordionItemContext);

    if (context === null) {
      console.error(
        "<Accordion.Content> has to be used within an <Accordion.Item>"
      );
      return null;
    }

    return (
      <AnimateHeight height={context.open ? "auto" : 0} duration={250}>
        <BodyLong
          {...rest}
          as="div"
          ref={ref}
          className={cl("navds-accordion__content", className)}
        >
          {children}
        </BodyLong>
      </AnimateHeight>
    );
  }
);

export default AccordionContent;
