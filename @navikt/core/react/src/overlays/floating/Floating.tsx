import {
  FlipOptions,
  Placement,
  autoUpdate,
  flip,
  arrow as floatingArrow,
  hide,
  limitShift,
  offset,
  shift,
  size,
  useFloating,
} from "@floating-ui/react-dom";
import React, {
  HTMLAttributes,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { useModalContext } from "../../modal/Modal.context";
import { Slot } from "../../slot/Slot";
import { createContext } from "../../util/create-context";
import {
  useCallbackRef,
  useClientLayoutEffect,
  useMergeRefs,
} from "../../util/hooks";
import { useOpenChangeAnimationComplete } from "../../util/hooks/useOpenChangeAnimationComplete";
import { AsChildProps } from "../../util/types";
import {
  type Align,
  type Measurable,
  type Side,
  getSideAndAlignFromPlacement,
  transformOrigin,
} from "./Floating.utils";

/**
 * Floating Root
 */
type FloatingContextValue = {
  anchor: Measurable | null;
  onAnchorChange: (anchor: Measurable | null) => void;
};

export const [FloatingProvider, useFloatingContext] =
  createContext<FloatingContextValue>({
    name: "FloatingContext",
    hookName: "useFloating",
    providerName: "FloatingProvider",
  });

interface FloatingProps {
  children: React.ReactNode;
}

interface FloatingComponent extends React.FC<FloatingProps> {
  Anchor: typeof FloatingAnchor;
  Content: typeof FloatingContent;
}

const Floating: FloatingComponent = ({ children }: FloatingProps) => {
  const [anchor, setAnchor] = useState<Measurable | null>(null);

  return (
    <FloatingProvider anchor={anchor} onAnchorChange={setAnchor}>
      {children}
    </FloatingProvider>
  );
};

/**
 * Floating Anchor
 */
type FloatingAnchorProps = HTMLAttributes<HTMLDivElement> &
  AsChildProps & {
    virtualRef?: React.RefObject<Measurable>;
  };

/**
 * `FloatingAnchor` provides an anchor for a Floating instance.
 * Allows anchoring to non-DOM nodes like a cursor position when used with `virtualRef`.
 */
const FloatingAnchor = forwardRef<HTMLDivElement, FloatingAnchorProps>(
  ({ virtualRef, asChild, ...rest }: FloatingAnchorProps, forwardedRef) => {
    const context = useFloatingContext();
    const ref = useRef<HTMLDivElement>(null);

    const mergedRef = useMergeRefs(forwardedRef, ref);

    useEffect(() => {
      // Allows anchoring the floating to non-DOM nodes like a cursor position.
      // We replace `anchorRef` with a virtual ref in such cases.
      context.onAnchorChange(virtualRef?.current || ref.current);
    });

    const Comp = asChild ? Slot : "div";

    return virtualRef ? null : <Comp ref={mergedRef} {...rest} />;
  },
);

/**
 * Floating Arrow
 */
const OPPOSITE_SIDE: Record<Side, Side> = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right",
};

interface FloatingArrowProps {
  className?: string;
  width?: number;
  height?: number;
}

const FloatingArrow = ({ width, height, className }: FloatingArrowProps) => {
  const context = useFloatingContentContext();

  const side = OPPOSITE_SIDE[context.placedSide];

  return (
    <span
      ref={context.onArrowChange}
      style={{
        position: "absolute",
        left: context.arrowX,
        top: context.arrowY,
        [side]: 0,
        transformOrigin: {
          top: "",
          right: "0 0",
          bottom: "center 0",
          left: "100% 0",
        }[context.placedSide],
        transform: {
          top: "translateY(100%)",
          right: "translateY(50%) rotate(90deg) translateX(-50%)",
          bottom: `rotate(180deg)`,
          left: "translateY(50%) rotate(-90deg) translateX(50%)",
        }[context.placedSide],
        visibility: context.hideArrow ? "hidden" : undefined,
      }}
      aria-hidden
    >
      <svg
        className={className}
        width={width}
        height={height}
        viewBox="0 0 30 10"
        preserveAspectRatio="none"
        style={{ display: "block" }}
      >
        <polygon points="0,0 30,0 15,10" />
      </svg>
    </span>
  );
};

/**
 * Floating Content
 */
type FloatingContentContextValue = {
  placedSide: Side;
  onArrowChange: (arrow: HTMLSpanElement | null) => void;
  arrowX?: number;
  arrowY?: number;
  hideArrow: boolean;
};

const [FloatingContentProvider, useFloatingContentContext] =
  createContext<FloatingContentContextValue>({
    name: "FloatingContentContext",
    hookName: "useFloatingContentContext",
    providerName: "FloatingContentProvider",
  });

type Boundary = Element | null;

interface FloatingContentProps extends HTMLAttributes<HTMLDivElement> {
  side?: Side;
  sideOffset?: number;
  align?: Align;
  alignOffset?: number;
  avoidCollisions?: boolean;
  collisionBoundary?: Boundary | Boundary[];
  collisionPadding?: number | Partial<Record<Side, number>>;
  hideWhenDetached?: boolean;
  updatePositionStrategy?: "optimized" | "always";
  fallbackPlacements?: FlipOptions["fallbackPlacements"];
  onPlaced?: () => void;
  /**
   * @default true
   */
  enabled?: boolean;
  /**
   * Only use this option if your floating element is conditionally rendered, not hidden with CSS.
   * @default true
   */
  autoUpdateWhileMounted?: boolean;
  arrow?: {
    className?: string;
    padding?: number;
    width: number;
    height: number;
  };
}

const FloatingContent = forwardRef<HTMLDivElement, FloatingContentProps>(
  (
    {
      children,
      side = "bottom",
      sideOffset = 0,
      align = "center",
      alignOffset = 0,
      avoidCollisions = true,
      collisionBoundary = [],
      collisionPadding: collisionPaddingProp = 0,
      hideWhenDetached = false,
      updatePositionStrategy = "optimized",
      onPlaced,
      arrow: _arrow,
      fallbackPlacements,
      enabled = true,
      autoUpdateWhileMounted = true,
      ...contentProps
    }: FloatingContentProps,
    forwardedRef,
  ) => {
    const context = useFloatingContext();
    const modalContext = useModalContext(false);

    const arrowDefaults = {
      padding: 5,
      width: 0,
      height: 0,
      ..._arrow,
    };
    const [arrow, setArrow] = useState<HTMLSpanElement | null>(null);
    const arrowWidth = arrowDefaults.width;
    const arrowHeight = arrowDefaults.height;

    const desiredPlacement = (side +
      (align !== "center" ? "-" + align : "")) as Placement;

    const collisionPadding =
      typeof collisionPaddingProp === "number"
        ? collisionPaddingProp
        : { top: 0, right: 0, bottom: 0, left: 0, ...collisionPaddingProp };

    const boundary = Array.isArray(collisionBoundary)
      ? collisionBoundary
      : [collisionBoundary];

    const hasExplicitBoundaries = boundary.length > 0;

    /**
     * .filter(x => x !== null) does not narrow the type of the array enough.
     */
    function isNotNull<T>(value: T | null): value is T {
      return value !== null;
    }

    const detectOverflowOptions: FlipOptions = {
      padding: collisionPadding,
      boundary: boundary.filter(isNotNull),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: hasExplicitBoundaries,
      /* https://floating-ui.com/docs/flip#fallbackaxissidedirection */
      fallbackAxisSideDirection: "end",
      fallbackPlacements,
    };

    const {
      refs,
      floatingStyles,
      placement,
      isPositioned,
      middlewareData,
      elements: floatingElements,
      update,
    } = useFloating({
      open: enabled,
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: desiredPlacement,
      whileElementsMounted: autoUpdateWhileMounted
        ? (...args) => {
            const cleanup = autoUpdate(...args, {
              animationFrame: updatePositionStrategy === "always",
            });
            return cleanup;
          }
        : undefined,
      elements: {
        reference: context.anchor,
      },
      middleware: [
        offset({
          mainAxis: sideOffset + arrowHeight,
          alignmentAxis: alignOffset,
        }),
        avoidCollisions &&
          shift({
            mainAxis: true,
            crossAxis: false,
            limiter: limitShift(),
          }),
        avoidCollisions && flip({ ...detectOverflowOptions }),
        size({
          ...detectOverflowOptions,
          apply: ({ elements, rects, availableWidth, availableHeight }) => {
            const { width: anchorWidth, height: anchorHeight } =
              rects.reference;
            const contentStyle = elements.floating.style;
            /**
             * Allows styling and animations based on the available space.
             */
            contentStyle.setProperty(
              "--__axc-floating-available-width",
              `${availableWidth}px`,
            );
            contentStyle.setProperty(
              "--__axc-floating-available-height",
              `${availableHeight}px`,
            );
            contentStyle.setProperty(
              "--__axc-floating-anchor-width",
              `${anchorWidth}px`,
            );
            contentStyle.setProperty(
              "--__axc-floating-anchor-height",
              `${anchorHeight}px`,
            );
          },
        }),
        arrow &&
          floatingArrow({ element: arrow, padding: arrowDefaults.padding }),
        transformOrigin({ arrowWidth, arrowHeight }),
        hideWhenDetached &&
          hide({ strategy: "referenceHidden", ...detectOverflowOptions }),
      ],
    });

    useEffect(() => {
      if (autoUpdateWhileMounted || !enabled) {
        return;
      }
      if (floatingElements.reference && floatingElements.floating) {
        const cleanup = autoUpdate(
          floatingElements.reference,
          floatingElements.floating,
          update,
        );

        return () => {
          cleanup();
        };
      }
    }, [autoUpdateWhileMounted, enabled, floatingElements, update]);

    useOpenChangeAnimationComplete({
      enabled: !!modalContext?.ref,
      open: enabled,
      ref: modalContext?.ref,
      onComplete: update,
    });

    const [placedSide, placedAlign] = getSideAndAlignFromPlacement(placement);

    const handlePlaced = useCallbackRef(onPlaced);

    useClientLayoutEffect(() => {
      isPositioned && handlePlaced?.();
    }, [isPositioned, handlePlaced]);

    const arrowX = middlewareData.arrow?.x;
    const arrowY = middlewareData.arrow?.y;
    const cannotCenterArrow = middlewareData.arrow?.centerOffset !== 0;

    return (
      <div
        ref={refs.setFloating}
        data-aksel-floating-content-wrapper=""
        style={{
          ...floatingStyles,
          transform: isPositioned
            ? floatingStyles.transform
            : "translate(0, -200%)", // keep off the page when measuring
          minWidth: "max-content",
          zIndex: "9999999",
          ["--__axc-floating-transform-origin" as any]: [
            middlewareData.transformOrigin?.x,
            middlewareData.transformOrigin?.y,
          ].join(" "),
        }}
        // Floating UI uses the `dir` attribute on the reference/floating node for logical alignment.
        // This attribute is necessary for both portalled and inline calculations.
        dir="ltr"
      >
        <FloatingContentProvider
          placedSide={placedSide}
          onArrowChange={setArrow}
          arrowX={arrowX}
          arrowY={arrowY}
          hideArrow={cannotCenterArrow}
        >
          <div
            ref={forwardedRef}
            data-side={placedSide}
            data-align={placedAlign}
            {...contentProps}
            style={{
              ...contentProps.style,
              // if the FloatingContent hasn't been placed yet (not all measurements done)
              // we prevent animations so that users's animation don't kick in too early referring wrong sides
              animation: !isPositioned ? "none" : undefined,
              // hide the content if using the hide middleware and should be hidden
              opacity: middlewareData.hide?.referenceHidden ? 0 : undefined,
            }}
          >
            {children}
            {_arrow?.height && _arrow?.width && (
              <FloatingArrow
                width={_arrow.width}
                height={_arrow.height}
                className={_arrow.className}
              />
            )}
          </div>
        </FloatingContentProvider>
      </div>
    );
  },
);

Floating.Anchor = FloatingAnchor;
Floating.Content = FloatingContent;

export { Floating };
