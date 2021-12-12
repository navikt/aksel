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

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
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
    const popoverRef = useRef<HTMLDivElement | null>(null);
    const mergedRef = mergeRefs([popoverRef, ref]);

    const anchor = useRef<HTMLDivElement | null>(null);
    const timeoutRef = useRef<number>();

    const [openState, setOpenState] = useState(open ?? false);
    const tooltipId = useId();

    const handleOpen = () => {
      if (open !== undefined || openState) return;
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        setOpenState(true);
        onOpenChange && onOpenChange(true);
      }, delay);
    };

    const handleClose = useCallback(() => {
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

    return (
      <div className="navds-tooltip__wrapper">
        <div
          ref={(el) => (anchor.current = el)}
          onFocus={handleOpen}
          onBlur={handleClose}
          onMouseOver={handleOpen}
          onMouseLeave={handleClose}
          aria-describedby={isOpen ? id ?? `tooltip-${tooltipId}` : undefined}
        >
          {children}
        </div>
        <div
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

export default Tooltip;
