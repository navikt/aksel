import { useCallback, useEffect, useState } from "react";
import mergeRefs from "../../mergeRefs";
import { useClientLayoutEffect } from "../../useClientLayoutEffect";
import { useId } from "../../useId";
import { createContext } from "../context/create-context";
import { createDescendantContext } from "../descendants/useDescendant";
import { useControllableState } from "../useControllableState";
import { UseTabListProps, UseTabProps, UseTabsProps } from "./types";

/**
 * Descendant-context used to track active tab/tabpanels and implement rowing-tabindex
 */
export const [
  TabsDescendantsProvider,
  useTabsDescendantsContext,
  useTabsDescendants,
  useTabsDescendant,
] = createDescendantContext<HTMLButtonElement, { value: string }>();

/**
 * Tabs hook that providing states for tabs-component and hooks
 * Returned object will be passed unto a Context Provider.
 */
export function useTabs(props: UseTabsProps) {
  const {
    defaultValue,
    onChange,
    value,
    selectionFollowsFocus = false,
    loop = true,
    ...htmlProps
  } = props;

  /**
   * Based on `selectionFolowsFocus` focus might or might not match selectedValue.
   * So a separate state is needed for those cases
   */
  // TODO: fallback to null or ""?
  const [focusedValue, setFocusedValue] = useState(defaultValue ?? "");

  const [selectedValue, setSelectedValue] = useControllableState({
    // TODO: fallback to null or ""?
    defaultValue: defaultValue ?? "",
    value,
    onChange,
  });

  /**
   * Sync focused `value` with controlled `selectedValue`
   */
  useEffect(() => {
    if (value != null) {
      setFocusedValue(value);
    }
  }, [value]);

  /**
   * `useDescendants` is the controller for tab-nodes
   */
  const descendants = useTabsDescendants();

  /**
   * Generate a unique id or use user-provided id for the tabs widget
   */
  // TODO: Users ID will now be overwritten
  const uuid = useId();
  const uid = props.id ?? uuid;
  const id = `tabs-${uid}`;

  return {
    id,
    selectedValue,
    focusedValue,
    setSelectedValue,
    setFocusedValue,
    descendants,
    htmlProps,
    selectionFollowsFocus,
    loop,
  };
}

export type UseInternalTabs = {
  size: "medium" | "small";
  iconPosition: "left" | "top";
};

export const [InternalTabsProvider, useInternalTabsContext] =
  createContext<UseInternalTabs>({
    name: "InternalTabsContext",
    errorMessage:
      "useInternalTabsContext: `context` is undefined. Seems you forgot to wrap all tabs components within <Tabs />",
  });

export type UseTabsReturn = Omit<
  ReturnType<typeof useTabs>,
  "htmlProps" | "descendants"
>;

export const [TabsProvider, useTabsContext] = createContext<UseTabsReturn>({
  name: "TabsContext",
  errorMessage:
    "useTabsContext: `context` is undefined. Seems you forgot to wrap all tabs components within <Tabs />",
});

/**
 * TabList hook to manage multiple tab buttons,
 * and ensures only one tab is selected at a time.
 */
export function useTabList<P extends UseTabListProps>(props: P) {
  const { focusedValue, loop = true } = useTabsContext();

  const descendants = useTabsDescendantsContext();

  /**
   * Implements rowing-tabindex for horizontal tabs
   */
  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      /**
       * Tabs.Tab is registered with its prop 'value'.
       * We can then use it to find the current focuses descendant
       */
      const idx = descendants
        .values()
        .findIndex((x) => x.value === focusedValue);

      const nextTab = () => {
        const next = descendants.nextEnabled(idx, loop);
        next && next.node?.focus();
      };
      const prevTab = () => {
        const prev = descendants.prevEnabled(idx, loop);
        prev && prev.node?.focus();
      };
      const firstTab = () => {
        const first = descendants.firstEnabled();
        first && first.node?.focus();
      };
      const lastTab = () => {
        const last = descendants.lastEnabled();
        last && last.node?.focus();
      };

      const keyMap: Record<string, React.KeyboardEventHandler> = {
        ArrowLeft: prevTab,
        ArrowRight: nextTab,
        Home: firstTab,
        End: lastTab,
      };

      const action = keyMap[event.key];

      if (action) {
        event.preventDefault();
        action(event);
      }
    },
    [descendants, focusedValue, loop]
  );

  return {
    ...props,
    role: "tablist",
    "aria-orientation": "horizontal",
    onKeyDown: (e) => {
      props?.onKeyDown?.(e);
      onKeyDown(e);
    },
  };
}

export type UseTabListReturn = ReturnType<typeof useTabList>;

/**
 * Tabs hook to manage each tab.
 */
export function useTab<P extends UseTabProps>(
  props: P,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const { disabled = false, value, ...htmlProps } = props;

  const {
    setSelectedValue,
    selectionFollowsFocus,
    id,
    setFocusedValue,
    selectedValue,
  } = useTabsContext();

  const { register } = useTabsDescendant({
    disabled,
    // TODO: Fallback to null or ""?
    value: value ?? "",
  });

  const isSelected = value === selectedValue;

  const onClick = () => setSelectedValue(value);

  const onFocus = () => {
    setFocusedValue(value);

    const shouldSelect = selectionFollowsFocus && !disabled;
    shouldSelect && setSelectedValue(value);
  };

  return {
    ...htmlProps,
    ref: mergeRefs([register, ref]),
    // TODO: Create util-function to handle cases where user and local function should be called
    onClick: (e) => {
      props?.onClick?.(e);
      onClick();
    },
    id: makeTabId(id, value),
    role: "tab",
    tabIndex: isSelected ? 0 : -1,
    type: "button",
    "aria-selected": isSelected,
    "aria-controls": makeTabPanelId(id, value),
    onFocus: disabled
      ? undefined
      : (e) => {
          // TODO: Create util-function to handle cases where user and local function should be called
          props?.onFocus?.(e);
          onFocus();
        },
  };
}

/**
 * Tabs hook for managing the visible/hidden state of Tabs.Panel
 */
export function useTabPanel(props: Record<string, any>) {
  const context = useTabsContext();

  const { id, selectedValue } = context;

  const { value, ...htmlProps } = props;

  return {
    tabIndex: 0,
    ...htmlProps,
    role: "tabpanel",
    "aria-labelledby": makeTabId(id, value),
    hidden: selectedValue !== value,
    id: makeTabPanelId(id, value),
  };
}

/**
 * Tabs hook creating an animated indicator for active tab.
 */
export function useTabIndicator(): React.CSSProperties {
  const context = useTabsContext();
  const descendants = useTabsDescendantsContext();

  const { selectedValue } = context;

  // Get the clientRect of the selected tab
  const [rect, setRect] = useState(() => {
    return { left: 0, width: 0 };
  });

  const [hasMeasured, setHasMeasured] = useState(false);

  // Update the selected tab rect when the selectedIndex changes
  useClientLayoutEffect(() => {
    if (selectedValue == null) return;

    const tab = descendants.values().find((x) => x.value === selectedValue);
    if (tab == null) return;

    // Horizontal Tab: Calculate width and left distance
    setRect({ left: tab.node.offsetLeft, width: tab.node.offsetWidth });

    // Prevent unwanted transition from 0 to measured rect
    // by setting the measured state in the next tick
    const id = requestAnimationFrame(() => {
      setHasMeasured(true);
    });

    return () => {
      id && cancelAnimationFrame(id);
    };
  }, [descendants, selectedValue]);

  return {
    position: "absolute",
    transitionProperty: "left, right, top, bottom, height, width",
    transitionDuration: hasMeasured ? "200ms" : "0ms",
    transitionTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
    ...rect,
  };
}

function makeTabId(id: string, value: string) {
  return `${id}--tab-${value}`;
}

function makeTabPanelId(id: string, value: string) {
  return `${id}--tabpanel-${value}`;
}
