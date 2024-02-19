import {
  autoUpdate,
  arrow as flArrow,
  flip,
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
import React, { HTMLAttributes, cloneElement, forwardRef, useRef } from "react";
import { useModalContext } from "../modal/Modal.context";
import Portal from "../overlays/portal/Portal";
import { Detail } from "../typography";
import { useId } from "../util/hooks";
import { useControllableState } from "../util/hooks/useControllableState";
import { useMergeRefs } from "../util/hooks/useMergeRefs";

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
   * Change handler for open
   */
  onOpenChange?: (open: boolean) => void;
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

/**
 * A component that displays a tooltip when the user hovers over its child element.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/tooltip)
 * @see 🏷️ {@link TooltipProps}
 *
 * @example
 * ```jsx
 * <Tooltip content="Skriv ut dokument">
 *   <Button icon={<PrinterLargeIcon title="demo knapp" />} />
 * </Tooltip>
 * ```
 */
export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      children,
      className,
      arrow: _arrow = true,
      placement: _placement = "top",
      open,
      defaultOpen = false,
      onOpenChange,
      offset: _offset,
      content,
      delay = 150,
      id,
      keys,
      maxChar = 80,
      ...rest
    },
    ref,
  ) => {
    const [_open, _setOpen] = useControllableState({
      defaultValue: defaultOpen,
      value: open,
      onChange: onOpenChange,
    });

    const arrowRef = useRef<HTMLDivElement | null>(null);
    const modalContext = useModalContext(false);
    const rootElement = modalContext ? modalContext.ref.current : undefined;

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
      open: _open,
      onOpenChange: (newState) => _setOpen(newState),
      middleware: [
        offset(_offset ? _offset : _arrow ? 10 : 2),
        shift(),
        flip({ padding: 5, fallbackPlacements: ["bottom", "top"] }),
        flArrow({ element: arrowRef, padding: 5 }),
      ],
      whileElementsMounted: modalContext
        ? (reference, floating, update) =>
            // Reduces jumping in Chrome when used in a Modal and it's the first focusable element.
            // Can be removed when autofocus starts working on <dialog> in Chrome. See also Modal.tsx
            autoUpdate(reference, floating, update, { animationFrame: true })
        : autoUpdate,
      strategy: modalContext ? "fixed" : undefined,
    });

    const { getReferenceProps, getFloatingProps } = useInteractions([
      useHover(context, { handleClose: safePolygon(), restMs: delay }),
      useFocus(context),
      useDismiss(context),
    ]);

    const ariaId = useId(id);

    const mergedRef = useMergeRefs(ref, refs.setFloating);
    const childMergedRef = useMergeRefs(children.ref, refs.setReference);

    if (
      !children ||
      children?.type === React.Fragment ||
      (children as any) === React.Fragment
    ) {
      console.error(
        "<Tooltip> children needs to be a single ReactElement and not: <React.Fragment/> | <></>",
      );
      return null;
    }

    if (content?.length > maxChar) {
      _open &&
        console.warn(
          `Because of strict accessibility concers we encourage all Tooltips to have less than 80 characters. Can be overwritten with the maxChar-prop\n\nLength:${content.length}\nTooltip-content: ${content}`,
        );
    }

    return (
      <>
        {cloneElement(
          children,
          getReferenceProps({
            ...children.props,
            ref: childMergedRef,
            "aria-describedby": _open
              ? cl(ariaId, children?.props["aria-describedby"])
              : children?.props["aria-describedby"],
          }),
        )}
        <Portal rootElement={rootElement} asChild>
          {_open && (
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
                  className,
                ),
              })}
              data-side={placement}
            >
              {content}
              {keys && (
                <span className="navds-tooltip__keys">
                  {keys.map((key) => (
                    <Detail as="kbd" key={key} className="navds-tooltip__key">
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
        </Portal>
      </>
    );
  },
);

export default Tooltip;
