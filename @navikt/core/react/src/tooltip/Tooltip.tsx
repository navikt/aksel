import cl from "classnames";
import React, {
  cloneElement,
  forwardRef,
  HTMLAttributes,
  useCallback,
  useEffect,
  useMemo,
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
import { useId } from "../util";

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
  placement?: "top" | "right" | "bottom" | "left";
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
   * @default 300
   */
  delay?: number;
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
      placement: _placement = "top",
      open,
      defaultOpen = false,
      offset: _offset = 10,
      content,
      delay = 300,
      id,
      inverted = false,
      keys,
      id: _id,
      ...rest
    },
    ref
  ) => {
    const arrowRef = useRef<HTMLDivElement | null>(null);
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const openTimerRef = useRef(0);
    const isMouseDownRef = useRef(false);

    const ariaId = useId(_id);

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
      placement: _placement,
      middleware: [
        offset(0),
        shift(),
        flip({ padding: 5, fallbackPlacements: ["bottom", "top"] }),
        flArrow({ element: arrowRef, padding: 5 }),
        hide(),
      ],
    });

    /* https://floating-ui.com/docs/react-dom#updating */
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

    const handleDelayedOpen = useCallback(() => {
      window.clearTimeout(openTimerRef.current);
      openTimerRef.current = window.setTimeout(() => {
        setIsOpen(true);
      }, delay);
    }, [delay, setIsOpen]);

    const handleClose = useCallback(() => {
      window.clearTimeout(openTimerRef.current);
      setIsOpen(false);
    }, [setIsOpen]);

    const handleMouseUp = useCallback(
      () => (isMouseDownRef.current = false),
      []
    );

    useEffect(() => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      return () => window.clearTimeout(openTimerRef.current);
    }, []);

    useEffect(() => {
      return () => document.removeEventListener("mouseup", handleMouseUp);
    }, [handleMouseUp]);

    useEventListener(
      "keydown",
      useCallback((e) => e.key === "Escape" && handleClose(), [handleClose]),
      document
    );

    /* https://floating-ui.com/docs/react-dom#stable-ref-prop */
    const stableRef = useMemo(() => mergeRefs([ref, refs.floating]), [
      ref,
      refs.floating,
    ]);

    if (
      !children ||
      children?.type === React.Fragment ||
      (children as any) === React.Fragment
    ) {
      console.error(
        "<Tooltip> children needs to be a single ReactElement and not <React.Fragment/>/<></>"
      );
      return null;
    }
    console.log(children);

    const staticSide = {
      top: ["bottom", "marginBottom"],
      right: ["left", "marginLeft"],
      bottom: ["top", "marginTop"],
      left: ["right", "marginRight"],
    }[placement.split("-")[0]];

    const ariaProps = {};
    ariaProps["aria-describedby"] =
      open ?? isOpen ? cl(ariaId, children?.props["aria-describedby"]) : null;

    return (
      <>
        {cloneElement(children, {
          ...children.props,
          ...ariaProps,
          ref: mergeRefs([(children as any).ref, refs.reference]),
          onMouseEnter: composeEventHandlers(
            children.props.onMouseEnter,
            handleDelayedOpen
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
        {(open ?? isOpen) && (
          <Portal>
            <div
              ref={stableRef}
              {...rest}
              onMouseEnter={handleOpen}
              onMouseLeave={handleClose}
              role="tooltip"
              id={ariaId}
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
                style={{ ...(staticSide ? { [staticSide[1]]: _offset } : "") }}
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
                      ...(staticSide ? { [staticSide[0]]: "-4px" } : ""),
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
