import cl from "clsx";
import React, { forwardRef, useContext } from "react";
import { BodyLong } from "../typography/BodyLong";
import { AccordionItemContext } from "./AccordionItem";

export interface AccordionContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Content inside Accordion.Content
   */
  children: React.ReactNode;
}

const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ children, className, ...rest }, ref) => {
    const context = useContext(AccordionItemContext);

    if (context === null) {
      console.error(
        "<Accordion.Content> has to be used within an <Accordion.Item>"
      );
      return null;
    }

    return (
      <BodyLong
        {...rest}
        as="div"
        ref={ref}
        className={cl(
          "navds-accordion__content",
          {
            "navds-accordion__content--closed": !context.open,
          },
          className
        )}
      >
        {children}
      </BodyLong>
    );
  }
);

export default AccordionContent;
