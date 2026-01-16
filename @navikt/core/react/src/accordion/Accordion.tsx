import React, { forwardRef } from "react";
import type { AkselStatusColorRole } from "@navikt/ds-tokens/types";
import type { AkselColor } from "../types";
import { omit } from "../util";
import { cl } from "../util/className";
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
  /**
   * Overrides inherited color.
   *
   * We recommend only using `accent` and `neutral`. We have disallowed status-colors.
   * @see 🏷️ {@link AkselColor}
   * @see [📝 Documentation](https://aksel.nav.no/grunnleggende/styling/farger-tokens)
   */
  "data-color"?: Exclude<AkselColor, AkselStatusColorRole>;
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
          className={cl(
            "aksel-accordion",
            className,
            `aksel-accordion--${size}`,
            { "aksel-accordion--indent": indent },
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
