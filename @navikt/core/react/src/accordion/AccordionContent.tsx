import React, { forwardRef, useContext } from "react";
import { useThemeInternal } from "../theme/Theme";
import { BodyLong } from "../typography";
import { cl } from "../util/className";
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

    const themeContext = useThemeInternal();

    if (context === null) {
      console.error(
        "<Accordion.Content> has to be used within an <Accordion.Item>",
      );
      return null;
    }

    return (
      <BodyLong
        data-color={themeContext.color}
        {...rest}
        as="div"
        ref={ref}
        className={cl(
          "aksel-accordion__content",
          { "aksel-accordion__content--closed": !context.open },
          className,
        )}
      >
        <div className="aksel-accordion__content-inner">{children}</div>
      </BodyLong>
    );
  },
);

export default AccordionContent;
