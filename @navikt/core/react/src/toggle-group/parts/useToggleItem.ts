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
  value: string;
}

export function useToggleItem<P extends UseToggleItemProps>(
  { value, disabled = false, onFocus: _onFocus, onClick }: P,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  const { setSelectedValue, setFocusedValue, selectedValue } =
    useToggleGroupContext();

  const { register } = useToggleGroupDescendant({
    disabled,
    value,
  });

  const isSelected = value === selectedValue;

  const onFocus = () => {
    setFocusedValue(value);
    !disabled && setSelectedValue(value);
  };

  return {
    ref: mergeRefs([register, ref]),
    isSelected,
    onClick: composeEventHandlers(onClick, () => setSelectedValue(value)),
    onFocus: disabled ? undefined : composeEventHandlers(_onFocus, onFocus),
  };
}
