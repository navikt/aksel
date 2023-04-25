import cl from "clsx";
import React, { forwardRef, useContext } from "react";
import { Heading } from "../typography/Heading";
import { AccordionItemContext } from "./AccordionItem";
import { ChevronDownIcon } from "@navikt/aksel-icons";

export interface AccordionHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Text inside Accordion.Header
   */
  children: React.ReactNode;
}

export type AccordionHeaderType = React.ForwardRefExoticComponent<
  AccordionHeaderProps & React.RefAttributes<HTMLDivElement>
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

    return (
      <div
        ref={ref}
        {...rest}
        className={cl("navds-accordion__header", className)}
      >
        <button
          className="navds-accordion__header-button"
          onClick={() => {
            context.toggleOpen();
          }}
          type="button"
        >
          <ChevronDownIcon
            className="navds-accordion__header-chevron"
            title="Vis mer"
          />
        </button>
        {/* <Expand aria-hidden className="navds-accordion__expand-icon" /> */}
        <Heading
          size="small"
          as="span"
          className="navds-accordion__header-content"
        >
          {children}
        </Heading>
      </div>
    );
  }
);

export default AccordionHeader;
