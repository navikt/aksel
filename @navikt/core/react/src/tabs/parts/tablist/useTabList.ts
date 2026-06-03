import { useCallback } from "react";
import { rovingFocus } from "../../../utils/helpers/roving-focus";
import { useTabsContext } from "../../Tabs.context";

const TAB_SELECTOR = "[data-aksel-tab]:not([data-disabled])";

/**
 * TabList hook to manage multiple tab buttons,
 * and ensures only one tab is selected at a time.
 */
export function useTabList() {
  const { loop, selectedValue, setFocusedValue } = useTabsContext();

  /**
   * Implements roving-tabindex for horizontal tabs.
   */
  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const container = event.currentTarget as HTMLElement;

      const current = (event.target as HTMLElement).closest(
        TAB_SELECTOR,
      ) as HTMLElement;

      const keyMap: Record<string, () => void> = {
        ArrowLeft: () =>
          rovingFocus(TAB_SELECTOR, container, "prev", current, loop),
        ArrowRight: () =>
          rovingFocus(TAB_SELECTOR, container, "next", current, loop),
        Home: () => rovingFocus(TAB_SELECTOR, container, "first"),
        End: () => rovingFocus(TAB_SELECTOR, container, "last"),
      };

      const hasModifiers =
        event.shiftKey || event.ctrlKey || event.altKey || event.metaKey;

      const action = keyMap[event.key];

      if (action && !hasModifiers) {
        event.preventDefault();
        action();
      } else if (event.key === "Tab") {
        /**
         * Imperative focus during keydown is risky so we prevent React's batching updates
         * to avoid potential bugs. See: https://github.com/facebook/react/issues/20332
         */
        selectedValue && setTimeout(() => setFocusedValue(selectedValue));
      }
    },
    [loop, selectedValue, setFocusedValue],
  );

  return { onKeyDown };
}
