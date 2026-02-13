import React, { forwardRef, useEffect, useRef } from "react";
import type { AkselStatusColorRole } from "@navikt/ds-tokens/types";
import type { AkselColor } from "../types";
import { omit } from "../utils-external";
import { cl } from "../utils/helpers";
import { consoleWarning } from "../utils/helpers/consoleWarning";
import { useMergeRefs } from "../utils/hooks";
import AccordionContent, { AccordionContentProps } from "./AccordionContent";
import { AccordionContext } from "./AccordionContext";
import AccordionHeader, { AccordionHeaderProps } from "./AccordionHeader";
import AccordionItem, { AccordionItemProps } from "./AccordionItem";

interface AccordionComponent extends React.ForwardRefExoticComponent<
  AccordionProps & React.RefAttributes<HTMLDivElement>
> {
  /**
   * @see 🏷️ {@link AccordionItemProps}
   */
  Item: typeof AccordionItem;
  /**
   * @see 🏷️ {@link AccordionHeaderProps}
   */
  Header: typeof AccordionHeader;
  /**
   * @see 🏷️ {@link AccordionContentProps}
   */
  Content: typeof AccordionContent;
}

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
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
  /**
   * Changes the HTML element used for the root element.
   *
   * **When using `section`, provide either `aria-label` or `aria-labelledby` for better accessibility.**
   * `axe-core` might warn about unique landmarks if you have multiple Accordions on page with the same label.
   * In those cases consider updating to unique `aria-label` or `aria-labelledby` props.
   * @see [📝 Landmarks unique](https://dequeuniversity.com/rules/axe/4.6/landmark-unique)
   * @default "div"
   */
  as?: "div" | "section";
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
      size = "medium",
      indent = true,
      as: Component = "div",
      ...rest
    },
    ref,
  ) => {
    const localRef = useRef<HTMLDivElement | null>(null);
    const mergedRef = useMergeRefs(localRef, ref);

    useEffect(() => {
      if (process.env.NODE_ENV === "production" || !localRef.current) {
        return;
      }
      if (
        localRef.current.nextElementSibling?.classList.contains(
          "aksel-accordion",
        )
      ) {
        consoleWarning(
          "Do not put multiple accordions directly after each other. Use one <Accordion> with multiple <Accordion.Item> instead.",
          localRef.current,
        );
      }
      if (localRef.current.children.length === 1) {
        consoleWarning(
          "Accordions should have more than one item. Consider using ExpansionPanel instead.",
          localRef.current,
        );
      }
    }, []);

    return (
      <AccordionContext.Provider
        value={{
          size,
          mounted: true,
          variant,
        }}
      >
        <Component
          {...omit(rest, ["headingSize"])}
          className={cl(
            "aksel-accordion",
            className,
            `aksel-accordion--${size}`,
            { "aksel-accordion--indent": indent },
          )}
          ref={mergedRef}
        />
      </AccordionContext.Provider>
    );
  },
) as AccordionComponent;

Accordion.Header = AccordionHeader;
Accordion.Content = AccordionContent;
Accordion.Item = AccordionItem;

export default Accordion;
export { AccordionItem, AccordionHeader, AccordionContent };
export type {
  AccordionProps,
  AccordionItemProps,
  AccordionHeaderProps,
  AccordionContentProps,
};
