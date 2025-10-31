import React, { forwardRef } from "react";
import { useRenameCSS } from "../theme/Theme";
import AccordionContent, { AccordionContentProps } from "./AccordionContent";
import { AccordionContext } from "./AccordionContext";
import AccordionHeader, { AccordionHeaderProps } from "./AccordionHeader";
import AccordionItem, { AccordionItemProps } from "./AccordionItem";

let hasWarnedAboutItems = false;

function checkAccordionItems() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useEffect(() => {
    document.querySelectorAll(".aksel-accordion").forEach((accordion) => {
      if (hasWarnedAboutItems || accordion.children.length !== 1) {
        return;
      }
      if (accordion.nextElementSibling?.classList.contains("aksel-accordion")) {
        console.warn(
          "[Aksel] Do not put multiple accordions directly after each other. Use one <Accordion> with multiple <Accordion.Item> instead.",
        );
      } else {
        console.warn(
          "[Aksel] Accordions should have more than one item. Consider using ExpansionPanel instead.",
        );
      }
      hasWarnedAboutItems = true;
    });
  }, []);
}

interface AccordionComponent
  extends React.ForwardRefExoticComponent<
    AccordionProps & React.RefAttributes<HTMLDivElement>
  > {
  /**
   * @see 🏷️ {@link AccordionItemProps}
   */
  Item: React.ForwardRefExoticComponent<
    AccordionItemProps & React.RefAttributes<HTMLDivElement>
  >;
  /**
   * @see 🏷️ {@link AccordionHeaderProps}
   */
  Header: React.ForwardRefExoticComponent<
    AccordionHeaderProps & React.RefAttributes<HTMLButtonElement>
  >;
  /**
   * @see 🏷️ {@link AccordionContentProps}
   */
  Content: React.ForwardRefExoticComponent<
    AccordionContentProps & React.RefAttributes<HTMLDivElement>
  >;
}

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * @deprecated "default" will be the only variant.
   * @default "default"
   */
  variant?: "default" | "neutral";
  /**
   * @default "small"
   * @deprecated `size`-prop will be the only prop to control the size of the accordion.
   */
  headingSize?: "large" | "medium" | "small" | "xsmall";
  /**
   * @default "medium"
   */
  size?: "large" | "medium" | "small";
  /**
   * Whether to indent content or not.
   * @default true
   */
  indent?: boolean;
  /**
   * Instances of `Accordion.Item`.
   */
  children: React.ReactNode;
}

/**
 * A component that displays collapsible content sections.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/accordion)
 * @see 🏷️ {@link AccordionProps}
 *
 * @example
 * ```jsx
 * <Accordion>
 *   <Accordion.Item>
 *     <Accordion.Header>Section 1</Accordion.Header>
 *     <Accordion.Content>Content 1</Accordion.Content>
 *   </Accordion.Item>
 *   <Accordion.Item>
 *     <Accordion.Header>Section 2</Accordion.Header>
 *     <Accordion.Content>Content 2</Accordion.Content>
 *   </Accordion.Item>
 * </Accordion>
 * ```
 */
export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      className,
      variant = "default",
      headingSize = "small",
      size = "medium",
      indent = true,
      ...rest
    },
    ref,
  ) => {
    const { cn } = useRenameCSS();

    if (process.env.NODE_ENV !== "production") {
      checkAccordionItems();
    }

    return (
      <AccordionContext.Provider
        value={{
          variant,
          headingSize,
          size,
          mounted: true,
        }}
      >
        <div
          {...rest}
          className={cn(
            "navds-accordion",
            className,
            `navds-accordion--${size}`,
            { "navds-accordion--indent": indent },
          )}
          ref={ref}
        />
      </AccordionContext.Provider>
    );
  },
) as AccordionComponent;

Accordion.Header = AccordionHeader;
Accordion.Content = AccordionContent;
Accordion.Item = AccordionItem;

export default Accordion;
