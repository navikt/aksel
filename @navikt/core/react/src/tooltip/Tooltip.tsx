import {
  arrow as flArrow,
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  safePolygon,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
} from "@floating-ui/react";
import cl from "clsx";
import React, {
  cloneElement,
  forwardRef,
  HTMLAttributes,
  useMemo,
  useRef,
  useState,
} from "react";
import { Detail, useProvider } from "..";
import { mergeRefs, useId } from "../util";

export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Element tooltip anchors to
   * @note Needs to be React.ReactElement, does not support multiple children/react fragment
   */
  children: React.ReactElement & React.RefAttributes<HTMLElement>;
  /**
   * Open state for contolled tooltip
   */
  open?: boolean;
  /**
   * Tells tooltip to start in open state.
   * Use sparingly synce hover/focus on other elements will close it
   * @note "open"-prop overwrites this
   */
  defaultOpen?: boolean;
  /**
   * Orientation for tooltip
   * @default "top"
   */
  placement?: "top" | "right" | "bottom" | "left";
  /**
   * Toggles rendering of arrow
   * @default true
   */
  arrow?: boolean;
  /**
   * Distance from anchor to tooltip
   * @default 10px with arrow, 2px without arrow
   */
  offset?: number;
  /**
   * Text-content inside tooltip
   */
  content: string;
  /**
   * Sets max allowed character length.
   * @default 80
   */
  maxChar?: number;
  /**
   * Adds a delay in milliseconds before opening tooltip
   * @default 150
   */
  delay?: number;
  /**
   * List of Keyboard-keys for shortcuts
   */
  keys?: string[];
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      children,
      className,
      arrow: _arrow = true,
      placement: _placement = "top",
      open: userOpen,
      defaultOpen = false,
      offset: _offset,
      content,
      delay = 150,
      id,
      keys,
      maxChar = 80,
      ...rest
    },
    ref
  ) => {
    const [open, setOpen] = useState(defaultOpen);
    const arrowRef = useRef<HTMLDivElement | null>(null);
    const rootElement = useProvider()?.rootElement;

    const {
      x,
      y,
      strategy,
      context,
      placement,
      middlewareData: {
        arrow: { x: arrowX, y: arrowY } = {},
        hide: { referenceHidden } = {},
      },
      refs,
    } = useFloating({
      placement: _placement,
      open: userOpen ?? open,
      onOpenChange: setOpen,
      middleware: [
        offset(_offset ? _offset : _arrow ? 10 : 2),
        shift(),
        flip({ padding: 5, fallbackPlacements: ["bottom", "top"] }),
        flArrow({ element: arrowRef, padding: 5 }),
      ],
      whileElementsMounted: autoUpdate,
    });

    const { getReferenceProps, getFloatingProps } = useInteractions([
      useHover(context, { handleClose: safePolygon(), restMs: delay }),
      useFocus(context),
      useDismiss(context),
    ]);

    const ariaId = useId(id);

    const mergedRef = useMemo(
      () => mergeRefs([ref, refs.setFloating]),
      [refs.setFloating, ref]
    );
    const childMergedRef = useMemo(
      () => mergeRefs([(children as any).ref, refs.setReference]),
      [children, refs.setReference]
    );

    if (
      !children ||
      children?.type === React.Fragment ||
      (children as any) === React.Fragment
    ) {
      console.error(
        "<Tooltip> children needs to be a single ReactElement and not: <React.Fragment/> | <></>"
      );
      return null;
    }

    if (content?.length > maxChar) {
      (userOpen ?? open) &&
        console.warn(
          `Because of strict accessibility concers we encourage all Tooltips to have less than 80 characters. Can be overwritten with the maxChar-prop\n\nLength:${content.length}\nTooltip-content: ${content}`
        );
    }

    return (
      <>
        {cloneElement(
          children,
          getReferenceProps({
            ...children.props,
            ref: childMergedRef,
            "aria-describedby":
              userOpen ?? open
                ? cl(ariaId, children?.props["aria-describedby"])
                : children?.props["aria-describedby"],
          })
        )}
        <FloatingPortal root={rootElement}>
          {(userOpen ?? open) && (
            <div
              {...getFloatingProps({
                ...rest,
                ref: mergedRef,
                style: {
                  position: strategy,
                  top: y ?? 0,
                  left: x ?? 0,
                  visibility: referenceHidden ? "hidden" : "visible",
                },
                role: "tooltip",
                id: ariaId,
                className: cl(
                  "navds-tooltip",
                  "navds-detail navds-detail--small",
                  className
                ),
              })}
              data-side={placement}
            >
              {content}
              {keys && (
                <span className="navds-tooltip__keys">
                  {keys.map((key) => (
                    <Detail
                      size="small"
                      as="kbd"
                      key={key}
                      className="navds-tooltip__key"
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
                    [{
                      top: "bottom",
                      right: "left",
                      bottom: "top",
                      left: "right",
                    }[placement]]: "-3.5px",
                  }}
                />
              )}
            </div>
          )}
        </FloatingPortal>
      </>
    );
  }
);

export default Tooltip;
