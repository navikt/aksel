import React, { forwardRef, useState } from "react";
import cl from "clsx";
import { ChevronDownIcon, ChevronUpIcon } from "@navikt/aksel-icons";
import { Button, Heading, HeadingProps, useId } from "..";

interface ShowMoreBaseProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onClick"> {
  /**
   * Override what element to render the wrapper as.
   * @default aside
   */
  as?: "aside" | "section";
  /** Content */
  children: React.ReactNode;
  /**
   * Changes button size
   * @default medium
   */
  size?: "medium" | "small";
  /**
   * Changes background color. Variant 'inline' is transparent and has no padding.
   * @default inline
   */
  variant?: "inline" | "default" | "subtle" | "info";
  /**
   * Custom height of content when collapsed.
   * @default 11.5rem if heading is used, otherwise 13.5rem
   */
  collapsedHeight?: `${number}${string}` | number;
  /** Label for the content */
  "aria-label"?: string;
  /** ID of an element that labels the content */
  "aria-labelledby"?: string;
  /**
   * Heading text. Will always be available to screen readers, and will be
   * used as accessible label unless `aria-label` or `aria-labelledby` is used.
   */
  heading?: string;
  /**
   * Heading size
   * @default medium
   */
  headingSize?: HeadingProps["size"];
  /** Heading level */
  headingLevel?: HeadingProps["level"];
}

export type ShowMoreProps = ShowMoreBaseProps &
  (
    | { "aria-label": string }
    | { "aria-labelledby": string }
    | { heading: string }
  );

/**
 * A component for partially hiding less important content.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/show-more)
 * @see 🏷️ {@link ShowMoreProps}
 *
 * @example
 * <ShowMore aria-label="Facts about toads">
 *   Toads have dry, leathery skin, short legs, and large bumps covering the parotoid glands.
 * </ShowMore>
 */
export const ShowMore = forwardRef<HTMLElement, ShowMoreProps>(
  (
    {
      as: Component = "aside",
      children,
      size = "medium",
      variant = "inline",
      collapsedHeight,
      className,
      "aria-labelledby": ariaLabelledby,
      heading,
      headingSize = "medium",
      headingLevel,
      ...rest
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const ariaLabelId = useId();

    const ChevronIcon = isOpen ? ChevronUpIcon : ChevronDownIcon;

    return (
      <Component
        ref={ref}
        className={cl(
          "navds-show-more",
          `navds-show-more--${variant}`,
          className,
          {
            "navds-show-more--closed": !isOpen,
            "navds-show-more--has-heading": heading,
          }
        )}
        aria-labelledby={
          !ariaLabelledby && !rest["aria-label"] && heading
            ? ariaLabelId
            : ariaLabelledby
        }
        {...rest}
      >
        {heading && (
          <Heading size={headingSize} level={headingLevel} id={ariaLabelId}>
            {heading}
          </Heading>
        )}

        <div className="navds-show-more__button-section">
          <div className="navds-show-more__button-wrapper">
            <Button
              type="button"
              variant="secondary-neutral"
              className="navds-show-more__button"
              icon={<ChevronIcon aria-hidden />}
              iconPosition="right"
              size={size}
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
            >
              {isOpen ? "Vis mindre" : "Vis mer"}
            </Button>
          </div>
        </div>

        <div
          className="navds-show-more__content"
          style={
            isOpen
              ? {}
              : { height: collapsedHeight ?? (heading ? "11.5rem" : "13.5rem") }
          }
          // @ts-expect-error https://github.com/DefinitelyTyped/DefinitelyTyped/pull/60822
          inert={isOpen ? undefined : ""}
        >
          {children}
        </div>
      </Component>
    );
  }
);

export default ShowMore;
