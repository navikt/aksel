import cl from "clsx";
import React, { forwardRef, useRef, useState } from "react";
import { Popover, PopoverProps } from "../popover";
import { composeEventHandlers } from "../util/composeEventHandlers";
import { useMergeRefs } from "../util/hooks/useMergeRefs";
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
      placement,
      strategy = "absolute",
      title = "hjelp",
      onClick,
      wrapperClassName,
      ...rest
    },
    ref,
  ) => {
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const mergedRef = useMergeRefs(buttonRef, ref);

    const [open, setOpen] = useState(false);

    return (
      <div className={cl("navds-help-text", wrapperClassName)}>
        <button
          {...rest}
          ref={mergedRef}
          onClick={composeEventHandlers(onClick, () => setOpen((x) => !x))}
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
          offset={12}
        >
          <Popover.Content className="navds-body-short">
            {children}
          </Popover.Content>
        </Popover>
      </div>
    );
  },
);

export default HelpText;
