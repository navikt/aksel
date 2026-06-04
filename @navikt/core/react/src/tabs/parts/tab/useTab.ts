import { composeEventHandlers } from "../../../utils/helpers";
import { useTabsContext } from "../../Tabs.context";

export interface UseTabProps {
  id?: string;
  /**
   * If `true`, the `Tab` won't be toggleable
   * @default false
   */
  disabled?: boolean;
  onClick?: React.MouseEventHandler;
  onFocus?: React.FocusEventHandler;
  value: string;
  ariaControls?: string;
}

function useTab({
  id,
  value,
  disabled = false,
  onFocus: _onFocus,
  onClick,
  ariaControls,
}: UseTabProps) {
  const {
    id: contextId,
    setSelectedValue,
    selectionFollowsFocus,
    focusedValue,
    setFocusedValue,
    selectedValue,
    makeTabId,
    makeTabPanelId,
  } = useTabsContext();

  const isSelected = value === selectedValue;

  const onFocus = () => {
    setFocusedValue(value);
    selectionFollowsFocus && setSelectedValue(value);
  };

  return {
    onClick: composeEventHandlers(onClick, () => setSelectedValue(value)),
    onFocus: disabled ? undefined : composeEventHandlers(_onFocus, onFocus),
    id: id ?? makeTabId(contextId, value),
    "aria-controls": ariaControls ?? makeTabPanelId(contextId, value),
    tabIndex: focusedValue === value ? 0 : -1,
    "aria-selected": isSelected,
    "data-state": isSelected ? "active" : "inactive",
    role: "tab",
    "data-aksel-tab": "",
    disabled,
    "data-disabled": disabled ? "" : undefined,
  };
}

export { useTab };
