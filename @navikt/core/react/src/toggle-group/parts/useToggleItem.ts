import { useCallback } from "react";
import { composeEventHandlers, ownerDocument } from "../../utils/helpers";
import { focusIn } from "../../utils/hooks/useFocusIn";
import { useToggleGroupContext } from "../ToggleGroup.context";

export interface UseToggleItemProps {
  /**
   * If `true`, the `ToggleItem` won't be toggleable
   * @default false
   */
  disabled?: boolean;
  onClick?: React.MouseEventHandler;
  onFocus?: React.FocusEventHandler;
  onKeyDown?: React.KeyboardEventHandler;
  value: string;
}

export function useToggleItem<P extends UseToggleItemProps>({
  value,
  disabled = false,
  onFocus: _onFocus,
  onClick,
  onKeyDown: _onKeyDown,
}: P) {
  const { setSelectedValue, setFocusedValue, selectedValue, focusedValue } =
    useToggleGroupContext();

  const isSelected = value === selectedValue;

  const onFocus = () => setFocusedValue(value);

  /**
   * Implements roving-tabindex.
   * Queries enabled items from the radiogroup container at event time — no registration needed.
   */
  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const container = (event.currentTarget as HTMLElement).closest(
        '[role="radiogroup"]',
      ) as HTMLElement | null;

      if (!container) return;

      /* TODO: Refactor: Use data-attrb, props returns */
      const items = Array.from(
        container.querySelectorAll<HTMLButtonElement>(
          '[role="radio"]:not([disabled])',
        ),
      );
      const current = ownerDocument(container)
        .activeElement as HTMLElement | null;

      const keyMap: Record<string, () => void> = {
        ArrowLeft: () => focusIn(items, "prev", current, false),
        ArrowRight: () => focusIn(items, "next", current, false),
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
    [selectedValue, setFocusedValue],
  );

  return {
    isSelected,
    isFocused: focusedValue === value,
    onClick: composeEventHandlers(
      onClick,
      () => selectedValue !== value && setSelectedValue(value),
    ),
    onFocus: disabled ? undefined : composeEventHandlers(_onFocus, onFocus),
    onKeyDown: composeEventHandlers(_onKeyDown, onKeyDown),
  };
}
