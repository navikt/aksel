import cl from "clsx";
import React, { forwardRef, useContext } from "react";
import { UNSAFE_useAkselTheme } from "../provider";
import { BodyLong } from "../typography";
import { AccordionItemContext } from "./AccordionItem";

export interface AccordionContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Content inside Accordion.Content
   */
  children: React.ReactNode;
}

const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ children, className, ...rest }, ref) => {
    const context = useContext(AccordionItemContext);

    const themeContext = UNSAFE_useAkselTheme(false);

    if (context === null) {
      console.error(
        "<Accordion.Content> has to be used within an <Accordion.Item>",
      );
      return null;
    }

    return (
      <BodyLong
        {...rest}
        as="div"
        ref={ref}
        className={cl(
          "navds-accordion__content",
          {
            "navds-accordion__content--closed": !context.open,
          },
          className,
        )}
        aria-hidden={
          !context.open || undefined
        } /* Added to fix bug with Radio component, where label text inside a span sometimes is ignored by screen readers after hiding/displaying the RadioGroup inside an Accordion */
      >
        {themeContext ? (
          <div className="navds-accordion__content-inner">{children}</div>
        ) : (
          children
        )}
      </BodyLong>
    );
  },
);

export default AccordionContent;
