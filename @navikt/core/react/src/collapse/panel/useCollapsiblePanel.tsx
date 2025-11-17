import { useEffect, useRef } from "react";
import { useEventCallback } from "../../overlays/overlay/hooks/useEventCallback";
import { useClientLayoutEffect, useMergeRefs } from "../../util/hooks";
import { useCollapsibleRootContext } from "../root/CollapsibleRoot.context";
import type { CollapsibleAnimationType } from "../root/useCollapsibleRoot";
import { useHiddenUntilFound } from "./useHiddenUntilFound";

type UseCollapsiblePanelParams = {
  externalRef: React.ForwardedRef<HTMLDivElement>;
};

/* TODO: Dont add hidden attrb is element is still visible */
function useCollapsiblePanel(params: UseCollapsiblePanelParams) {
  const { externalRef } = params;
  const {
    open,
    animationTypeRef,
    panelRef,
    height,
    width,
    setDimensions,
    abortControllerRef,
    keepMounted,
    runOnceAnimationsFinish,
    setMounted,
    setVisible,
    visible,
  } = useCollapsibleRootContext();

  const { isBeforeMatchRef, hidden } = useHiddenUntilFound();

  const shouldCancelInitialOpenAnimationRef = useRef(open);
  const shouldCancelInitialOpenTransitionRef = useRef(open);

  /**
   * This runs when:
   * - keepMounted: "visible" | "hidden", open/defaultOpen: false
   * - keepMounted: "visible" | "hidden", open/defaultOpen: true
   * - keepMounted: false, open/defaultOpen: true
   * - keepMounted: false, open/defaultOpen: false -> when it opens for the first time
   *
   *
   * If the panel is in the middle of a close transition that is
   * interrupted and re-opens, this won't run as the panel was not unmounted.
   */
  const handlePanelRef = useEventCallback((element: HTMLElement) => {
    if (!element) {
      return undefined;
    }

    if (animationTypeRef.current === null) {
      animationTypeRef.current = getAnimationType(element);
    }

    if (height === undefined || width === undefined) {
      setDimensions({
        height: element.scrollHeight,
        width: element.scrollWidth,
      });

      /* We make sure to disabled transitions on initial mount if defaultOpen/open: true */
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
         * @see https://nolanlawson.com/2018/09/25/accurately-measuring-layout-on-the-web/
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

  useClientLayoutEffect(() => {
    if (animationTypeRef.current === "none" || !panelRef.current) {
      return;
    }

    const panel = panelRef.current;

    if (abortControllerRef.current !== null) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }

    panel.style.setProperty("animation-name", "none");

    setDimensions({ height: panel.scrollHeight, width: panel.scrollWidth });

    if (
      !shouldCancelInitialOpenAnimationRef.current &&
      !isBeforeMatchRef.current
    ) {
      panel.style.removeProperty("animation-name");
    }

    /* When open remove "hidden" instantly and mount panel */
    if (open) {
      setMounted(true);
      setVisible(true);
    } else {
      /* When closing, wait until animation finishes to set `hidden` and unmount panel */
      abortControllerRef.current = new AbortController();
      const signal = abortControllerRef.current.signal;

      /* TODO: Add cancel */
      requestAnimationFrame(() => {
        runOnceAnimationsFinish(() => {
          setDimensions({ height: 0, width: 0 });
          setMounted(false);
          setVisible(false);
          abortControllerRef.current = null;
        }, signal);
      });
    }
  }, [
    abortControllerRef,
    animationTypeRef,
    open,
    panelRef,
    runOnceAnimationsFinish,
    setDimensions,
    setMounted,
    setVisible,
    /**
     * Needed to update dimensions after initially visible
     * Without, keepmounted will stutter on open
     */
    visible,
  ]);

  /**
   * We cant guarantee that "closed"-state equals `display: none` in all cases.
   * If keepMounted="visible" and no animations are applied, we need to make sure
   * setDimensions is reset to a "closed" state. This allows consumer to use a
   * min-height/width in closed state if they want to.
   * @example Token in "open"-state, 4rem in "closed"-state
   * ```
   * width: max(var(--__axc-collapsible-panel-width), 4rem);
   * ```
   */
  useClientLayoutEffect(() => {
    if (
      animationTypeRef.current !== "none" ||
      !panelRef.current ||
      open ||
      keepMounted !== "visible"
    ) {
      return;
    }

    setDimensions({ height: 0, width: 0 });
  }, [animationTypeRef, keepMounted, open, panelRef, setDimensions]);

  /**
   * After the first render we can allow animations to run again.
   * This is needed to prevent animations from running on page load.
   */
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      shouldCancelInitialOpenAnimationRef.current = false;
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const mergedPanelRef = useMergeRefs(externalRef, panelRef, handlePanelRef);

  return {
    hidden,
    ref: mergedPanelRef,
  };
}

/**
 * Detects which animation type is being used (if any).
 *
 * This allows us to handle setting/unsetting various styles and attributes
 * in based on the animation type/orientation.
 */
function getAnimationType(element: HTMLElement): CollapsibleAnimationType {
  const { animationName, transitionDuration } = getComputedStyle(element);

  const hasAnimation = animationName !== "none" && animationName !== "";
  const hasTransition =
    transitionDuration !== "0s" && transitionDuration !== "";

  if (hasAnimation && hasTransition && process.env.NODE_ENV !== "production") {
    console.warn(
      "Aksel: CSS transitions and CSS animations both detected on Collapsible. Only one should be used.",
    );
  }

  if (hasTransition && !hasAnimation) {
    return "css-transition";
  }
  if (hasAnimation && !hasTransition) {
    return "css-animation";
  }
  return "none";
}

export { useCollapsiblePanel };
