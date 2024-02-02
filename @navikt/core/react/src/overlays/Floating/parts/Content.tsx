import {
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
import React, { HTMLAttributes, forwardRef, useState } from "react";
import {
  useCallbackRef,
  useClientLayoutEffect,
  useMergeRefs,
} from "../../../util/hooks";
import {
  FloatingContentProvider,
  useFloatingContext,
} from "../Floating.context";
import { Align, Side } from "../Floating.types";
import {
  getSideAndAlignFromPlacement,
  transformOrigin,
} from "../Floating.utils";

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
    useClientLayoutEffect(() => {
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
