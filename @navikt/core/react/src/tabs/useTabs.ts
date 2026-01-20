import { useEffect, useState } from "react";
import { useId } from "../utils-external";
import { useControllableState } from "../utils/hooks";
import { TabsProps } from "./Tabs.types";

export function useTabs({
  onChange,
  value,
  defaultValue = "",
  id,
}: Pick<TabsProps, "onChange" | "value" | "defaultValue" | "id">) {
  const [focusedValue, setFocusedValue] = useState(defaultValue);

  const [selectedValue, setSelectedValue] = useControllableState({
    defaultValue,
    value,
    onChange,
  });

  /**
   * Sync focused `value` with controlled `selectedValue`
   */
  useEffect(() => {
    if (value != null) {
      setFocusedValue(value);
    }
  }, [value]);

  /**
   * Scope ids for better tracking
   */
  const uuid = useId();

  return {
    id: `tabs-${id ?? uuid}`,
    selectedValue,
    setSelectedValue,
    focusedValue,
    setFocusedValue,
    makeTabId,
    makeTabPanelId,
  };
}

function makeTabId(id: string, value: string) {
  return `${id}--tab-${value}`;
}

function makeTabPanelId(id: string, value: string) {
  return `${id}--tabpanel-${value}`;
}
