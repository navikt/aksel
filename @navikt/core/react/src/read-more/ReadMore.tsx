import React, { forwardRef, useState } from "react";
import cl from "clsx";
import { BodyLong } from "../typography";
import { ChevronDownIcon } from "@navikt/aksel-icons";

export interface ReadMoreProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Content inside ReadMore
   */
  children: React.ReactNode;
  /**
   * ReadMore header content
   */
  header: React.ReactNode;
  /**
   * Opens component if 'true', closes if 'false'
   * Using this props removes automatic control of open-state
   */
  open?: boolean;
  /**
   * Defaults the accordion to opened state
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Changes fontsize for content
   * @default false
   */
  size?: "medium" | "small";
}

/**
 * ReadMore
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/read-more)
 * @see 🏷️ {@link ReadMoreProps}
 *
 * @example
 * // Default
 * <ReadMore header="Dette regnes som helsemessige begrensninger">
 *  Med helsemessige begrensninger mener vi funksjonshemming, sykdom...
 * </ReadMore>
 *
 * @example
 * // Litt mindre versjon
 * <ReadMore size="small" header="Dette regnes som helsemessige begrensninger">
 *   Med helsemessige begrensninger mener vi funksjonshemming, sykdom...
 * </ReadMore>
 */
export const ReadMore = forwardRef<HTMLButtonElement, ReadMoreProps>(
  (
    {
      className,
      header,
      children,
      open,
      defaultOpen = false,
      onClick,
      size = "medium",
      ...rest
    },
    ref
  ) => {
    const [internalOpen, setInternalOpen] = useState<boolean>(defaultOpen);

    const isOpened = open ?? internalOpen;

    return (
      <div
        className={cl(
          "navds-read-more",
          `navds-read-more--${size}`,
          className,
          { "navds-read-more--open": isOpened }
        )}
      >
        <button
          {...rest}
          ref={ref}
          type="button"
          className={cl("navds-read-more__button", "navds-body-short", {
            "navds-body-short--small": size === "small",
          })}
          onClick={(e) => {
            if (open === undefined) {
              setInternalOpen((isOpen) => !isOpen);
            }
            onClick?.(e);
          }}
          aria-expanded={isOpened}
        >
          <ChevronDownIcon
            className="navds-read-more__expand-icon"
            aria-hidden
          />
          <span>{header}</span>
        </button>

        <BodyLong
          as="div"
          aria-hidden={!isOpened}
          className={cl("navds-read-more__content", {
            "navds-read-more__content--closed": !isOpened,
          })}
          size={size}
        >
          {children}
        </BodyLong>
      </div>
    );
  }
);

export default ReadMore;
