import React, { forwardRef, useRef, useState } from "react";
import { Popover, PopoverProps } from "../popover";
import { useRenameCSS, useThemeInternal } from "../theme/Theme";
import { composeEventHandlers } from "../util/composeEventHandlers";
import { useMergeRefs } from "../util/hooks/useMergeRefs";
import { useI18n } from "../util/i18n/i18n.hooks";
import { HelpTextIcon } from "./HelpTextIcon";

export interface HelpTextProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    Pick<PopoverProps, "strategy" | "placement"> {
  children: React.ReactNode;
  /**
   * Adds a title-tooltip with the given text
   * @default "Mer informasjon"
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
      title,
      onClick,
      wrapperClassName,
      "data-color": color = "info",
      ...rest
    },
    ref,
  ) => {
    const { cn } = useRenameCSS();
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const mergedRef = useMergeRefs(buttonRef, ref);
    const [open, setOpen] = useState(false);
    const themeContext = useThemeInternal();
    const translate = useI18n("HelpText");

    const titleWithFallback = title || translate("title");

    return (
      <div
        className={cn("navds-help-text", wrapperClassName)}
        data-color={color}
      >
        <button
          {...rest}
          ref={mergedRef}
          onClick={composeEventHandlers(onClick, () => setOpen((x) => !x))}
          className={cn(className, "navds-help-text__button")}
          type="button"
          aria-expanded={open}
          aria-label={titleWithFallback}
        >
          <HelpTextIcon />
          <HelpTextIcon filled />
        </button>
        <Popover
          onClose={() => setOpen(false)}
          className={cn("navds-help-text__popover")}
          open={open}
          anchorEl={buttonRef.current}
          placement={placement}
          strategy={strategy}
          offset={themeContext?.isDarkside ? 8 : 12}
          arrow={!themeContext?.isDarkside}
        >
          <Popover.Content className={cn("navds-body-short")}>
            {children}
          </Popover.Content>
        </Popover>
      </div>
    );
  },
);

export default HelpText;
