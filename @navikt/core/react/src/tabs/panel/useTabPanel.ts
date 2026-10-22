import { useTabsContext } from "../root/TabsRoot.context";

type UseTabPanelProps = {
  value: string;
};

/**
 * Tabs hook for managing the visible/hidden state of Tabs.Panel
 */
function useTabPanel({ value }: UseTabPanelProps) {
  const { id, selectedValue, makeTabId, makeTabPanelId } = useTabsContext();

  return {
    labelledbyId: makeTabId(id, value),
    hidden: selectedValue !== value,
    id: makeTabPanelId(id, value),
  };
}

export { useTabPanel };
