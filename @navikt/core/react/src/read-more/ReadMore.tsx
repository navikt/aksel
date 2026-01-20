import React, { forwardRef } from "react";
import { ChevronDownIcon } from "@navikt/aksel-icons";
import type { AkselStatusColorRole } from "@navikt/ds-tokens/types";
import type { AkselColor } from "../types";
import { BodyLong } from "../typography";
import { cl, composeEventHandlers } from "../utils/helpers";
import { useControllableState } from "../utils/hooks";

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
   * Callback for current open-state.
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Changes font size for content.
   * @default "medium"
   */
  size?: "large" | "medium" | "small";
  /**
   * Overrides inherited color.
   *
   * We recommend only using `accent`. We have disallowed status-colors.
   * @see 🏷️ {@link AkselColor}
   * @see [📝 Documentation](https://aksel.nav.no/grunnleggende/styling/farger-tokens)
   * @private
   */
  "data-color"?: Exclude<AkselColor, AkselStatusColorRole>;
}

/**
 * ReadMore
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/read-more)
 * @see 🏷️ {@link ReadMoreProps}
 *
 * @example
 * <ReadMore header="Dette regnes som helsemessige begrensninger">
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
    }: ReadMoreProps,
    ref,
  ) => {
    const [_open, _setOpen] = useControllableState({
      defaultValue: defaultOpen,
      value: open,
      onChange: onOpenChange,
    });

    const typoSize = size === "small" ? "small" : "medium";

    return (
      <div
        className={cl(
          "aksel-read-more",
          `aksel-read-more--${size}`,
          className,
          { "aksel-read-more--open": _open },
        )}
        data-volume="low"
      >
        <button
          {...rest}
          ref={ref}
          type="button"
          className={cl("aksel-read-more__button", "aksel-body-short", {
            "aksel-body-short--small": size === "small",
          })}
          onClick={composeEventHandlers(onClick, () => _setOpen((x) => !x))}
          aria-expanded={_open}
          data-state={_open ? "open" : "closed"}
        >
          <ChevronDownIcon
            className="aksel-read-more__expand-icon"
            aria-hidden
          />
          <span>{header}</span>
        </button>

        <BodyLong
          as="div"
          className={cl("aksel-read-more__content", {
            "aksel-read-more__content--closed": !_open,
          })}
          size={typoSize}
          data-state={_open ? "open" : "closed"}
        >
          {children}
        </BodyLong>
      </div>
    );
  },
);

export default ReadMore;
