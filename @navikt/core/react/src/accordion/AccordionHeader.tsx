import cl from "clsx";
import React, { forwardRef, useContext } from "react";
import { Heading } from "../typography/Heading";
import { AccordionContext } from "./AccordionContext";
import { AccordionItemContext } from "./AccordionItem";
import { ChevronDownIcon } from "@navikt/aksel-icons";

export interface AccordionHeaderProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  /**
   * Text inside Accordion.Header
   */
  children: React.ReactNode;
}

export type AccordionHeaderType = React.ForwardRefExoticComponent<
  AccordionHeaderProps & React.RefAttributes<HTMLButtonElement>
>;

const AccordionHeader: AccordionHeaderType = forwardRef(
  ({ children, className, onClick, ...rest }, ref) => {
    const itemContext = useContext(AccordionItemContext);
    const accordionContext = useContext(AccordionContext);

    if (accordionContext === null || itemContext === null) {
      console.error(
        "<Accordion.Header> has to be used within an <Accordion.Item>, which in turn must be within an <Accordion>"
      );
      return null;
    }

    return (
      <button
        ref={ref}
        {...rest}
        className={cl("navds-accordion__header", className)}
        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          itemContext.toggleOpen();
          onClick && onClick(e);
        }}
        aria-expanded={itemContext.open}
      >
        <div className="navds-accordion__icon-wrapper">
          <ChevronDownIcon
            className="navds-accordion__header-chevron"
            title="Vis mer"
          />
        </div>
        <Heading
          size={accordionContext.headingsize ?? "small"}
          as="span"
          className="navds-accordion__header-content"
        >
          {children}
        </Heading>
      </button>
    );
  }
);

export default AccordionHeader;
