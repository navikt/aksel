import { useCallback } from "react";
import { useTabsContext, useTabsDescendantsContext } from "../../Tabs.context";

/**
 * TabList hook to manage multiple tab buttons,
 * and ensures only one tab is selected at a time.
 */
export function useTabList() {
  const { focusedValue, loop, selectedValue, setFocusedValue } =
    useTabsContext();

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
        next?.node?.focus();
      };
      const prevTab = () => {
        const prev = descendants.prevEnabled(idx, loop);
        prev?.node?.focus();
      };
      const firstTab = () => {
        const first = descendants.firstEnabled();
        first?.node?.focus();
      };
      const lastTab = () => {
        const last = descendants.lastEnabled();
        last?.node?.focus();
      };

      const keyMap: Record<string, React.KeyboardEventHandler> = {
        ArrowLeft: prevTab,
        ArrowRight: nextTab,
        Home: firstTab,
        End: lastTab,
      };

      const hasModifiers =
        event.shiftKey || event.ctrlKey || event.altKey || event.metaKey;

      const action = keyMap[event.key];

      if (action && !hasModifiers) {
        event.preventDefault();
        action(event);
      } else if (event.key === "Tab") {
        /**
         * Imperative focus during keydown is risky so we prevent React's batching updates
         * to avoid potential bugs. See: https://github.com/facebook/react/issues/20332
         */
        selectedValue && setTimeout(() => setFocusedValue(selectedValue));
      }
    },
    [descendants, focusedValue, loop, selectedValue, setFocusedValue],
  );

  return { onKeyDown };
}
