import React, { forwardRef, useContext } from "react";
import { ChevronDownIcon } from "@navikt/aksel-icons";
import { useRenameCSS } from "../theme/Theme";
import { Heading } from "../typography";
import { composeEventHandlers } from "../util/composeEventHandlers";
import { AccordionContext } from "./AccordionContext";
import { AccordionItemContext } from "./AccordionItem";

export interface AccordionHeaderProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Text inside Accordion.Header
   */
  children: React.ReactNode;
}

const AccordionHeader = forwardRef<HTMLButtonElement, AccordionHeaderProps>(
  ({ children, className, onClick, ...rest }, ref) => {
    const itemContext = useContext(AccordionItemContext);
    const accordionContext = useContext(AccordionContext);

    const { cn } = useRenameCSS();

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
        className={cn("navds-accordion__header", className)}
        onClick={composeEventHandlers(onClick, itemContext.toggleOpen)}
        aria-expanded={itemContext.open}
        type="button"
      >
        <span className={cn("navds-accordion__icon-wrapper")}>
          <ChevronDownIcon
            className={cn("navds-accordion__header-chevron")}
            aria-hidden
          />
        </span>
        <Heading
          size={accordionContext?.size === "large" ? "small" : "xsmall"}
          as="span"
          className={cn("navds-accordion__header-content")}
        >
          {children}
        </Heading>
      </button>
    );
  },
);

export default AccordionHeader;
