import cl from "clsx";
import React, { forwardRef, useMemo, useRef, useState } from "react";
import { Popover, PopoverProps, mergeRefs } from "..";
import { HelpTextIcon } from "./HelpTextIcon";

export interface HelpTextProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    Pick<PopoverProps, "strategy" | "placement"> {
  children: React.ReactNode;
  /**
   * Adds a title-tooltip with the given text
   * @default "hjelp"
   */
  title?: string;
  /**
   * Default dialog-placement on open
   * @default "top"
   */
  placement?:
    | "top"
    | "bottom"
    | "right"
    | "left"
    | "top-start"
    | "top-end"
    | "bottom-start"
    | "bottom-end"
    | "right-start"
    | "right-end"
    | "left-start"
    | "left-end";
  /**
   * Classname for wrapper
   */
  wrapperClassName?: string;
}

/**
 * A component that displays a help text button with a popover.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/helptext)
 * @see 🏷️ {@link HelpTextProps}
 *
 * @example
 * ```jsx
 * <HelpText title="Hvor kommer dette fra?">
 *   Informasjonen er hentet fra X sin statistikk fra 2021
 * </HelpText>
 * ```
 */
export const HelpText = forwardRef<HTMLButtonElement, HelpTextProps>(
  (
    {
      className,
      children,
      placement = "top",
      strategy = "absolute",
      title = "hjelp",
      onClick,
      wrapperClassName,
      ...rest
    },
    ref
  ) => {
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const mergedRef = useMemo(() => mergeRefs([buttonRef, ref]), [ref]);
    const [open, setOpen] = useState(false);

    return (
      <div className={cl("navds-help-text", wrapperClassName)}>
        <button
          {...rest}
          ref={mergedRef}
          onClick={(e) => {
            setOpen((x) => !x);
            onClick?.(e);
          }}
          className={cl(className, "navds-help-text__button")}
          type="button"
          aria-expanded={open}
        >
          <HelpTextIcon title={title} />
          <HelpTextIcon filled title={title} />
        </button>
        <Popover
          onClose={() => setOpen(false)}
          className="navds-help-text__popover"
          open={open}
          anchorEl={buttonRef.current}
          placement={placement}
          strategy={strategy}
        >
          <Popover.Content className="navds-body-short">
            {children}
          </Popover.Content>
        </Popover>
      </div>
    );
  }
);

export default HelpText;
