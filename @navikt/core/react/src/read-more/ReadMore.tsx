import cl from "clsx";
import React, { forwardRef } from "react";
import { ChevronDownIcon } from "@navikt/aksel-icons";
import { BodyLong } from "../typography";
import { composeEventHandlers } from "../util/composeEventHandlers";
import { useControllableState } from "../util/hooks/useControllableState";

export interface ReadMoreProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Content inside ReadMore.
   */
  children: React.ReactNode;
  /**
   * ReadMore header content.
   */
  header: React.ReactNode;
  /**
   * Opens component if `true`, closes if `false`.
   * Using this prop removes automatic control of open-state.
   */
  open?: boolean;
  /**
   * Initially open.
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Callback for current open-state
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Changes fontsize for content.
   * @default "medium"
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
      onOpenChange,
      ...rest
    },
    ref,
  ) => {
    const [_open, _setOpen] = useControllableState({
      defaultValue: defaultOpen,
      value: open,
      onChange: onOpenChange,
    });

    return (
      <div
        className={cl(
          "navds-read-more",
          `navds-read-more--${size}`,
          className,
          { "navds-read-more--open": _open },
        )}
      >
        <button
          {...rest}
          ref={ref}
          type="button"
          className={cl("navds-read-more__button", "navds-body-short", {
            "navds-body-short--small": size === "small",
          })}
          onClick={composeEventHandlers(onClick, () => _setOpen((x) => !x))}
          aria-expanded={_open}
        >
          <ChevronDownIcon
            className="navds-read-more__expand-icon"
            aria-hidden
          />
          <span>{header}</span>
        </button>

        <BodyLong
          as="div"
          aria-hidden={!_open}
          className={cl("navds-read-more__content", {
            "navds-read-more__content--closed": !_open,
          })}
          size={size}
        >
          {children}
        </BodyLong>
      </div>
    );
  },
);

export default ReadMore;
