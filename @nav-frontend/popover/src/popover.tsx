import React, { forwardRef, useCallback, useEffect, useRef } from "react";
import { usePopper } from "react-popper";
import { Placement } from "@popperjs/core";
import mergeRefs from "react-merge-refs";
import cl from "classnames";
import "@nav-frontend/popover-style";

interface PopoverProps {
  /**
   * Element that popover will anchor to
   */
  anchorEl: HTMLElement | null;
  /**
   * Open state for popover
   */
  open: boolean;
  /**
   * Callback for when popover to closes
   */
  onClose: () => void;
  /**
   * children
   */
  children: React.ReactNode;
  /**
   * Orientation for popover
   * @default 'auto'
   */
  placement?: Placement;
  /**
   * User defined classname
   */
  className?: string;
}

const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  (
    { anchorEl, open, onClose, children, placement = "auto", className },
    ref
  ) => {
    const defaultRef = useRef<HTMLDivElement | null>(null);
    const popperElement = mergeRefs([defaultRef, ref]);
    const arrowElement = useRef<HTMLDivElement | null>(null);

    const checkFocus = useCallback(
      (e: FocusEvent) => {
        const focusElement = e.target;
        if (
          focusElement === defaultRef.current ||
          focusElement === anchorEl ||
          (defaultRef && defaultRef?.current?.contains(focusElement as Node))
        ) {
          return;
        }
        onClose();
      },
      [anchorEl, onClose]
    );

    const handleEsc = useCallback(
      (e: KeyboardEvent) => {
        if (!open) return;
        if (e.key === "Escape") onClose();
      },
      [open, onClose]
    );
    const handleFocus = useCallback(
      (e: FocusEvent) => {
        if (!open) return;
        checkFocus(e);
      },
      [open, checkFocus]
    );

    const handleClick = useCallback(
      (e: MouseEvent) => {
        if (
          open &&
          e.target instanceof Node &&
          !defaultRef?.current?.contains(e.target)
        ) {
          onClose();
        }
      },
      [open, onClose]
    );

    useEffect(() => {
      document.addEventListener("click", handleClick);
      document.addEventListener("keydown", handleEsc);
      document.addEventListener("focusin", handleFocus);
      return () => {
        document.removeEventListener("click", handleClick);
        document.removeEventListener("keydown", handleEsc);
        document.removeEventListener("focusin", handleFocus);
      };
    }, [handleClick, handleEsc, handleFocus]);

    const { styles, attributes, update } = usePopper(
      anchorEl,
      defaultRef.current,
      {
        placement,
        modifiers: [
          {
            name: "arrow",
            options: {
              padding: 4,
              element: arrowElement.current,
            },
          },
          {
            name: "offset",
            options: {
              offset: [0, 16],
            },
          },
        ],
      }
    );

    useEffect(() => {
      if (open && update) {
        update();
      }
    }, [open, update]);

    return (
      <div
        ref={popperElement}
        className={cl("popover", className, { popover__hidden: !open })}
        onClick={(e) => e.stopPropagation()}
        style={styles.popper}
        {...attributes.popper}
      >
        {children}
        <div
          ref={arrowElement}
          style={styles.arrow}
          className="popover__arrow"
        />
      </div>
    );
  }
);

export default Popover;
