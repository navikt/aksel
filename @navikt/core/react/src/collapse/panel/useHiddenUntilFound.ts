import { useEffect, useMemo, useRef } from "react";
import { useClientLayoutEffect } from "../../util";
import { useCollapsibleRootContext } from "../root/CollapsibleRoot.context";

function useHiddenUntilFound() {
  const {
    open,
    animationTypeRef,
    panelRef,
    setDimensions,
    hiddenUntilFound,
    setOpen,
    visible,
    mounted,
  } = useCollapsibleRootContext();

  const isBeforeMatchRef = useRef(false);

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

  return { isBeforeMatchRef, hidden };
}

export { useHiddenUntilFound };
