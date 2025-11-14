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
  const { open, mounted, animationTypeRef, panelRef } =
    useCollapsibleRootContext();

  const { isBeforeMatchRef, hidden } = useHiddenUntilFound();

  const shouldCancelInitialOpenAnimationRef = useRef(open);
  const isExpandedRef = useRef<boolean | null>(null);
  const raf = useRef<number | null>(null);

  useClientLayoutEffect(() => {
    if (raf.current) {
      cancelAnimationFrame(raf.current);
    }

    if (!panelRef.current) {
      return;
    }

    const panel = panelRef.current;

    if (
      isExpandedRef.current === null ||
      typeof panel.getAnimations !== "function"
    ) {
      // On initial render (and in tests), set attributes without animation.
      if (mounted) {
        panel.style.setProperty("--disclosure-panel-width", "auto");
        panel.style.setProperty("--disclosure-panel-height", "auto");
      } else {
        panel.style.setProperty("--disclosure-panel-width", "0px");
        panel.style.setProperty("--disclosure-panel-height", "0px");
      }
    } else if (mounted !== isExpandedRef.current) {
      if (mounted) {
        panel.style.setProperty(
          "--disclosure-panel-width",
          panel.scrollWidth + "px",
        );
        panel.style.setProperty(
          "--disclosure-panel-height",
          panel.scrollHeight + "px",
        );

        Promise.all(panel.getAnimations().map((a) => a.finished))
          .then(() => {
            // After the animations complete, switch back to auto so the content can resize.
            panel.style.setProperty("--disclosure-panel-width", "auto");
            panel.style.setProperty("--disclosure-panel-height", "auto");
          })
          .catch(() => {});
      } else {
        panel.style.setProperty(
          "--disclosure-panel-width",
          panel.scrollWidth + "px",
        );
        panel.style.setProperty(
          "--disclosure-panel-height",
          panel.scrollHeight + "px",
        );

        // Force style re-calculation to trigger animations.
        getComputedStyle(panel);

        // Animate to zero size.
        panel.style.setProperty("--disclosure-panel-width", "0px");
        panel.style.setProperty("--disclosure-panel-height", "0px");

        /* Promise.all(panel.getAnimations().map((a) => a.finished))
          .then(() => panel.setAttribute("hidden", "until-found"))
          .catch(() => {}); */
      }

      isExpandedRef.current = mounted;
    }
  }, [mounted]);

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
  });

  /**
   * After the first render we can allow animations to run again.
   * This is needed to prevent animations from running on page load.
   */
  useEffect(() => {
    shouldCancelInitialOpenAnimationRef.current = false;
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

function hasWidthTransition(element: HTMLElement): boolean {
  const panelStyles = getComputedStyle(element);

  const transitionProperties = panelStyles.transitionProperty
    .split(",")
    .map((prop) => prop.trim());

  return (
    transitionProperties.includes("width") ||
    transitionProperties.includes("all")
  );
}

export { useCollapsiblePanel };
