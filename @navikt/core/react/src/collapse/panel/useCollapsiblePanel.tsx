import { useMemo, useRef } from "react";
import { useEventCallback } from "../../overlays/overlay/hooks/useEventCallback";
import { useMergeRefs } from "../../util/hooks";
import { useCollapsibleRootContext } from "../root/CollapsibleRoot.context";

type UseCollapsiblePanelParams = {
  externalRef: React.ForwardedRef<HTMLDivElement>;
};

function useCollapsiblePanel(params: UseCollapsiblePanelParams) {
  const { externalRef } = params;
  const {
    open,
    mounted,
    animationTypeRef,
    visible,
    panelRef,
    transitionDimensionRef,
    height,
    width,
    setDimensions,
  } = useCollapsibleRootContext();

  const isBeforeMatchRef = useRef(false);
  const latestAnimationNameRef = useRef<string>(null);
  const shouldCancelInitialOpenAnimationRef = useRef(open);
  const shouldCancelInitialOpenTransitionRef = useRef(open);

  /**
   * When opening, the `hidden` attribute is removed immediately.
   * When closing, the `hidden` attribute is set after any exit animations runs.
   * TODO: Verify
   */
  const hidden = useMemo(() => {
    if (animationTypeRef.current === "css-animation") {
      return !visible;
    }

    return !open && !mounted;
  }, [open, mounted, visible, animationTypeRef]);

  /**
   * When `keepMounted` is `true` this runs once as soon as it exists in the DOM
   * regardless of initial open state.
   *
   * When `keepMounted` is `false` this runs on every mount, typically every
   * time it opens. If the panel is in the middle of a close transition that is
   * interrupted and re-opens, this won't run as the panel was not unmounted.
   */
  const handlePanelRef = useEventCallback((element: HTMLElement) => {
    if (!element) {
      return undefined;
    }

    if (
      animationTypeRef.current == null ||
      transitionDimensionRef.current == null
    ) {
      const panelStyles = getComputedStyle(element);

      const hasAnimation =
        panelStyles.animationName !== "none" &&
        panelStyles.animationName !== "";
      const hasTransition =
        panelStyles.transitionDuration !== "0s" &&
        panelStyles.transitionDuration !== "";

      /**
       * animationTypeRef is safe to read in render because it's only ever set
       * once here during the first render and never again.
       * https://react.dev/learn/referencing-values-with-refs#best-practices-for-refs
       */
      if (hasAnimation && hasTransition) {
        if (process.env.NODE_ENV !== "production") {
          console.warn(
            "CSS transitions and CSS animations both detected on Collapsible.",
            "Only one of either animation type should be used.",
          );
        }
      } else if (
        panelStyles.animationName === "none" &&
        panelStyles.transitionDuration !== "0s"
      ) {
        animationTypeRef.current = "css-transition";
      } else if (
        panelStyles.animationName !== "none" &&
        panelStyles.transitionDuration === "0s"
      ) {
        animationTypeRef.current = "css-animation";
      } else {
        animationTypeRef.current = "none";
      }

      /**
       * We need to know in advance which side is being collapsed when using CSS
       * transitions in order to set the value of width/height to `0px` momentarily.
       * Setting both to `0px` will break layout.
       */
      if (
        element.getAttribute(AccordionRootDataAttributes.orientation) ===
          "horizontal" ||
        panelStyles.transitionProperty.indexOf("width") > -1
      ) {
        transitionDimensionRef.current = "width";
      } else {
        transitionDimensionRef.current = "height";
      }
    }

    if (animationTypeRef.current !== "css-transition") {
      return undefined;
    }

    /**
     * Explicitly set `display` to ensure the panel is actually rendered before
     * measuring anything. `!important` is to needed to override a conflicting
     * Tailwind v4 default that sets `display: none !important` on `[hidden]`:
     * https://github.com/tailwindlabs/tailwindcss/blob/cd154a4f471e7a63cc27cad15dada650de89d52b/packages/tailwindcss/preflight.css#L320-L326
     */
    element.style.setProperty("display", "block", "important");

    if (height === undefined || width === undefined) {
      setDimensions({
        height: element.scrollHeight,
        width: element.scrollWidth,
      });
      element.style.removeProperty("display");

      if (shouldCancelInitialOpenTransitionRef.current) {
        element.style.setProperty("transition-duration", "0s");
      }
    }

    let frame = -1;
    let nextFrame = -1;

    frame = requestAnimationFrame(() => {
      shouldCancelInitialOpenTransitionRef.current = false;
      nextFrame = requestAnimationFrame(() => {
        /**
         * This is slightly faster than another RAF and is the earliest
         * opportunity to remove the temporary `transition-duration: 0s` that
         * was applied to cancel opening transitions of initially open panels.
         * https://nolanlawson.com/2018/09/25/accurately-measuring-layout-on-the-web/
         */
        setTimeout(() => {
          element.style.removeProperty("transition-duration");
        });
      });
    });

    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(nextFrame);
    };
  });

  const mergedPanelRef = useMergeRefs(externalRef, panelRef, handlePanelRef);

  return {
    hidden,
    ref: mergedPanelRef,
  };
}

export { useCollapsiblePanel };
