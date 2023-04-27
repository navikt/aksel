import cl from "clsx";
import React, { forwardRef } from "react";
import AccordionItem, { AccordionItemType } from "./AccordionItem";
import AccordionContent, { AccordionContentType } from "./AccordionContent";
import AccordionHeader, { AccordionHeaderType } from "./AccordionHeader";
import { AccordionContext } from "./AccordionContext";

interface AccordionComponent
  extends React.ForwardRefExoticComponent<
    AccordionProps & React.RefAttributes<HTMLDivElement>
  > {
  Item: AccordionItemType;
  Header: AccordionHeaderType;
  Content: AccordionContentType;
}

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * @default 'primary'
   */
  variant?: "default" | "neutral";
  /**
   * @default 'large'
   */
  headingsize?: "large" | "medium" | "small" | "xsmall";
  /**
   * Instances of Accordion.Item
   */
  children: React.ReactNode;
}

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  ({ className, variant, headingsize, ...rest }, ref) => {
    return (
      <AccordionContext.Provider
        value={{
          variant,
          headingsize,
        }}
      >
        <section
          {...rest}
          className={cl("navds-accordion", className)}
          ref={ref}
        />
      </AccordionContext.Provider>
    );
  }
) as AccordionComponent;

Accordion.Header = AccordionHeader;
Accordion.Content = AccordionContent;
Accordion.Item = AccordionItem;

export default Accordion;
