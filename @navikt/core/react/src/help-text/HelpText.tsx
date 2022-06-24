import { Helptext as HelpTextIcon } from "@navikt/ds-icons";
import cl from "clsx";
import React, { forwardRef, useRef, useState } from "react";
import { Popover, PopoverProps, mergeRefs } from "..";

export interface HelpTextProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    Pick<PopoverProps, "strategy" | "placement"> {
  /**
   * Helptext-dialog content
   */
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
}

export const HelpText = forwardRef<HTMLButtonElement, HelpTextProps>(
  (
    {
      className,
      children,
      placement = "top",
      strategy = "absolute",
      title = "hjelp",
      onClick,
      ...rest
    },
    ref
  ) => {
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const mergedRef = mergeRefs([buttonRef, ref]);
    const [open, setOpen] = useState(false);

    return (
      <div className="navds-help-text">
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
          <HelpTextIcon className="navds-help-text__icon" title={title} />
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
