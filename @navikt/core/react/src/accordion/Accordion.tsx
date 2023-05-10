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
   * @default 'default'
   */
  variant?: "default" | "neutral";
  /**
   * @default 'small'
   */
  headingSize?: "large" | "medium" | "small" | "xsmall";
  /**
   * @default "medium"
   */
  size?: "large" | "medium" | "small";
  /**
   * Instances of Accordion.Item
   */
  children: React.ReactNode;
}

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      className,
      variant = "default",
      headingSize = "small",
      size = "medium",
      ...rest
    },
    ref
  ) => {
    return (
      <AccordionContext.Provider
        value={{
          variant,
          headingSize,
          size,
        }}
      >
        <div
          {...rest}
          className={cl(
            "navds-accordion",
            className,
            `navds-accordion--${size}`
          )}
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
