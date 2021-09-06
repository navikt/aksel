import { Helptext as HelpTextIcon } from "@navikt/ds-icons";
import { Placement } from "@popperjs/core";
import cl from "classnames";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import mergeRefs from "react-merge-refs";
import { Popover, useId } from "..";

export interface HelpTextProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Component content
   */
  children: React.ReactNode;
  /**
   * Tekst shown on mouseover and by screenreaders
   * @default "hjelp"
   */
  title?: string;
  /**
   * Placement of popover
   * @default "top"
   */
  placement?: Placement;
}

const HelpText = forwardRef<HTMLButtonElement, HelpTextProps>(
  (
    { className, children, placement = "top", title = "hjelp", ...rest },
    ref
  ) => {
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const mergedRef = mergeRefs([buttonRef, ref]);
    const popoverRef = useRef<HTMLDivElement | null>(null);
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    const [open, setOpen] = useState(false);
    const popoverId = `popover-${useId()}`;

    useEffect(() => {
      open && popoverRef.current?.focus();
    }, [open]);

    useEffect(() => {
      const handleKeydown = (e: KeyboardEvent) => {
        e.key === "ESC" && setOpen(false);
        e.key === "Tab" &&
          wrapperRef?.current &&
          !wrapperRef.current.contains(document.activeElement) &&
          setOpen(false);
      };

      window.addEventListener("keydown", handleKeydown, true);
      return () => {
        window.removeEventListener("keydown", handleKeydown, true);
      };
    }, []);

    const handleClick = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      setOpen((x) => !x);
      rest.onClick && rest.onClick(e);
    };

    return (
      <div className="navds-help-text" ref={wrapperRef}>
        <button
          {...rest}
          ref={mergedRef}
          onClick={(e) => handleClick(e)}
          className={cl(className, "navds-help-text__button")}
          type="button"
          aria-expanded={open}
          aria-controls={popoverId}
          aria-haspopup="dialog"
          title={title}
        >
          <HelpTextIcon className="navds-help-text__icon" />
          <span className="navds-sr-only">{title}</span>
        </button>
        <Popover
          ref={popoverRef}
          onClose={() => setOpen(false)}
          className="navds-help-text__popover"
          open={open}
          role="tooltip"
          anchorEl={buttonRef.current}
          id={popoverId}
          placement={placement}
        >
          <Popover.Content>{children}</Popover.Content>
        </Popover>
      </div>
    );
  }
);

export default HelpText;
