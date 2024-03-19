import { useTabsContext } from "../../Tabs.context";

type TabPanelProps = {
  value: string;
};

/**
 * Tabs hook for managing the visible/hidden state of Tabs.Panel
 */
export function useTabPanel({ value }: TabPanelProps) {
  const { id, selectedValue, makeTabId, makeTabPanelId } = useTabsContext();

  return {
    labelledbyId: makeTabId(id, value),
    hidden: selectedValue !== value,
    id: makeTabPanelId(id, value),
  };
}
