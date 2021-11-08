import { Placement } from "@popperjs/core";
import cl from "classnames";
import React, { forwardRef, HTMLAttributes, useCallback, useRef } from "react";
import mergeRefs from "react-merge-refs";
import { usePopper } from "react-popper";
import { useIsomorphicLayoutEffect, useKey, useEvent } from "react-use";
import PopoverContent, { PopoverContentType } from "./PopoverContent";

export interface PopoverProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Element popover anchors to
   */
  anchorEl: Element | null;
  /**
   * Open state
   */
  open: boolean;
  /**
   * onClose callback
   */
  onClose: () => void;
  /**
   * Popover content
   */
  children: React.ReactNode;
  /**
   * Orientation for popover
   * @default "right"
   */
  placement?: Placement;
  /**
   *  Toggles rendering of arrow
   *  @default true
   */
  arrow?: boolean;
  /**
   * Distance from anchor to popover
   * @default 16 w/arrow, 4 w/no-arrow
   */
  offset?: number;
}

interface PopoverComponent
  extends React.ForwardRefExoticComponent<
    PopoverProps & React.RefAttributes<HTMLDivElement>
  > {
  Content: PopoverContentType;
}

const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  (
    {
      className,
      children,
      anchorEl,
      arrow = true,
      open,
      onClose,
      placement = "right",
      offset,
      ...rest
    },
    ref
  ) => {
    const popoverRef = useRef<HTMLDivElement | null>(null);
    const mergedRef = mergeRefs([popoverRef, ref]);

    const close = useCallback(() => open && onClose(), [open, onClose]);

    useEvent(
      "click",
      useCallback(
        (e: MouseEvent) => {
          if (
            ![anchorEl, popoverRef.current].some((element) =>
              element?.contains(e.target as Node)
            )
          ) {
            close();
          }
        },
        [anchorEl, close]
      )
    );

    useKey("Escape", () => close(), {}, [close]);

    useEvent(
      "focusin",
      useCallback(
        (e: FocusEvent) => {
          if (
            ![anchorEl, popoverRef.current].some((element) =>
              element?.contains(e.target as Node)
            )
          ) {
            close();
          }
        },
        [anchorEl, close]
      )
    );

    const { styles, attributes, update } = usePopper(
      anchorEl,
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

    useIsomorphicLayoutEffect(() => {
      open && update && update();
    }, [open, update]);

    return (
      <div
        ref={mergedRef}
        className={cl("navds-popover", className, {
          "navds-popover--hidden": !open || !anchorEl,
        })}
        aria-hidden={!open || !anchorEl}
        tabIndex={-1}
        {...attributes.popper}
        {...rest}
        style={styles.popper}
      >
        {children}
        {arrow && (
          <div
            data-popper-arrow
            style={styles.arrow}
            className="navds-popover__arrow"
          />
        )}
      </div>
    );
  }
) as PopoverComponent;

Popover.Content = PopoverContent;

export default Popover;
