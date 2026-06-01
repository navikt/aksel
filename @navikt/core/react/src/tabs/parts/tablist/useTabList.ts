import { useCallback } from "react";
import { ownerDocument } from "../../../utils/helpers";
import { focusIn } from "../../../utils/hooks/useFocusIn";
import { useTabsContext } from "../../Tabs.context";

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
      const items = Array.from(
        container.querySelectorAll<HTMLButtonElement>(
          "[data-aksel-tab]:not([data-disabled])",
        ),
      );
      const current = ownerDocument(container)
        .activeElement as HTMLElement | null;

      const keyMap: Record<string, () => void> = {
        ArrowLeft: () => focusIn(items, "prev", current, loop),
        ArrowRight: () => focusIn(items, "next", current, loop),
        Home: () => focusIn(items, "first"),
        End: () => focusIn(items, "last"),
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
