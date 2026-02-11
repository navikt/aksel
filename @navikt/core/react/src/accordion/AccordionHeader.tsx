import React, { forwardRef, useContext } from "react";
import { ChevronDownIcon } from "@navikt/aksel-icons";
import { Heading } from "../typography";
import { cl, composeEventHandlers } from "../utils/helpers";
import { AccordionContext } from "./AccordionContext";
import { AccordionItemContext } from "./AccordionItem";

export interface AccordionHeaderProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Text inside Accordion.Header
   */
  children: React.ReactNode;
}

const AccordionHeader = forwardRef<HTMLButtonElement, AccordionHeaderProps>(
  ({ children, className, onClick, ...rest }, ref) => {
    const itemContext = useContext(AccordionItemContext);
    const accordionContext = useContext(AccordionContext);

    if (itemContext === null) {
      console.error(
        "<Accordion.Header> has to be used within an <Accordion.Item>, which in turn must be within an <Accordion>",
      );
      return null;
    }

    return (
      <button
        ref={ref}
        data-color={
          accordionContext?.variant === "neutral" ? "neutral" : undefined
        }
        {...rest}
        className={cl("aksel-accordion__header", className)}
        onClick={composeEventHandlers(onClick, itemContext.toggleOpen)}
        aria-expanded={itemContext.open}
        type="button"
      >
        <span className="aksel-accordion__icon-wrapper">
          <ChevronDownIcon
            className="aksel-accordion__header-chevron"
            aria-hidden
          />
        </span>
        <Heading
          size={accordionContext?.size === "large" ? "small" : "xsmall"}
          as="span"
        >
          {children}
        </Heading>
      </button>
    );
  },
);

export default AccordionHeader;
