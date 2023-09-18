import React, { forwardRef, useState } from "react";
import cl from "clsx";
import { ChevronDownIcon, ChevronUpIcon } from "@navikt/aksel-icons";
import { Button } from "..";

interface ShowMoreBaseProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClick"> {
  children: React.ReactNode;
  /**
   * Opens component if 'true', collapses if 'false'.
   * Using this prop removes automatic control of open-state.
   */
  open?: boolean;
  /**
   * Changes button size
   * @default medium
   */
  size?: "medium" | "small";
  /**
   * Changes background color. Padding is added when variant != transparent.
   * @default transparent
   */
  variant?: "transparent" | "default" | "subtle" | "info";
  /**
   * Custom collapsed height.
   * @default 13.5rem
   */
  collapsedHeight?: `${number}${string}` | number;
  /** Click handler for the show more/less button */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** Label for the content */
  "aria-label"?: string;
  /** ID of an element that labels the content */
  "aria-labelledby"?: string;
}

export type ShowMoreProps = ShowMoreBaseProps &
  ({ "aria-label": string } | { "aria-labelledby": string });

/**
 * ShowMore
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/show-more)
 * @see 🏷️ {@link ShowMoreProps}
 *
 * @example
 * <ShowMore aria-label="Facts about toads">
 *   Toads have dry, leathery skin, short legs, and large bumps covering the parotoid glands.
 * </ShowMore>
 */
export const ShowMore = forwardRef<HTMLDivElement, ShowMoreProps>(
  (
    {
      children,
      open,
      size = "medium",
      variant = "transparent",
      collapsedHeight = "13.5rem",
      className,
      onClick,
      "aria-label": ariaLabel,
      ...rest
    },
    ref
  ) => {
    const [internalOpen, setInternalOpen] = useState(false);

    const isOpen = open ?? internalOpen;
    const ChevronIcon = isOpen ? ChevronUpIcon : ChevronDownIcon;

    return (
      <div
        ref={ref}
        className={cl(
          "navds-show-more",
          `navds-show-more--${variant}`,
          className,
          { "navds-show-more--closed": !isOpen }
        )}
        {...rest}
      >
        <div className="navds-show-more__button-section">
          <div className="navds-show-more__button-wrapper">
            <Button
              type="button"
              variant="secondary-neutral"
              size={size}
              className="navds-show-more__button"
              onClick={(e) => {
                if (open === undefined) setInternalOpen((isOpen) => !isOpen);
                onClick?.(e);
              }}
              aria-expanded={isOpen}
              aria-label={ariaLabel}
              icon={<ChevronIcon aria-hidden />}
              iconPosition="right"
            >
              {isOpen ? "Vis mindre" : "Vis mer"}
            </Button>
          </div>
        </div>

        <div
          className="navds-show-more__content"
          style={isOpen ? {} : { height: collapsedHeight }}
          aria-hidden={!isOpen}
        >
          {children}
        </div>
      </div>
    );
  }
);

export default ShowMore;
