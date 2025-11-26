import React, { forwardRef } from "react";
import { useRenameCSS } from "../theme/Theme";
import { omit } from "../util";
import AccordionContent, { AccordionContentProps } from "./AccordionContent";
import { AccordionContext } from "./AccordionContext";
import AccordionHeader, { AccordionHeaderProps } from "./AccordionHeader";
import AccordionItem, { AccordionItemProps } from "./AccordionItem";

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
   * @deprecated Will be removed in a future major version. Use `data-color` instead.
   */
  variant?: "default" | "neutral";
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
  /**
   * @deprecated No longer has any effect.
   */
  headingSize?: "large" | "medium" | "small" | "xsmall";
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
    { className, variant = "default", size = "medium", indent = true, ...rest },
    ref,
  ) => {
    const { cn } = useRenameCSS();

    return (
      <AccordionContext.Provider
        value={{
          size,
          mounted: true,
          variant,
        }}
      >
        <div
          {...omit(rest, ["headingSize"])}
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
