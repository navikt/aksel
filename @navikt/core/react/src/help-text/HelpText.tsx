import { Helptext as HelpTextIcon } from "@navikt/ds-icons";
import cl from "classnames";
import React, { forwardRef, useRef, useState } from "react";
import mergeRefs from "react-merge-refs";
import { Popover, PopoverProps } from "..";

export interface HelpTextProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    Pick<PopoverProps, "strategy" | "placement"> {
  /**
   * Component content
   */
  children: React.ReactNode;
}

const HelpText = forwardRef<HTMLButtonElement, HelpTextProps>(
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
          <HelpTextIcon
            className="navds-help-text__icon"
            aria-hidden
            title={title}
          />
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
