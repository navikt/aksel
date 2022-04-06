import cl from "classnames";
import React, { forwardRef } from "react";
import AccordionItem, { AccordionItemType } from "./AccordionItem";
import AccordionContent, { AccordionContentType } from "./AccordionContent";
import AccordionHeader, { AccordionHeaderType } from "./AccordionHeader";

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
   * Content inside accordion
   */
  children: React.ReactNode;
}

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  ({ className, ...rest }: AccordionProps, ref) => (
    <div {...rest} className={cl("navds-accordion", className)} ref={ref} />
  )
);

const AccordionComp = Accordion as AccordionComponent;

AccordionComp.Header = AccordionHeader;
AccordionComp.Content = AccordionContent;
AccordionComp.Item = AccordionItem;

export default AccordionComp;
