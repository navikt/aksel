import PropTypes from "prop-types";
import React, {
  forwardRef,
  HTMLAttributes,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { usePopper } from "react-popper";
import { Placement, placements } from "@popperjs/core";
import mergeRefs from "react-merge-refs";
import cl from "classnames";

export interface PopoverProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Element that popover will anchor to
   */
  anchorEl: HTMLElement | null;
  /**
   * Open state for popover
   */
  open: boolean;
  /**
   * Callback for when popover closes
   */
  onClose: () => void;
  /**
   * Content rendered inside popover
   */
  children: React.ReactNode;
  /**
   * @ignore
   */
  className?: string;
  /**
   * Orientation for popover
   * @default "right"
   */
  placement?: Placement;
  /**
   * Small reduces padding on popover content
   * @default "medium"
   */
  size?: "medium" | "small";
}

const useEventLister = (event: string, callback) =>
  useEffect(() => {
    document.addEventListener(event, callback);
    return () => {
      document.removeEventListener(event, callback);
    };
  }, [event, callback]);

const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  (
    {
      anchorEl,
      open,
      onClose,
      children,
      placement = "right",
      className,
      size = "medium",
      ...rest
    },
    ref
  ) => {
    const popoverRef = useRef<HTMLDivElement | null>(null);
    const mergedRef = mergeRefs([popoverRef, ref]);
    const arrowRef = useRef<HTMLDivElement | null>(null);

    const close = useCallback(() => open && onClose(), [open, onClose]);

    useEventLister(
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

    useEventLister(
      "keydown",
      useCallback((e: KeyboardEvent) => e.key === "Escape" && close(), [close])
    );

    useEventLister(
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
            name: "arrow",
            options: {
              padding: 8,
              element: arrowRef.current,
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
      open && update && update();
    }, [open, update]);

    return (
      <div
        ref={mergedRef}
        className={cl("navds-popover", `navds-popover--${size}`, className, {
          "navds-popover--hidden": !open || !anchorEl,
        })}
        aria-live="polite"
        aria-hidden={!open || !anchorEl}
        tabIndex={-1}
        {...attributes.popper}
        {...rest}
        style={styles.popper}
      >
        {children}
        <div
          ref={arrowRef}
          style={styles.arrow}
          className="navds-popover__arrow"
        />
      </div>
    );
  }
);

Popover.propTypes = {
  /**
   * Element that popover will anchor to
   */
  anchorEl: PropTypes.any,
  /**
   * Open state for popover
   */
  open: PropTypes.bool.isRequired,
  /**
   * Callback for when popover closes
   */
  onClose: PropTypes.func.isRequired,
  /**
   * Content rendered inside popover
   */
  children: PropTypes.node.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Orientation for popover
   * @default "right"
   */
  placement: PropTypes.oneOf<Placement>([...placements]),
  /**
   * Small reduces padding on popover content
   * @default "medium"
   */
  size: PropTypes.oneOf(["medium", "small"]),
};

export default Popover;
