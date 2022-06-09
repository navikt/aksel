import { Placement } from "@popperjs/core";
import cl from "classnames";
import React, {
  forwardRef,
  HTMLAttributes,
  useCallback,
  useEffect,
  useRef,
} from "react";
import mergeRefs from "react-merge-refs";
import { usePopper } from "react-popper";
import { useClientLayoutEffect } from "..";
import PopoverContent, { PopoverContentType } from "./PopoverContent";

export interface PopoverProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Popover content
   */
  children: React.ReactNode;
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
   * Orientation for popover
   * @note Try to keep general usage to "top", "bottom", "left", "right"
   * @default "right"
   */
  placement?: Placement;
  /**
   * Adds a arrow from dialog to anchor when true
   * @default true
   */
  arrow?: boolean;
  /**
   * Distance from anchor to popover
   * @default 16 w/arrow, 4 w/no-arrow
   */
  offset?: number;
  /**
   * Changes what CSS position property to use
   * You want to use "fixed" if reference element is inside a fixed container, but popover is not
   * @default "absolute"
   */
  strategy?: "absolute" | "fixed";
}

const useEventLister = (event: string, callback) =>
  useEffect(() => {
    document.addEventListener(event, callback);
    return () => {
      document.removeEventListener(event, callback);
    };
  }, [event, callback]);

interface PopoverComponent
  extends React.ForwardRefExoticComponent<
    PopoverProps & React.RefAttributes<HTMLDivElement>
  > {
  Content: PopoverContentType;
}

export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
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
      strategy = "absolute",
      ...rest
    },
    ref
  ) => {
    const popoverRef = useRef<HTMLDivElement | null>(null);
    const mergedRef = mergeRefs([popoverRef, ref]);

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
        strategy,
      }
    );

    useClientLayoutEffect(() => {
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
