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
    mounted,
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

    if (animationTypeRef.current !== "css-transition") {
      return undefined;
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

  /* Run only if using css transitions */
  useClientLayoutEffect(() => {
    if (animationTypeRef.current !== "css-transition" || !panelRef.current) {
      return;
    }

    const panel = panelRef.current;

    if (abortControllerRef.current !== null) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }

    if (open) {
      const originalLayoutStyles = {
        "justify-content": panel.style.justifyContent,
        "align-items": panel.style.alignItems,
        "align-content": panel.style.alignContent,
        "justify-items": panel.style.justifyItems,
      };

      /* opening */
      Object.keys(originalLayoutStyles).forEach((key) => {
        panel.style.setProperty(key, "initial", "important");
      });

      /**
       * When `keepMounted={false}` and the panel is initially closed, the very
       * first time it opens (not any subsequent opens) `data-entering-style` is
       * off or missing by a frame so we need to set it manually. Otherwise any
       * CSS properties expected to transition using [data-entering-style] may
       * be mis-timed and appear to be complete skipped.
       *
       * How to test:
       * - Set up demo with transition and `data-entering-style` (e.g. opacity)
       * - Test with `keepMounted` "hidden" and false
       * - Keepmounted: false only works consistently if this is set
       * - KeepMounted: "hidden" works fine either way
       */
      if (!shouldCancelInitialOpenTransitionRef.current && !keepMounted) {
        panel.setAttribute("data-entering-style", "");
      }

      setDimensions({ height: panel.scrollHeight, width: panel.scrollWidth });

      let resizeFrame = -1;
      resizeFrame = requestAnimationFrame(() => {
        Object.entries(originalLayoutStyles).forEach(([key, value]) => {
          if (value === "") {
            panel.style.removeProperty(key);
          } else {
            panel.style.setProperty(key, value);
          }
        });
      });

      return () => {
        cancelAnimationFrame(resizeFrame);
      };
    }

    if (panel.scrollHeight === 0 && panel.scrollWidth === 0) {
      return undefined;
    }

    /* Closing panel */
    setDimensions({ height: panel.scrollHeight, width: panel.scrollWidth });

    const abortController = new AbortController();
    abortControllerRef.current = abortController;
    const signal = abortController.signal;

    let attributeObserver: MutationObserver | null = null;

    const endingStyleAttribute = "data-exiting-style";

    /* Wait for `[data-exiting-style]` to be applied */
    attributeObserver = new MutationObserver((mutationList) => {
      const hasEndingStyle = mutationList.some(
        (mutation) =>
          mutation.type === "attributes" &&
          mutation.attributeName === endingStyleAttribute,
      );

      if (hasEndingStyle) {
        attributeObserver?.disconnect();
        attributeObserver = null;
        runOnceAnimationsFinish(() => {
          setDimensions({ height: 0, width: 0 });
          panel.style.removeProperty("content-visibility");
          setMounted(false);
          if (abortControllerRef.current === abortController) {
            abortControllerRef.current = null;
          }
        }, signal);
      }
    });

    attributeObserver.observe(panel, {
      attributes: true,
      attributeFilter: [endingStyleAttribute],
    });

    return () => {
      attributeObserver?.disconnect();

      if (abortControllerRef.current === abortController) {
        abortController.abort();
        abortControllerRef.current = null;
      }
    };
  }, [
    abortControllerRef,
    animationTypeRef,
    keepMounted,
    mounted,
    open,
    panelRef,
    runOnceAnimationsFinish,
    setDimensions,
    setMounted,
  ]);

  /* Run only if using CSS animations */
  useClientLayoutEffect(() => {
    if (animationTypeRef.current !== "css-animation" || !panelRef.current) {
      return;
    }

    const panel = panelRef.current;

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
      if (abortControllerRef.current !== null) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
      setMounted(true);
      setVisible(true);
    } else {
      /* When closing, wait until animation finishes to set `hidden` and unmount panel */
      abortControllerRef.current = new AbortController();
      runOnceAnimationsFinish(() => {
        setMounted(false);
        setVisible(false);
        abortControllerRef.current = null;
      }, abortControllerRef.current.signal);
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
  const panelStyles = getComputedStyle(element);

  const hasAnimation =
    panelStyles.animationName !== "none" && panelStyles.animationName !== "";
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
  }

  if (
    panelStyles.animationName === "none" &&
    panelStyles.transitionDuration !== "0s"
  ) {
    return "css-transition";
  }

  if (
    panelStyles.animationName !== "none" &&
    panelStyles.transitionDuration === "0s"
  ) {
    return "css-animation";
  }

  return "none";
}

export { useCollapsiblePanel };
