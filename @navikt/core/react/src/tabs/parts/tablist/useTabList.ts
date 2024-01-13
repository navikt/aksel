import { useCallback } from "react";
import { useTabsContext, useTabsDescendantsContext } from "../../context";

/**
 * TabList hook to manage multiple tab buttons,
 * and ensures only one tab is selected at a time.
 */
export function useTabList() {
  const { focusedValue, loop } = useTabsContext();

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
    [descendants, focusedValue, loop],
  );

  return { onKeyDown };
}
