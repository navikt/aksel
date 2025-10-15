import { useEffect, useRef } from "react";
import { useEventCallback } from "../../overlays/overlay/hooks/useEventCallback";
import { useClientLayoutEffect, useMergeRefs } from "../../util/hooks";
import { useCollapsibleRootContext } from "../root/CollapsibleRoot.context";
import { useHiddenUntilFound } from "./useHiddenUntilFound";

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
    abortControllerRef,
    keepMounted,
    runOnceAnimationsFinish,
    setMounted,
    hiddenUntilFound,
    setVisible,
  } = useCollapsibleRootContext();

  const { isBeforeMatchRef, hidden } = useHiddenUntilFound();

  const latestAnimationNameRef = useRef<string | null>(null);
  const shouldCancelInitialOpenAnimationRef = useRef(open);
  const shouldCancelInitialOpenTransitionRef = useRef(open);

  /**
   * When does this run:
   * - keepMounted: true, open/defaultOpen: false
   * - keepMounted: true, open/defaultOpen: true
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

    /**
     * We start by detecting which animation type is being used (if any), and what orientation.
     * This is only done once per panel instance.
     *
     * This allows us to handle setting/unsetting various styles and attributes
     * in other effects based on the animation type/orientation.
     */
    if (
      animationTypeRef.current === null ||
      transitionDimensionRef.current === null
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
      if (panelStyles.transitionProperty.indexOf("width") > -1) {
        transitionDimensionRef.current = "width";
      } else {
        transitionDimensionRef.current = "height";
      }
    }

    /* Only run code after this if using CSS transitions */
    if (animationTypeRef.current !== "css-transition") {
      return undefined;
    }

    /**
     * Explicitly set `display` to ensure the panel is actually rendered before
     * measuring anything. `!important` is to needed to override a conflicting
     * Tailwind v4 default that sets `display: none !important` on `[hidden]`:
     * @see https://github.com/tailwindlabs/tailwindcss/blob/cd154a4f471e7a63cc27cad15dada650de89d52b/packages/tailwindcss/preflight.css#L320-L326
     */
    element.style.setProperty("display", "block", "important");

    if (height === undefined || width === undefined) {
      setDimensions({
        height: element.scrollHeight,
        width: element.scrollWidth,
      });
      element.style.removeProperty("display");

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
    if (animationTypeRef.current !== "css-transition") {
      return undefined;
    }

    const panel = panelRef.current;

    if (!panel) {
      return undefined;
    }

    let resizeFrame = -1;

    if (abortControllerRef.current !== null) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }

    if (open) {
      /* Opening panel */
      /* See comment in `handlePanelRef` for why we set this */
      panel.style.setProperty("display", "block", "important");

      /**
       * When `keepMounted={false}` and the panel is initially closed, the very
       * first time it opens (not any subsequent opens) `data-entering-style` is
       * off or missing by a frame so we need to set it manually. Otherwise any
       * CSS properties expected to transition using [data-entering-style] may
       * be mis-timed and appear to be complete skipped.
       */
      if (!shouldCancelInitialOpenTransitionRef.current && !keepMounted) {
        panel.setAttribute("data-entering-style", "");
      }

      setDimensions({ height: panel.scrollHeight, width: panel.scrollWidth });

      resizeFrame = requestAnimationFrame(() => {
        panel.style.removeProperty("display");
      });
    } else {
      /* Closing panel */
      setDimensions({ height: panel.scrollHeight, width: panel.scrollWidth });

      abortControllerRef.current = new AbortController();
      const signal = abortControllerRef.current.signal;

      let frame2 = -1;
      const frame1 = requestAnimationFrame(() => {
        /* Wait until [data-exiting-style] is added */
        frame2 = requestAnimationFrame(() => {
          runOnceAnimationsFinish(() => {
            setDimensions({ height: 0, width: 0 });
            setMounted(false);
            abortControllerRef.current = null;
          }, signal);
        });
      });

      return () => {
        cancelAnimationFrame(frame1);
        cancelAnimationFrame(frame2);
      };
    }

    return () => {
      cancelAnimationFrame(resizeFrame);
    };
  }, [
    abortControllerRef,
    animationTypeRef,
    hiddenUntilFound,
    keepMounted,
    mounted,
    open,
    panelRef,
    runOnceAnimationsFinish,
    setDimensions,
    setMounted,
    transitionDimensionRef,
  ]);

  /* Run only if using CSS animations */
  useClientLayoutEffect(() => {
    if (animationTypeRef.current !== "css-animation") {
      return;
    }

    const panel = panelRef.current;
    if (!panel) {
      return;
    }

    latestAnimationNameRef.current =
      panel.style.animationName || latestAnimationNameRef.current;

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
    visible,
  ]);

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

export { useCollapsiblePanel };
