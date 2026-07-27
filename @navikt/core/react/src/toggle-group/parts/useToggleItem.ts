import { useCallback } from "react";
import { composeEventHandlers } from "../../utils/helpers";
import { rovingFocus } from "../../utils/helpers/roving-focus";
import { useToggleGroupContext } from "../ToggleGroup.context";

const TOGGLE_ITEM_SELECTOR = "[data-aksel-toggle-item]:not([data-disabled])";

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
   */
  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const container = (event.currentTarget as HTMLElement).closest(
        "[data-aksel-toggle-group]",
      ) as HTMLElement | null;

      if (!container) {
        return;
      }

      const current = (event.target as HTMLElement).closest(
        TOGGLE_ITEM_SELECTOR,
      ) as HTMLElement;

      const keyMap: Record<string, () => void> = {
        ArrowLeft: () =>
          rovingFocus(TOGGLE_ITEM_SELECTOR, container, "prev", current, false),
        ArrowRight: () =>
          rovingFocus(TOGGLE_ITEM_SELECTOR, container, "next", current, false),
        Home: () => rovingFocus(TOGGLE_ITEM_SELECTOR, container, "first"),
        End: () => rovingFocus(TOGGLE_ITEM_SELECTOR, container, "last"),
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
    onClick: composeEventHandlers(
      onClick,
      () => !isSelected && setSelectedValue(value),
    ),
    onFocus: disabled ? undefined : composeEventHandlers(_onFocus, onFocus),
    onKeyDown: composeEventHandlers(_onKeyDown, onKeyDown),
    tabIndex: focusedValue === value ? 0 : -1,
    "aria-checked": isSelected,
    "data-selected": isSelected,
    "data-aksel-toggle-item": "",
    role: "radio",
    disabled,
    "data-disabled": disabled ? "" : undefined,
  };
}
