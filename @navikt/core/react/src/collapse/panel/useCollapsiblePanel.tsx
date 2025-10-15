import { useEffect, useMemo, useRef } from "react";
import { useEventCallback } from "../../overlays/overlay/hooks/useEventCallback";
import { useClientLayoutEffect, useMergeRefs } from "../../util/hooks";
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
    abortControllerRef,
    keepMounted,
    runOnceAnimationsFinish,
    setMounted,
    hiddenUntilFound,
    setVisible,
    setOpen,
  } = useCollapsibleRootContext();

  const isBeforeMatchRef = useRef(false);
  const latestAnimationNameRef = useRef<string | null>(null);
  const shouldCancelInitialOpenAnimationRef = useRef(open);
  const shouldCancelInitialOpenTransitionRef = useRef(open);

  /**
   * When opening, the `hidden` attribute is removed immediately.
   * When closing, the `hidden` attribute is set after any exit animations runs.
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

    /* Only run code after this if using css transitions */
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
      /* opening */
      panel.style.setProperty("display", "block", "important");

      /**
       * When `keepMounted={false}` and the panel is initially closed, the very
       * first time it opens (not any subsequent opens) `data-starting-style` is
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
      /* closing */
      setDimensions({ height: panel.scrollHeight, width: panel.scrollWidth });

      abortControllerRef.current = new AbortController();
      const signal = abortControllerRef.current.signal;

      let frame2 = -1;
      const frame1 = requestAnimationFrame(() => {
        // Wait until the `[data-ending-style]` attribute is added.
        frame2 = requestAnimationFrame(() => {
          runOnceAnimationsFinish(() => {
            setDimensions({ height: 0, width: 0 });
            panel.style.removeProperty("content-visibility");
            panel.style.removeProperty("display");
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

    if (open) {
      if (abortControllerRef.current != null) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
      setMounted(true);
      setVisible(true);
    } else {
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

  /* On mount */
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      shouldCancelInitialOpenAnimationRef.current = false;
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  /* Handle hiddenUntilFound opening */
  useClientLayoutEffect(() => {
    if (!hiddenUntilFound) {
      return undefined;
    }

    const panel = panelRef.current;
    if (!panel) {
      return undefined;
    }

    let frame = -1;
    let nextFrame = -1;

    if (open && isBeforeMatchRef.current) {
      panel.style.transitionDuration = "0s";
      setDimensions({ height: panel.scrollHeight, width: panel.scrollWidth });
      frame = requestAnimationFrame(() => {
        isBeforeMatchRef.current = false;
        nextFrame = requestAnimationFrame(() => {
          setTimeout(() => {
            panel.style.removeProperty("transition-duration");
          });
        });
      });
    }

    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(nextFrame);
    };
  }, [hiddenUntilFound, open, panelRef, setDimensions]);

  useClientLayoutEffect(() => {
    const panel = panelRef.current;

    if (panel && hiddenUntilFound && hidden) {
      /**
       * React only supports a boolean for the `hidden` attribute and forces
       * legit string values to booleans so we have to force it back in the DOM
       * when necessary: https://github.com/facebook/react/issues/24740
       */
      panel.setAttribute("hidden", "until-found");
      /**
       * Set data-entering-style here to persist the closed styles, this is to
       * prevent transitions from starting when the `hidden` attribute changes
       * to `'until-found'` as they could have different `display` properties:
       * https://github.com/tailwindlabs/tailwindcss/pull/14625
       *
       */
      /* TODO: Unsure if needed, need verification */
      if (animationTypeRef.current === "css-transition") {
        panel.setAttribute("data-entering-style", "");
      }
    }
  }, [hiddenUntilFound, hidden, animationTypeRef, panelRef]);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) {
      return undefined;
    }

    function handleBeforeMatch() {
      isBeforeMatchRef.current = true;
      setOpen(true);
    }

    panel.addEventListener("beforematch", handleBeforeMatch);

    return () => {
      panel.removeEventListener("beforematch", handleBeforeMatch);
    };
  }, [panelRef, setOpen]);

  const mergedPanelRef = useMergeRefs(externalRef, panelRef, handlePanelRef);

  return {
    hidden,
    ref: mergedPanelRef,
  };
}

export { useCollapsiblePanel };
