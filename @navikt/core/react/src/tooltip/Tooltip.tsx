import cl from "classnames";
import React, {
  forwardRef,
  HTMLAttributes,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import { Detail } from "..";
import {
  useFloating,
  arrow as flArrow,
  shift,
  autoUpdate,
  offset,
  flip,
} from "@floating-ui/react-dom";
import mergeRefs from "react-merge-refs";

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
  strategy?: "absolute" | "fixed";
}

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      children,
      className,
      arrow: _arrow = true,
      side = "top",
      open,
      defaultOpen,
      offset: _offset = 2,
      content,
      delay = 150,
      onOpenChange,
      id,
      inverted = false,
      keys,
      strategy: _strategy = "absolute",
      ...rest
    },
    ref
  ) => {
    const arrowRef = useRef<HTMLDivElement | null>(null);

    const {
      x,
      y,
      update,
      strategy,
      placement,
      refs,
      middlewareData: { arrow: { x: arrowX, y: arrowY } = {} },
    } = useFloating({
      placement: side,
      strategy: _strategy,
      middleware: [
        offset(10),
        shift(),
        flip({ padding: 5, fallbackPlacements: ["bottom", "left"] }),
        flArrow({ element: arrowRef, padding: 5 }),
      ],
    });

    useEffect(() => {
      if (!refs.reference.current || !refs.floating.current) {
        return;
      }

      // Only call this when the floating element is rendered
      return autoUpdate(refs.reference.current, refs.floating.current, update);
    }, [refs.reference, refs.floating, update]);

    const staticSide = {
      top: "bottom",
      right: "left",
      bottom: "top",
      left: "right",
    }[placement.split("-")[0]];

    return (
      <>
        {React.cloneElement(children, {
          ...children.props,
          ref: mergeRefs([(children as any).ref, refs.reference]),
        })}
        <div
          ref={(refs as any).floating}
          {...rest}
          style={{
            position: strategy,
            top: y ?? "",
            left: x ?? "",
          }}
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
            <span style={{ display: "flex" }}>
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
                ...(staticSide ? { [staticSide]: "-4px" } : ""),
              }}
            />
          )}
        </div>
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
