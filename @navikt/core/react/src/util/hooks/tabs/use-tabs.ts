import {
  Children,
  createElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
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
] = createDescendantContext<HTMLButtonElement>();

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
  onChange?: (index: number) => void;
  /**
   * The index of the selected tab (in controlled mode)
   */
  index?: number;
  /**
   * The initial index of the selected tab (in uncontrolled mode)
   */
  defaultIndex?: number;
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
  const { defaultIndex, onChange, index, isManual, isLazy, ...htmlProps } =
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
  const [focusedIndex, setFocusedIndex] = useState(defaultIndex ?? 0);

  const [selectedIndex, setSelectedIndex] = useControllableState({
    defaultValue: defaultIndex ?? 0,
    value: index,
    onChange,
  });

  /**
   * Sync focused `index` with controlled `selectedIndex` (which is the `props.index`)
   */
  useEffect(() => {
    if (index != null) {
      setFocusedIndex(index);
    }
  }, [index]);

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
    selectedIndex,
    focusedIndex,
    setSelectedIndex,
    setFocusedIndex,
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
  const { focusedIndex } = useTabsContext();

  const descendants = useTabsDescendantsContext();

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const nextTab = () => {
        const next = descendants.nextEnabled(focusedIndex);
        if (next) next.node?.focus();
      };
      const prevTab = () => {
        const prev = descendants.prevEnabled(focusedIndex);
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
    [descendants, focusedIndex]
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
}

/**
 * Tabs hook to manage each tab button.
 *
 * A tab can be disabled and focusable, or both,
 * hence the use of `useClickable` to handle this scenario
 */
export function useTab<P extends UseTabProps>(props: P) {
  const { isDisabled = false, isFocusable = false, ...htmlProps } = props;

  const { setSelectedIndex, isManual, id, setFocusedIndex, selectedIndex } =
    useTabsContext();

  const { index, register } = useTabsDescendant({
    disabled: isDisabled && !isFocusable,
  });

  const isSelected = index === selectedIndex;

  const onClick = () => {
    setSelectedIndex(index);
  };

  const onFocus = () => {
    setFocusedIndex(index);
    const isDisabledButFocusable = isDisabled && isFocusable;
    const shouldSelect = !isManual && !isDisabledButFocusable;
    if (shouldSelect) {
      setSelectedIndex(index);
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
    id: makeTabId(id, index),
    role: "tab",
    tabIndex: isSelected ? 0 : -1,
    type,
    "aria-selected": isSelected,
    "aria-controls": makeTabPanelId(id, index),
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

const [TabPanelProvider, useTabPanelContext] = createContext<{
  isSelected: boolean;
  id: string;
  tabId: string;
  selectedIndex: number;
}>({});

/**
 * Tabs hook for managing the visibility of multiple tab panels.
 *
 * Since only one panel can be show at a time, we use `cloneElement`
 * to inject `selected` panel to each TabPanel.
 *
 * It returns a cloned version of its children with
 * all functionality included.
 */
export function useTabPanels<P extends UseTabPanelsProps>(props: P) {
  const context = useTabsContext();

  const { id, selectedIndex } = context;

  const validChildren = Children.toArray(props.children);

  const children = validChildren.map((child, index) =>
    createElement(
      TabPanelProvider,
      {
        key: index,
        value: {
          isSelected: index === selectedIndex,
          id: makeTabPanelId(id, index),
          tabId: makeTabId(id, index),
          selectedIndex,
        },
      },
      child
    )
  );

  return { ...props, children };
}

/**
 * Tabs hook for managing the visible/hidden states
 * of the tab panel.
 *
 * @param props props object for the tab panel
 */
export function useTabPanel(props: Record<string, any>) {
  const { children, ...htmlProps } = props;
  const { isSelected, id, tabId } = useTabPanelContext();

  const hasBeenSelected = useRef(false);
  if (isSelected) {
    hasBeenSelected.current = true;
  }

  const shouldRenderChildren = true;

  return {
    // Puts the tabpanel in the page `Tab` sequence.
    tabIndex: 0,
    ...htmlProps,
    children: shouldRenderChildren ? children : null,
    role: "tabpanel",
    "aria-labelledby": tabId,
    hidden: !isSelected,
    id,
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

  const { selectedIndex } = context;

  // Get the clientRect of the selected tab
  const [rect, setRect] = useState(() => {
    return { left: 0, width: 0 };
  });

  const [hasMeasured, setHasMeasured] = useState(false);

  // Update the selected tab rect when the selectedIndex changes
  useClientLayoutEffect(() => {
    if (selectedIndex == null) return;

    const tab = descendants.item(selectedIndex);
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
  }, [selectedIndex, descendants]);

  return {
    position: "absolute",
    transitionProperty: "left, right, top, bottom, height, width",
    transitionDuration: hasMeasured ? "200ms" : "0ms",
    transitionTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
    ...rect,
  };
}

function makeTabId(id: string, index: number) {
  return `${id}--tab-${index}`;
}

function makeTabPanelId(id: string, index: number) {
  return `${id}--tabpanel-${index}`;
}
