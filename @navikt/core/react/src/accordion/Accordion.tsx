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
   * @default "medium"
   */
  size?: "large" | "medium" | "small";
  /**
   * A list of indices for which items in the accordion should be
   * open as the initial state (state is set without user intent).
   * @default []
   */
  openitems?: number[];
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
      headingsize = "medium",
      size = "medium",
      openitems = [],
      ...rest
    },
    ref
  ) => {
    return (
      <AccordionContext.Provider
        value={{
          variant,
          headingsize,
          size,
          openitems,
        }}
      >
        <section
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
