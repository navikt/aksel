import React, {
  cloneElement,
  forwardRef,
  HTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { usePopper } from "react-popper";
import { Placement } from "@popperjs/core";
import mergeRefs from "react-merge-refs";
import cl from "classnames";
import {
  Detail,
  mergeCallbacks,
  useClientLayoutEffect,
  useEventLister,
  useId,
} from "..";

export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Element tooltip anchors to
   */
  children: React.ReactElement & React.RefAttributes<HTMLElement>;
  /**
   * Open state for contolled tooltip
   * @note Will need to handle all events manually if used
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
   * Adds a delay before opening tooltip
   * @default 150ms
   */
  delay?: number;
  /**
   * Callback for when Tooltip opens/closes
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

    const anchorRef = useRef<HTMLSpanElement | null>(null);
    const timeoutRef = useRef<number>();

    const [openState, setOpenState] = useState(open ?? false);
    const tooltipId = useId();
    const tooltipMountId = "navds-tooltip-container";
    const mounted = useRef(false);

    useEffect(() => {
      if (document.getElementById(tooltipMountId) === null) {
        const tooltipContainerElement = document.createElement("div");
        tooltipContainerElement.id = tooltipMountId;
        document.body.appendChild(tooltipContainerElement);
      }
      mounted.current = true;
      return () => {
        window.clearTimeout(timeoutRef.current);
      };
    }, []);

    const handleOpen = () => {
      if (open !== undefined || openState) return;
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        setOpenState(true);
        onOpenChange && onOpenChange(true);
      }, delay);
    };

    const handleClose = useCallback(() => {
      if (open !== undefined) return;
      window.clearTimeout(timeoutRef.current);
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
      anchorRef.current,
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

    const newChildren = cloneElement(children, {
      "aria-describedby": cl(children.props["aria-describedby"], {
        [id ?? `tooltip-${tooltipId}`]: isOpen,
      }),
      onMouseOver: mergeCallbacks(handleOpen, children.props.onMouseOver),
      onMouseLeave: mergeCallbacks(handleClose, children.props.onMouseLeave),
      onBlur: mergeCallbacks(handleClose, children.props.onBlur),
      onFocus: mergeCallbacks(handleOpen, children.props.onFocus),
    } as HTMLAttributes<HTMLElement>);

    return (
      <>
        <span
          className="navds-tooltip__wrapper"
          ref={(el) => {
            anchorRef.current = el;
          }}
        >
          {newChildren}
        </span>
        {mounted.current &&
          createPortal(
            <div
              ref={mergedRef}
              className={cl("navds-tooltip", className, {
                "navds-tooltip--hidden": !isOpen,
              })}
              aria-live="polite"
              aria-hidden={!isOpen}
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
            </div>,
            document.getElementById(tooltipMountId)
          )}
      </>
    );
  }
);

export default Tooltip;
