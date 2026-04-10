import React, { forwardRef, useContext } from "react";
import { useThemeInternal } from "../theme/Theme";
import { BodyLong } from "../typography";
import { cl } from "../utils/helpers";
import { AccordionItemContext } from "./AccordionItem";

export interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
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
        {...rest}
        as="div"
        ref={ref}
        className={cl(
          "aksel-accordion__content",
          { "aksel-accordion__content--closed": !context.open },
          className,
        )}
      >
        <div
          className="aksel-accordion__content-inner"
          data-color={themeContext.color}
        >
          {children}
        </div>
      </BodyLong>
    );
  },
);

export default AccordionContent;
