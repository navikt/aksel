import { useMemo, useRef, useState } from "react";
import { useAnimationsFinished } from "../../overlays/overlay/hooks/useAnimationsFinished";
import { useEventCallback } from "../../overlays/overlay/hooks/useEventCallback";
import { useTransitionStatus } from "../../overlays/overlay/hooks/useTransitionStatus";
import {
  useClientLayoutEffect,
  useControllableState,
  useId,
} from "../../util/hooks";

type UseCollapsibleRootParams = {
  /**
   * Controls if the collapsible panel is open.
   *
   * To render an uncontrolled collapsible, use the `defaultOpen` prop instead.
   */
  open?: boolean;
  /**
   * Defines if the collapsible panel is open by default.
   *
   * To render a controlled collapsible, use the `open` prop instead.
   * @default false
   */
  defaultOpen: boolean;
  /**
   * Event handler called when the panel is opened or closed.
   */
  onOpenChange: (open: boolean) => void;
  /**
   * If `true`, the collapsible will be disabled.
   * @default false
   */
  disabled: boolean;
  /**
   * Allows the browser’s built-in page search to find and expand the panel contents.
   *
   * Overrides the `keepMounted` prop and uses `hidden="until-found"`
   * to hide the element without removing it from the DOM.
   *
   * @default false
   */
  hiddenUntilFound: boolean;
  /**
   * Keeps element in the DOM while the panel is hidden if `true`.
   *
   * **This prop is ignored when `hiddenUntilFound` is used.**
   * @default false
   */
  keepMounted: boolean;
};

function useCollapsibleRoot(parameters: UseCollapsibleRootParams) {
  const {
    open: openParam,
    defaultOpen,
    onOpenChange,
    disabled,
    hiddenUntilFound,
    keepMounted,
  } = parameters;

  const [open, setOpen] = useControllableState({
    value: openParam,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  const { mounted, setMounted, transitionStatus } = useTransitionStatus(
    open,
    true,
    true,
  );

  const [visible, setVisible] = useState(open);

  const [{ height, width }, setDimensions] = useState<CollapsibleDimensions>({
    height: undefined,
    width: undefined,
  });

  const defaultPanelId = useId();
  const [panelIdState, setPanelIdState] = useState<string | undefined>();
  const panelId = panelIdState ?? defaultPanelId;

  const defaultTriggerId = useId();
  const [triggerIdState, setTriggerIdState] = useState<string | undefined>();
  const triggerId = triggerIdState ?? defaultTriggerId;

  const abortControllerRef = useRef<AbortController | null>(null);
  const animationTypeRef = useRef<CollapsibleAnimationType>(null);
  const transitionDimensionRef = useRef<"width" | "height" | null>(null);
  const panelRef = useRef<HTMLElement | null>(null);

  const runOnceAnimationsFinish = useAnimationsFinished(panelRef, false);

  const handleTrigger = useEventCallback(() => {
    const nextOpen = !open;

    const panel = panelRef.current;

    /**
     * Reset override made with
     * `panel.style.setProperty("animation-name", "none");`
     * in `useCollapsiblePanel`.
     */
    if (animationTypeRef.current === "css-animation" && panel !== null) {
      panel.style.removeProperty("animation-name");
    }

    if (!hiddenUntilFound && !keepMounted && nextOpen) {
      /**
       * We could let `useTransitionStatus` handle this automatically,
       * but by eagerly updating `mounted` here we avoid deferring
       * the update to after next frame, which can cause shifts.
       */
      if (!mounted && animationTypeRef.current !== null) {
        setMounted(true);
      }

      if (animationTypeRef.current === "css-animation" && !visible) {
        setVisible(true);
      }
    }

    setOpen(nextOpen);

    /**
     * We handle the other two animationTypes in `useCollapsiblePanel` separately.
     */
    if (animationTypeRef.current === "none") {
      if (mounted && !nextOpen) {
        setMounted(false);
      }
    }
  });

  /**
   * Unmount immediately when closing in controlled mode and keepMounted={false}
   * and no CSS animations or transitions are applied. This is for when consumer has
   * external buttons/logic that controls open state.
   */
  useClientLayoutEffect(() => {
    const isControlled = openParam !== undefined;
    if (
      isControlled &&
      animationTypeRef.current === "none" &&
      !keepMounted &&
      !open
    ) {
      setMounted(false);
    }
  }, [keepMounted, open, openParam, setMounted]);

  return useMemo(
    () => ({
      abortControllerRef,
      animationTypeRef,
      disabled,
      handleTrigger,
      height,
      mounted,
      open,
      panelId,
      triggerId,
      panelRef,
      runOnceAnimationsFinish,
      setDimensions,
      setMounted,
      setOpen,
      setPanelIdState,
      setTriggerIdState,
      setVisible,
      transitionDimensionRef,
      transitionStatus,
      visible,
      width,
      hiddenUntilFound,
      keepMounted,
    }),
    [
      disabled,
      handleTrigger,
      height,
      hiddenUntilFound,
      keepMounted,
      mounted,
      open,
      panelId,
      runOnceAnimationsFinish,
      setMounted,
      setOpen,
      transitionStatus,
      triggerId,
      visible,
      width,
    ],
  );
}

type CollapsibleAnimationType =
  | "css-transition"
  | "css-animation"
  | "none"
  | null;

interface CollapsibleDimensions {
  height: number | undefined;
  width: number | undefined;
}

export { useCollapsibleRoot };
export type { CollapsibleAnimationType, CollapsibleDimensions };
