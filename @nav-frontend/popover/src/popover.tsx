import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import ReactDOM from "react-dom";
import { usePopper } from "react-popper";
import { Placement } from "@popperjs/core";
import mergeRefs from "react-merge-refs";
import cl from "classnames";
import "@nav-frontend/popover-style";

export interface PopoverPosisjonShape {
  left?: number;
  top?: number;
  pilLeft?: number;
}

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
    { anchorEl, open, onClose, children, placement = "auto", className = "" },
    ref
  ) => {
    const defaultRef = useRef<HTMLDivElement | null>(null);
    const popperElement = mergeRefs([defaultRef, ref]);
    const arrowElement = useRef<HTMLDivElement | null>(null);

    const checkFocus = useCallback(() => {
      const focusElement = document.activeElement;
      if (
        focusElement === defaultRef.current ||
        focusElement === anchorEl ||
        (defaultRef &&
          defaultRef.current &&
          defaultRef.current.contains &&
          defaultRef.current.contains(focusElement))
      ) {
        return;
      }
      onClose();
    }, [anchorEl, onClose]);

    const handleKeys = useCallback(
      (e: KeyboardEvent) => {
        if (!open) return;
        if (e.key === "Escape") onClose();
        if (e.key === "Tab") checkFocus();
      },
      [open, onClose, checkFocus]
    );

    const handleClick = useCallback(
      (e: MouseEvent) => {
        console.log(e.detail);

        if (
          open &&
          e.target instanceof Node &&
          !defaultRef?.current?.contains(e.target)
        ) {
          console.log("click");

          onClose();
        }
      },
      [open, onClose]
    );

    useEffect(() => {
      document.addEventListener("click", handleClick);
      document.addEventListener("keydown", handleKeys);
      return () => {
        document.removeEventListener("click", handleClick);
        document.removeEventListener("keydown", handleKeys);
      };
    }, [handleClick, handleKeys]);

    const { styles, attributes } = usePopper(anchorEl, defaultRef.current, {
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
    });

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
