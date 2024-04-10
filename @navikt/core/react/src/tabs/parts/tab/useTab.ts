import { composeEventHandlers } from "../../../util/composeEventHandlers";
import { mergeRefs } from "../../../util/hooks/useMergeRefs";
import { useTabsContext, useTabsDescendant } from "../../Tabs.context";

export interface UseTabProps {
  /**
   * If `true`, the `Tab` won't be toggleable
   * @default false
   */
  disabled?: boolean;
  onClick?: React.MouseEventHandler;
  onFocus?: React.FocusEventHandler;
  value: string;
}

export function useTab<P extends UseTabProps>(
  { value, disabled = false, onFocus: _onFocus, onClick }: P,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  const {
    id,
    setSelectedValue,
    selectionFollowsFocus,
    focusedValue,
    setFocusedValue,
    selectedValue,
    makeTabId,
    makeTabPanelId,
  } = useTabsContext();

  const { register } = useTabsDescendant({
    disabled,
    value,
  });

  const isSelected = value === selectedValue;

  const onFocus = () => {
    setFocusedValue(value);
    selectionFollowsFocus && setSelectedValue(value);
  };

  return {
    ref: mergeRefs([register, ref]),
    isSelected,
    isFocused: focusedValue === value,
    id: makeTabId(id, value),
    controlsId: makeTabPanelId(id, value),
    onClick: composeEventHandlers(onClick, () => setSelectedValue(value)),
    onFocus: disabled ? undefined : composeEventHandlers(_onFocus, onFocus),
  };
}
