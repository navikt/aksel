import { useCallback, useEffect, useRef } from "react";
import { composeEventHandlers } from "../../util/composeEventHandlers";
import { mergeRefs } from "../../util/hooks/useMergeRefs";
import {
  useToggleGroupContext,
  useToggleGroupDescendant,
} from "../ToggleGroup.context";

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

  const rafId = useRef<number | null>(null);

  const isSelected = value === selectedValue;

  const onFocus = () => setFocusedValue(value);

  /**
   * Implements roving-tabindex for horizontal tabs
   */
  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      /**
       * ToggleGroup.Item is registered with its prop 'value'.
       * We can then use it to find the current focuses descendant
       */
      const idx = descendants
        .values()
        .findIndex((x) => x.value === focusedValue);

      const nextTab = () => {
        const next = descendants.nextEnabled(idx, false);
        next?.node?.focus();
      };
      const prevTab = () => {
        const prev = descendants.prevEnabled(idx, false);
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
        if (selectedValue) {
          rafId.current = requestAnimationFrame(() =>
            setFocusedValue(selectedValue),
          );
        }
      }
    },
    [descendants, focusedValue, selectedValue, setFocusedValue],
  );

  useEffect(() => {
    return () => {
      rafId.current && cancelAnimationFrame(rafId.current);
    };
  }, []);

  return {
    ref: mergeRefs([register, ref]),
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
