import { Expand, ExpandFilled } from "@navikt/ds-icons";
import cl from "classnames";
import React, { forwardRef, useContext } from "react";
import { AccordionItemContext } from "./AccordionItem";
import { useClientLayoutEffect, useId } from "..";

export interface AccordionHeaderProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Accordion button content
   */
  children: React.ReactNode;
}

export type AccordionHeaderType = React.ForwardRefExoticComponent<
  AccordionHeaderProps & React.RefAttributes<HTMLButtonElement>
>;

const AccordionHeader: AccordionHeaderType = forwardRef(
  ({ children, className, id, onClick, ...rest }, ref) => {
    const context = useContext(AccordionItemContext);
    const newId = useId(id);

    const setButtonId = context && context.setButtonId;

    useClientLayoutEffect(() => {
      setButtonId && setButtonId(id ? newId : `accordionContent-${newId}`);
    }, [setButtonId, newId]);

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
        id={context.buttonId}
        className={cl(
          "navds-accordion__header",
          className,
          "navds-heading",
          "navds-heading--small"
        )}
        onClick={handleClick}
        aria-expanded={context.open}
      >
        {children}
        <Expand
          aria-hidden
          className={cl("navds-accordion__expand-icon", {
            "navds-accordion__expand-icon--flip": context.open,
          })}
        />
        <ExpandFilled
          aria-hidden
          className={cl(
            "navds-accordion__expand-icon",
            "navds-accordion__expand-icon--filled",
            {
              "navds-accordion__expand-icon--flip": context.open,
            }
          )}
        />
      </button>
    );
  }
);

export default AccordionHeader;
