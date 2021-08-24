import { Expand, ExpandFilled } from "@navikt/ds-icons";
import cl from "classnames";
import React, { forwardRef, useContext } from "react";
import { AccordionContext, useClientLayoutEffect, useId } from "..";

export interface AccordionHeaderProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button content
   */
  children: React.ReactNode;
}

export type AccordionHeaderType = React.ForwardRefExoticComponent<
  AccordionHeaderProps & React.RefAttributes<HTMLButtonElement>
>;

const AccordionHeader: AccordionHeaderType = forwardRef(
  ({ children, className, id, onClick, ...rest }, ref) => {
    const context = useContext(AccordionContext);
    const newId = useId(id);

    const setButtonId = context && context.setButtonId;

    useClientLayoutEffect(() => {
      setButtonId && setButtonId(id ? newId : `accordionContent-${newId}`);
    }, [setButtonId, newId]);

    if (context === null) {
      console.error("<Accordion.Header> has to be used within an <Accordion>");
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
        ref={ref}
        id={context.buttonId}
        className={cl(
          "navds-accordion__header",
          className,
          "navds-title",
          "navds-title--s"
        )}
        onClick={handleClick}
        aria-controls={context.contentId}
        {...rest}
      >
        {children}
        <Expand
          focusable="false"
          role="img"
          className={cl(
            "navds-accordion__expand-icon",
            `navds-accordion__expand-icon--down${context.open}`
          )}
        />
        <ExpandFilled
          focusable="false"
          role="img"
          className={cl(
            "navds-accordion__expand-icon",
            "navds-accordion__expand-icon--filled",
            `navds-accordion__expand-icon--${context.open ? "up" : "down"}`
          )}
        />
      </button>
    );
  }
);

export default AccordionHeader;
