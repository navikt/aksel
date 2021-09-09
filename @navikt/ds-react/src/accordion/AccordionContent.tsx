import cl from "classnames";
import React, { forwardRef, useContext } from "react";
import { Collapse, UnmountClosed } from "react-collapse";
import { useClientLayoutEffect, useId } from "../util";
import { AccordionItemContext } from "./AccordionItem";

export interface AccordionContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Accordion panel content
   */
  children: React.ReactNode;
}

export type AccordionContentType = React.ForwardRefExoticComponent<
  AccordionContentProps & React.RefAttributes<HTMLDivElement>
>;

const AccordionContent: AccordionContentType = forwardRef(
  ({ children, className, id, ...rest }, ref) => {
    const context = useContext(AccordionItemContext);

    const newId = useId(id);
    const setContentId = context && context.setContentId;

    useClientLayoutEffect(() => {
      setContentId && setContentId(id ? newId : `accordionContent-${newId}`);
    }, [setContentId, newId]);

    if (context === null) {
      console.error(
        "<Accordion.Content> has to be used within an <Accordion.Item>"
      );
      return null;
    }

    const CollapseComponent = context.renderContentWhenClosed
      ? Collapse
      : UnmountClosed;

    return (
      <div
        ref={ref}
        id={context.contentId}
        role="region"
        aria-labelledby={context.buttonId}
        {...rest}
      >
        <CollapseComponent isOpened={context.open}>
          <div className={cl("navds-accordion__content", className)}>
            {children}
          </div>
        </CollapseComponent>
      </div>
    );
  }
);

export default AccordionContent;
