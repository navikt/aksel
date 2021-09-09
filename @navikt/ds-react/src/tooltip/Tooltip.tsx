import React, { forwardRef, HTMLAttributes, useRef, useState } from "react";
import { usePopper } from "react-popper";
import { Placement } from "@popperjs/core";
import mergeRefs from "react-merge-refs";
import cl from "classnames";
import { Detail } from "..";

export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Element tooltip anchors to
   */
  children: React.ReactNode;
  /**
   * Open state for contolled tooltip
   */
  open?: boolean;
  /**
   * Orientation for tooltip
   * @default "top"
   */
  placement?: Placement;
  /**
   *  Toggles rendering of arrow
   *  @default true
   */
  arrow?: boolean;
  /**
   * Distance from anchor to tooltip
   * @default 16 w/arrow, 4 w/no-arrow
   */
  offset?: number;
  /**
   * Tekst shown in tooltip
   */
  title: string;
}

const Popover = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      children,
      className,
      arrow = true,
      placement = "top",
      open,
      offset,
      title,
      ...rest
    },
    ref
  ) => {
    const popoverRef = useRef<HTMLDivElement | null>(null);
    const mergedRef = mergeRefs([popoverRef, ref]);

    const anchor = useRef<HTMLDivElement | null>(null);

    const [openState, setOpenState] = useState(open ?? false);

    const handleOpen = () => {
      open === undefined && setOpenState(true);
    };

    const handleClose = () => {
      open === undefined && setOpenState(false);
    };

    const { styles, attributes } = usePopper(
      anchor.current,
      popoverRef.current,
      {
        placement,
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, offset ?? (arrow ? 16 : 4)],
            },
          },
          {
            name: "arrow",
            options: {
              padding: 8,
            },
          },
        ],
      }
    );

    return (
      <div className="navds-tooltip__wrapper">
        <div
          ref={anchor}
          onFocus={handleOpen}
          onBlur={handleClose}
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
          onMouseOver={handleOpen}
          onMouseOut={handleClose}
          onPointerEnter={handleOpen}
          onPointerLeave={handleClose}
        >
          {children}
        </div>
        <div
          ref={mergedRef}
          className={cl("navds-tooltip", className, {
            "navds-tooltip--hidden": !open && !openState,
          })}
          aria-live="polite"
          aria-hidden={!open && !openState}
          tabIndex={-1}
          role="tooltip"
          {...attributes.popper}
          {...rest}
          style={styles.popper}
        >
          <Detail as="span">{title}</Detail>
          {arrow && (
            <div
              data-popper-arrow
              style={styles.arrow}
              className="navds-tooltip__arrow"
            />
          )}
        </div>
      </div>
    );
  }
);

export default Popover;
