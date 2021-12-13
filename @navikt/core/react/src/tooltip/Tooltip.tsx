import React, {
  forwardRef,
  HTMLAttributes,
  useCallback,
  useRef,
  useState,
} from "react";
import { usePopper } from "react-popper";
import { Placement } from "@popperjs/core";
import mergeRefs from "react-merge-refs";
import cl from "classnames";
import { Detail, useClientLayoutEffect, useEventLister, useId } from "..";

export interface TooltipProps extends HTMLAttributes<HTMLSpanElement> {
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
   * Content shown in tooltip
   */
  content: React.ReactNode;
  /**
   * Adds a delay when opening to tooltip
   * @default 150ms
   */
  delay?: number;
  /**
   * Callback for whenTooltip opens or closes
   */
  onOpenChange?: (state: boolean) => void;
}

const Tooltip = forwardRef<HTMLSpanElement, TooltipProps>(
  (
    {
      children,
      className,
      arrow = true,
      placement = "top",
      open,
      offset,
      content,
      delay = 150,
      id,
      onOpenChange,
      ...rest
    },
    ref
  ) => {
    const popoverRef = useRef<HTMLSpanElement | null>(null);
    const mergedRef = mergeRefs([popoverRef, ref]);

    const anchor = useRef<HTMLSpanElement | null>(null);
    const timeoutRef = useRef<number>();

    const [openState, setOpenState] = useState(open ?? false);
    const tooltipId = useId();

    const handleOpen = () => {
      console.log("open");
      if (open !== undefined || openState) return;
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        setOpenState(true);
        onOpenChange && onOpenChange(true);
      }, delay);
    };

    const handleClose = useCallback(() => {
      console.log("close");
      window.clearTimeout(timeoutRef.current);
      if (open !== undefined) return;
      setOpenState(false);
      onOpenChange && onOpenChange(false);
    }, [open, onOpenChange]);

    useEventLister(
      "keydown",
      useCallback((e: KeyboardEvent) => e.key === "Escape" && handleClose(), [
        handleClose,
      ])
    );

    const { styles, attributes, update } = usePopper(
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

    useClientLayoutEffect(() => {
      update && update();
    }, [open, openState, update]);

    const isOpen = open || openState;

    const events = {
      onMouseOver: (open === undefined && handleOpen) || undefined,
      onMouseLeave: (open === undefined && handleClose) || undefined,
      onFocus: (open === undefined && handleOpen) || undefined,
      onBlur: (open === undefined && handleClose) || undefined,
    };

    return (
      <>
        <span
          className="navds-tooltip__wrapper"
          ref={(el) => (anchor.current = el)}
          {...events}
          aria-describedby={
            isOpen && isOpen ? id ?? `tooltip-${tooltipId}` : undefined
          }
        >
          {children}
        </span>
        <span
          ref={mergedRef}
          className={cl("navds-tooltip", className, {
            "navds-tooltip--hidden": !isOpen,
          })}
          aria-live="polite"
          aria-hidden={!isOpen}
          tabIndex={-1}
          role="tooltip"
          id={id ?? `tooltip-${tooltipId}`}
          {...attributes.popper}
          {...rest}
          style={styles.popper}
        >
          <Detail as="span">{content}</Detail>
          {arrow && (
            <span
              data-popper-arrow
              style={styles.arrow}
              className="navds-tooltip__arrow"
            />
          )}
        </span>
      </>
    );
  }
);

export default Tooltip;
