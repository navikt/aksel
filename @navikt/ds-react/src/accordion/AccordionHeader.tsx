import { Expand, ExpandFilled } from "@navikt/ds-icons";
import cl from "classnames";
import React, { forwardRef, useContext, useEffect } from "react";
import { AccordionContext, useId } from "..";

export interface AccordionHeaderProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button content
   */
  children: React.ReactNode;
}

const AccordionHeader = forwardRef<HTMLButtonElement, AccordionHeaderProps>(
  ({ children, className, id, ...rest }, ref) => {
    const context = useContext(AccordionContext);
    const newId = useId(id);

    useEffect(() => {
      context && context.setContentId(newId);
    }, [context, newId]);

    if (context === null) {
      console.error("<Accordion.Header> has to be used within an <Accordion>");
      return null;
    }

    return (
      <button
        ref={ref}
        id={context.buttonId}
        className={cl(
          "navds-accordion__header",
          className,
          "navds-title",
          "navds-title--s"
        )}
        aria-controls={context.contentId}
        {...rest}
      >
        {children}
        <Expand
          focusable="false"
          role="img"
          className={cl(
            "navds-accordion__expand-icon",
            `navds-accordion__expand-icon--${context.expanded ? "up" : "down"}`
          )}
        />
        <ExpandFilled
          focusable="false"
          role="img"
          className={cl(
            "navds-accordion__expand-icon",
            "navds-accordion__expand-icon--filled",
            `navds-accordion__expand-icon--${context.expanded ? "up" : "down"}`
          )}
        />
      </button>
    );
  }
);

export default AccordionHeader;
