import React, { forwardRef, useEffect } from "react";
import { useContext } from "react";
import { Collapse, UnmountClosed } from "react-collapse";
import { useId } from "../util";
import { AccordionContext } from "./Accordion";

export interface AccordionContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Button content
   */
  children: React.ReactNode;
}

const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ children, className, id, ...rest }, ref) => {
    const context = useContext(AccordionContext);

    const newId = useId(id);

    useEffect(() => {
      context && context.setContentId(newId);
    }, [context, newId]);

    if (context === null) {
      console.error("<Accordion.Content> has to be used within an <Accordion>");
      return null;
    }

    const CollapseComponent = context.renderContentWhenClosed
      ? Collapse
      : UnmountClosed;

    return (
      <div
        id={context.contentId}
        role="region"
        aria-labelledby={context.buttonId}
      >
        <CollapseComponent isOpened={context.expanded}>
          <div className="navds-accordion__content">{children}</div>
        </CollapseComponent>
      </div>
    );
  }
);

export default AccordionContent;
