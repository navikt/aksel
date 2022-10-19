import { Expand } from "@navikt/ds-icons";
import cl from "clsx";
import React, { forwardRef, useContext } from "react";
import { Heading } from "..";
import { AccordionItemContext } from "./AccordionItem";

export interface AccordionHeaderProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
    const context = useContext(AccordionItemContext);

    if (context === null) {
      console.error(
        "<Accordion.Header> has to be used within an <Accordion.Item>"
      );
      return null;
    }

    const handleClick = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      context.toggleOpen();
      onClick && onClick(e);
    };

    return (
      <button
        {...rest}
        ref={ref}
        className={cl("navds-accordion__header", className)}
        type="button"
        onClick={handleClick}
        aria-expanded={context.open}
      >
        <Heading
          size="small"
          as="span"
          className="navds-accordion__header-content"
        >
          {children}
        </Heading>
        <Expand aria-hidden className="navds-accordion__expand-icon" />
      </button>
    );
  }
);

export default AccordionHeader;
