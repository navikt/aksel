import cl from "classnames";
import React, {
  forwardRef,
  HTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { composeEventHandlers, Detail, useEventListener } from "..";
import {
  useFloating,
  arrow as flArrow,
  shift,
  autoUpdate,
  offset,
  flip,
  hide,
} from "@floating-ui/react-dom";
import mergeRefs from "react-merge-refs";
import Portal from "./portal";

export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Element tooltip anchors to
   */
  children: React.ReactElement & React.RefAttributes<HTMLElement>;
  /**
   * Open state for contolled tooltip
   */
  open?: boolean;
  /**
   * Tells tooltip to start in open state
   * @note "open"-prop overwrites this
   */
  defaultOpen?: boolean;
  /**
   * Orientation for tooltip
   * @default "top"
   */
  side?: "top" | "right" | "bottom" | "left";
  /**
   *  Toggles rendering of arrow
   *  @default true
   */
  arrow?: boolean;
  /**
   * Distance from anchor to tooltip
   * @default 2
   */
  offset?: number;
  /**
   * Content shown in tooltip
   */
  content: string;
  /**
   * Adds a delay in milliseconds before opening tooltip
   * @default 150
   */
  delay?: number;
  /**
   * Callback for when Tooltip opens/closes
   */
  onOpenChange?: (state: boolean) => void;
  /**
   * Inverts style of tooltip
   * @default false
   */
  inverted?: boolean;
  /**
   * List of Keyboard-keys for shortcuts
   */
  keys?: string[];
}

/**
 * TODO: console.error for lange tekster, egen prop for å justere opp makslengde
 */
const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      children,
      className,
      arrow: _arrow = true,
      side = "top",
      open,
      defaultOpen,
      offset: _offset = 10,
      content,
      delay = 150,
      onOpenChange,
      id,
      inverted = false,
      keys,
      ...rest
    },
    ref
  ) => {
    const arrowRef = useRef<HTMLDivElement | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const openTimerRef = useRef(0);
    const isMouseDownRef = React.useRef(false);

    const {
      x,
      y,
      update,
      placement,
      refs,
      middlewareData: {
        arrow: { x: arrowX, y: arrowY } = {},
        hide: { referenceHidden } = {},
      },
    } = useFloating({
      placement: side,
      middleware: [
        offset(0),
        shift(),
        flip({ padding: 5, fallbackPlacements: ["bottom", "top"] }),
        flArrow({ element: arrowRef, padding: 5 }),
        hide(),
      ],
    });

    useEffect(() => {
      if (!refs.reference.current || !refs.floating.current) {
        return;
      }

      // Only call this when the floating element is rendered
      return autoUpdate(refs.reference.current, refs.floating.current, update);
    }, [refs.reference, refs.floating, update, open, isOpen]);

    const handleOpen = useCallback(() => {
      window.clearTimeout(openTimerRef.current);
      setIsOpen(true);
    }, [setIsOpen]);

    const handleClose = useCallback(() => {
      window.clearTimeout(openTimerRef.current);
      setIsOpen(false);
    }, [setIsOpen]);

    const handleMouseUp = React.useCallback(
      () => (isMouseDownRef.current = false),
      []
    );

    React.useEffect(() => {
      return () => document.removeEventListener("mouseup", handleMouseUp);
    }, [handleMouseUp]);

    useEventListener(
      "keydown",
      useCallback((e) => e.key === "Escape" && handleClose(), [handleClose]),
      document
    );

    const staticSide = {
      top: "bottom",
      right: "left",
      bottom: "top",
      left: "right",
    }[placement.split("-")[0]];

    const staticMargin = {
      top: "marginBottom",
      right: "marginLeft",
      bottom: "marginTop",
      left: "marginRight",
    }[placement.split("-")[0]];

    return (
      <>
        {React.cloneElement(children, {
          ...children.props,
          ref: mergeRefs([(children as any).ref, refs.reference]),
          onMouseEnter: composeEventHandlers(
            children.props.onMouseEnter,
            handleOpen
          ),
          onMouseLeave: composeEventHandlers(
            children.props.onMouseLeave,
            handleClose
          ),
          onMouseDown: composeEventHandlers(children.props.onMouseDown, () => {
            handleClose();
            isMouseDownRef.current = true;
            document.addEventListener("mouseup", handleMouseUp, { once: true });
          }),
          onFocus: composeEventHandlers(
            children.props.onFocus,
            () => !isMouseDownRef.current && handleOpen()
          ),
          onBlur: composeEventHandlers(children.props.onBlur, handleClose),
          onClick: composeEventHandlers(
            children.props.onClick,
            (event: KeyboardEvent | MouseEvent) => {
              // keyboard click will occur under different conditions for different node
              // types so we use `onClick` instead of `onKeyDown` to respect that
              const isKeyboardClick = event.detail === 0;
              if (isKeyboardClick) handleClose();
            }
          ),
        })}
        {isOpen && (
          <Portal>
            <div
              ref={(refs as any).floating}
              onMouseEnter={handleOpen}
              onMouseLeave={handleClose}
              {...rest}
              style={{
                position: "absolute",
                top: y ?? "",
                left: x ?? "",
                visibility: referenceHidden ? "hidden" : "visible",
              }}
              data-side={placement.split("-")[0]}
              className={cl(
                "navds-tooltip",
                "navds-detail navds-detail--small",
                className,
                {
                  "navds-tooltip--inverted": inverted,
                }
              )}
            >
              <div
                className="navds-tooltip__inner"
                style={{ ...(staticMargin ? { [staticMargin]: _offset } : "") }}
              >
                {content}
                {keys && (
                  <span className="navds-tooltip__keys">
                    {keys.map((key) => (
                      <Detail
                        size="small"
                        as="kbd"
                        key={key}
                        className={cl("navds-tooltip__key", {
                          "navds-tooltip__key--inverted": inverted,
                        })}
                      >
                        {key}
                      </Detail>
                    ))}
                  </span>
                )}
                {/* </span> */}
                {_arrow && (
                  <div
                    ref={(node) => {
                      arrowRef.current = node;
                    }}
                    className="navds-tooltip__arrow"
                    style={{
                      left: arrowX != null ? `${arrowX}px` : "",
                      top: arrowY != null ? `${arrowY}px` : "",
                      right: "",
                      bottom: "",
                      ...(staticSide ? { [staticSide]: "-4px" } : ""),
                    }}
                  />
                )}
              </div>
            </div>
          </Portal>
        )}
      </>
    );
  }
);

export default Tooltip;

/*
<TooltipPrimitive.Root
      delayDuration={delay}
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Content
        ref={ref}
        {...rest}
        sideOffset={offset}
        side={side}
        className={cl(
          "navds-tooltip",
          "navds-detail navds-detail--small",
          className,
          {
            "navds-tooltip--inverted": inverted,
          }
        )}
      >
        {content}
        {keys && (
          <span>
            {keys.map((key) => (
              <Detail
                size="small"
                as="kbd"
                key={key}
                className={cl("navds-tooltip__key", {
                  "navds-tooltip__key--inverted": inverted,
                })}
              >
                {key}
              </Detail>
            ))}
          </span>
        )}
        {arrow && (
          <TooltipPrimitive.Arrow
            offset={6}
            width={8}
            height={4}
            className="navds-tooltip__arrow"
          />
        )}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Root>


*/
