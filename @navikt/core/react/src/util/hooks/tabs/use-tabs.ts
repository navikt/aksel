import { useCallback, useEffect, useState } from "react";
import { useClientLayoutEffect } from "../../useClientLayoutEffect";
import { useId } from "../../useId";
import { createContext } from "../context/create-context";
import { createDescendantContext } from "../descendants/useDescendant";
import { useControllableState } from "../useControllableState";

/* -------------------------------------------------------------------------------------------------
 * Create context to track descendants and their indices
 * -----------------------------------------------------------------------------------------------*/

export const [
  TabsDescendantsProvider,
  useTabsDescendantsContext,
  useTabsDescendants,
  useTabsDescendant,
] = createDescendantContext<HTMLButtonElement, { value: string }>();

/* -------------------------------------------------------------------------------------------------
 * useTabs - The root react hook that manages all tab items
 * -----------------------------------------------------------------------------------------------*/

export interface UseTabsProps {
  /**
   * If `true`, the tabs will be manually activated and
   * display its panel by pressing Space or Enter.
   *
   * If `false`, the tabs will be automatically activated
   * and their panel is displayed when they receive focus.
   *
   * @default false
   */
  isManual?: boolean;
  /**
   * Callback when the index (controlled or un-controlled) changes.
   */
  onChange?: (value: string) => void;
  /**
   * The index of the selected tab (in controlled mode)
   */
  value?: string;
  /**
   * The initial index of the selected tab (in uncontrolled mode)
   */
  defaultValue?: string;
  /**
   * The id of the tab
   */
  id?: string;
  /**
   * Performance 🚀:
   * If `true`, rendering of the tab panel's will be deferred until it is selected.
   * @default false
   */
  isLazy?: boolean;
}

/**
 * Tabs hook that provides all the states, and accessibility
 * helpers to keep all things working properly.
 *
 * Its returned object will be passed unto a Context Provider
 * so all child components can read from it.
 * There is no document link yet
 * @see Docs https://chakra-ui.com/docs/components/useTabs
 * @see WAI-ARIA https://www.w3.org/WAI/ARIA/apg/patterns/tabpanel/
 */
export function useTabs(props: UseTabsProps) {
  const { defaultValue, onChange, value, isManual, isLazy, ...htmlProps } =
    props;

  /**
   * We use this to keep track of the index of the focused tab.
   *
   * Tabs can be automatically activated, this means selection follows focus.
   * When we navigate with the arrow keys, we move focus and selection to next/prev tab
   *
   * Tabs can also be manually activated, this means selection does not follow focus.
   * When we navigate with the arrow keys, we only move focus NOT selection. The user
   * will need not manually activate the tab using `Enter` or `Space`.
   *
   * This is why we need to keep track of the `focusedIndex` and `selectedIndex`
   */
  const [focusedValue, setFocusedValue] = useState(defaultValue ?? "");

  const [selectedValue, setSelectedValue] = useControllableState({
    defaultValue: defaultValue ?? "",
    value,
    onChange,
  });

  /**
   * Sync focused `value` with controlled `selectedValue` (which is the `props.value`)
   */
  useEffect(() => {
    if (value != null) {
      setFocusedValue(value);
    }
  }, [value]);

  /**
   * Think of `useDescendants` as a register for the tab nodes.
   */
  const descendants = useTabsDescendants();

  /**
   * Generate a unique id or use user-provided id for the tabs widget
   */
  const uuid = useId();
  const uid = props.id ?? uuid;
  const id = `tabs-${uid}`;

  return {
    id,
    selectedValue,
    focusedValue,
    setSelectedValue,
    setFocusedValue,
    isManual,
    isLazy,
    descendants,
    htmlProps,
  };
}

export type UseTabsReturn = Omit<
  ReturnType<typeof useTabs>,
  "htmlProps" | "descendants"
>;

export const [TabsProvider, useTabsContext] = createContext<UseTabsReturn>({
  name: "TabsContext",
  errorMessage:
    "useTabsContext: `context` is undefined. Seems you forgot to wrap all tabs components within <Tabs />",
});

export interface UseTabListProps {
  children?: React.ReactNode;
  onKeyDown?: React.KeyboardEventHandler;
  ref?: React.Ref<any>;
}

/**
 * Tabs hook to manage multiple tab buttons,
 * and ensures only one tab is selected per time.
 *
 * @param props props object for the tablist
 */
export function useTabList<P extends UseTabListProps>(props: P) {
  const { focusedValue } = useTabsContext();

  const descendants = useTabsDescendantsContext();

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const idx = descendants
        .values()
        .findIndex((x) => x.value === focusedValue);
      const nextTab = () => {
        const next = descendants.nextEnabled(idx);
        if (next) next.node?.focus();
      };
      const prevTab = () => {
        const prev = descendants.prevEnabled(idx);
        if (prev) prev.node?.focus();
      };
      const firstTab = () => {
        const first = descendants.firstEnabled();
        if (first) first.node?.focus();
      };
      const lastTab = () => {
        const last = descendants.lastEnabled();
        if (last) last.node?.focus();
      };

      const eventKey = event.key;

      const ArrowStart = "ArrowLeft";
      const ArrowEnd = "ArrowRight";

      const keyMap: Record<string, React.KeyboardEventHandler> = {
        [ArrowStart]: () => prevTab(),
        [ArrowEnd]: () => nextTab(),
        Home: firstTab,
        End: lastTab,
      };

      const action = keyMap[eventKey];

      if (action) {
        event.preventDefault();
        action(event);
      }
    },
    [descendants, focusedValue]
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

export interface UseTabOptions {
  /**
   * If `true`, the `Tab` won't be toggleable
   * @default false
   */
  isDisabled?: boolean;
  /**
   * If `true` and `isDisabled`, the `Tab` will be focusable but not interactive.
   * @default false
   */
  isFocusable?: boolean;
}

export interface UseTabProps extends UseTabOptions {
  onClick?: React.MouseEventHandler;
  onFocus?: React.FocusEventHandler;
  ref?: React.Ref<HTMLButtonElement>;
  value: string;
}

/**
 * Tabs hook to manage each tab button.
 *
 * A tab can be disabled and focusable, or both,
 * hence the use of `useClickable` to handle this scenario
 */
export function useTab<P extends UseTabProps>(props: P) {
  const { isDisabled = false, isFocusable = false, ...htmlProps } = props;

  const { setSelectedValue, isManual, id, setFocusedValue, selectedValue } =
    useTabsContext();

  const { register } = useTabsDescendant({
    disabled: isDisabled && !isFocusable,
    value: htmlProps?.value ?? "",
  });

  const isSelected = htmlProps?.value === selectedValue;

  const onClick = () => {
    setSelectedValue(htmlProps?.value);
  };

  const onFocus = () => {
    setFocusedValue(htmlProps.value);
    const isDisabledButFocusable = isDisabled && isFocusable;
    const shouldSelect = !isManual && !isDisabledButFocusable;
    if (shouldSelect) {
      setSelectedValue(htmlProps.value);
    }
  };

  const clickableProps = {
    ...htmlProps,
    ref: register, //mergeRefs([register, props?.ref]),
    isDisabled,
    isFocusable,
    onClick: (e) => {
      props?.onClick?.(e);
      onClick();
    },
  };

  const type: "button" | "submit" | "reset" = "button";

  return {
    ...clickableProps,
    id: makeTabId(id, htmlProps?.value),
    role: "tab",
    tabIndex: isSelected ? 0 : -1,
    type,
    "aria-selected": isSelected,
    "aria-controls": makeTabPanelId(id, htmlProps?.value),
    onFocus: isDisabled
      ? undefined
      : (e) => {
          props?.onFocus?.(e);
          onFocus();
        },
  };
}

export interface UseTabPanelsProps {
  children?: React.ReactNode;
}

/**
 * Tabs hook for managing the visible/hidden states
 * of the tab panel.
 *
 * @param props props object for the tab panel
 */
export function useTabPanel(props: Record<string, any>) {
  const context = useTabsContext();

  const { id, selectedValue } = context;

  const { children, ...htmlProps } = props;

  return {
    tabIndex: 0,
    ...htmlProps,
    children,
    role: "tabpanel",
    "aria-labelledby": makeTabId(id, htmlProps.value),
    hidden: selectedValue !== htmlProps.value,
    id: makeTabPanelId(id, htmlProps.value),
  };
}

/**
 * Tabs hook to show an animated indicators that
 * follows the active tab.
 *
 * The way we do it is by measuring the DOM Rect (or dimensions)
 * of the active tab, and return that as CSS style for
 * the indicator.
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
      if (id) {
        cancelAnimationFrame(id);
      }
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
