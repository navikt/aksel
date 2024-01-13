import { useCallback } from "react";
import { composeEventHandlers } from "../../util/composeEventHandlers";
import { mergeRefs } from "../../util/hooks/useMergeRefs";
import { useToggleGroupContext, useToggleGroupDescendant } from "../context";

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

export function useToggleItem<P extends UseToggleItemProps>(
  {
    value,
    disabled = false,
    onFocus: _onFocus,
    onClick,
    onKeyDown: _onKeyDown,
  }: P,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  const { setSelectedValue, setFocusedValue, selectedValue, focusedValue } =
    useToggleGroupContext();

  const { register, descendants } = useToggleGroupDescendant({
    disabled,
    value,
  });

  const isSelected = value === selectedValue;

  const onFocus = () => {
    setFocusedValue(value);
  };

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
        const next = descendants.nextEnabled(idx, false);
        next && next.node?.focus();
      };
      const prevTab = () => {
        const prev = descendants.prevEnabled(idx, false);
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
    [descendants, focusedValue],
  );

  return {
    ref: mergeRefs([register, ref]),
    isSelected,
    isFocused: focusedValue === value,
    onClick: composeEventHandlers(onClick, () => setSelectedValue(value)),
    onFocus: disabled ? undefined : composeEventHandlers(_onFocus, onFocus),
    onKeyDown: composeEventHandlers(_onKeyDown, onKeyDown),
  };
}
