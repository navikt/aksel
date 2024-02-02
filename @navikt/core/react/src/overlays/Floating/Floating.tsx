import {
  type Middleware,
  type Placement,
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
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createContext } from "../../util/create-context";
import {
  useCallbackRef,
  useClientLayoutEffect,
  useMergeRefs,
} from "../../util/hooks";

/**
 * Definitions
 */
type Measurable = { getBoundingClientRect(): DOMRect };

const SIDE_OPTIONS = ["top", "right", "bottom", "left"] as const;
const ALIGN_OPTIONS = ["start", "center", "end"] as const;

type Side = (typeof SIDE_OPTIONS)[number];
type Align = (typeof ALIGN_OPTIONS)[number];

/**
 * Floating
 */
type FloatingContextValue = {
  anchor: Measurable | null;
  onAnchorChange(anchor: Measurable | null): void;
};

const [FloatingProvider, useFloatingContext] =
  createContext<FloatingContextValue>({
    name: "FloatingContext",
    hookName: "useFloating",
    providerName: "FloatingProvider",
  });

interface FloatingProps {
  children: React.ReactNode;
}

export const Floating = ({ children }: FloatingProps) => {
  const [anchor, setAnchor] = useState<Measurable | null>(null);

  return (
    <FloatingProvider anchor={anchor} onAnchorChange={setAnchor}>
      {children}
    </FloatingProvider>
  );
};

/**
 * FloatingAnchor
 */
interface FloatingAnchorProps extends HTMLAttributes<HTMLDivElement> {
  virtualRef?: React.RefObject<Measurable>;
}

/**
 * `FloatingAnchor` provides an anchor for a Floating instance.
 * Allows anchoring to non-DOM nodes like a cursor position when used with `virtualRef`.
 */
export const FloatingAnchor = forwardRef<HTMLDivElement, FloatingAnchorProps>(
  ({ virtualRef, ...rest }: FloatingAnchorProps, forwardedRef) => {
    const context = useFloatingContext();
    const ref = useRef<HTMLDivElement>(null);

    const mergedRef = useMergeRefs(forwardedRef, ref);

    React.useEffect(() => {
      // Allows anchoring the floating to non-DOM nodes like a cursor position.
      // We replace `anchorRef` with a virtual ref in such cases.
      context.onAnchorChange(virtualRef?.current || ref.current);
    });

    return virtualRef ? null : <div ref={mergedRef} {...rest} />;
  },
);

/**
 * FloatingContent
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
  arrowPadding?: number;
  avoidCollisions?: boolean;
  collisionBoundary?: Boundary | Boundary[];
  collisionPadding?: number | Partial<Record<Side, number>>;
  sticky?: "partial" | "always";
  hideWhenDetached?: boolean;
  updatePositionStrategy?: "optimized" | "always";
  onPlaced?: () => void;
}

/**
 * TODO: Will need to comb trough and remove unnecessary props like avoidCollisions and the like.
 */
export const FloatingContent = forwardRef<HTMLDivElement, FloatingContentProps>(
  (
    {
      side = "bottom",
      sideOffset = 0,
      align = "center",
      alignOffset = 0,
      arrowPadding = 0,
      avoidCollisions = true,
      collisionBoundary = [],
      collisionPadding: collisionPaddingProp = 0,
      sticky = "partial",
      hideWhenDetached = false,
      updatePositionStrategy = "optimized",
      onPlaced,
      ...contentProps
    }: FloatingContentProps,
    forwardedRef,
  ) => {
    const context = useFloatingContext();

    const [content, setContent] = useState<HTMLDivElement | null>(null);
    const mergeRefs = useMergeRefs(forwardedRef, (node) => setContent(node));

    /**
     * TODO: ArrowWidth and arrowHeight should (maybe) be calculated from the arrow element.
     */
    const [arrow, setArrow] = useState<HTMLSpanElement | null>(null);
    const arrowWidth = 0;
    const arrowHeight = 0;

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

    const detectOverflowOptions = {
      padding: collisionPadding,
      boundary: boundary.filter(isNotNull),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: hasExplicitBoundaries,
    };

    const { refs, floatingStyles, placement, isPositioned, middlewareData } =
      useFloating({
        // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
        strategy: "fixed",
        placement: desiredPlacement,
        whileElementsMounted: (...args) => {
          const cleanup = autoUpdate(...args, {
            animationFrame: updatePositionStrategy === "always",
          });
          return cleanup;
        },
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
              limiter: sticky === "partial" ? limitShift() : undefined,
              ...detectOverflowOptions,
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
                "--ac-floating-available-width",
                `${availableWidth}px`,
              );
              contentStyle.setProperty(
                "--ac-floating-available-height",
                `${availableHeight}px`,
              );
              contentStyle.setProperty(
                "--ac-floating-anchor-width",
                `${anchorWidth}px`,
              );
              contentStyle.setProperty(
                "--ac-floating-anchor-height",
                `${anchorHeight}px`,
              );
            },
          }),
          arrow && floatingArrow({ element: arrow, padding: arrowPadding }),
          transformOrigin({ arrowWidth, arrowHeight }),
          hideWhenDetached &&
            hide({ strategy: "referenceHidden", ...detectOverflowOptions }),
        ],
      });

    const [placedSide, placedAlign] = getSideAndAlignFromPlacement(placement);

    const handlePlaced = useCallbackRef(onPlaced);

    useClientLayoutEffect(() => {
      isPositioned && handlePlaced?.();
    }, [isPositioned, handlePlaced]);

    const arrowX = middlewareData.arrow?.x;
    const arrowY = middlewareData.arrow?.y;
    const cannotCenterArrow = middlewareData.arrow?.centerOffset !== 0;

    const [contentZIndex, setContentZIndex] = useState<string>();
    useLayoutEffect(() => {
      if (content) setContentZIndex(window.getComputedStyle(content).zIndex);
    }, [content]);

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
          zIndex: contentZIndex,
          ["--ac-floating-transform-origin" as any]: [
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
            ref={mergeRefs}
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
          />
        </FloatingContentProvider>
      </div>
    );
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

export const FloatingArrow = ({
  width,
  height,
  className,
}: FloatingArrowProps) => {
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
      >
        <polygon points="0,0 30,0 15,10" />
      </svg>
    </span>
  );
};

/**
 * `transformOrigin` is a custom middleware for floating-ui that calculates the transform origin of the floating-element.
 */
function transformOrigin(options: {
  arrowWidth: number;
  arrowHeight: number;
}): Middleware {
  return {
    name: "transformOrigin",
    options,
    fn(data) {
      const { placement, rects, middlewareData } = data;

      const cannotCenterArrow = middlewareData.arrow?.centerOffset !== 0;
      const isArrowHidden = cannotCenterArrow;
      const arrowWidth = isArrowHidden ? 0 : options.arrowWidth;
      const arrowHeight = isArrowHidden ? 0 : options.arrowHeight;

      const [placedSide, placedAlign] = getSideAndAlignFromPlacement(placement);
      const noArrowAlign = { start: "0%", center: "50%", end: "100%" }[
        placedAlign
      ];

      const arrowXCenter = (middlewareData.arrow?.x ?? 0) + arrowWidth / 2;
      const arrowYCenter = (middlewareData.arrow?.y ?? 0) + arrowHeight / 2;

      let x = "";
      let y = "";

      if (placedSide === "bottom") {
        x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
        y = `${-arrowHeight}px`;
      } else if (placedSide === "top") {
        x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
        y = `${rects.floating.height + arrowHeight}px`;
      } else if (placedSide === "right") {
        x = `${-arrowHeight}px`;
        y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
      } else if (placedSide === "left") {
        x = `${rects.floating.width + arrowHeight}px`;
        y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
      }
      return { data: { x, y } };
    },
  };
}

function getSideAndAlignFromPlacement(placement: Placement) {
  const [side, align = "center"] = placement.split("-");
  return [side as Side, align as Align] as const;
}
