import { useEffect, useState } from "react";
import { useControllableState } from "../../esm/util/hooks";
import { useId } from "../util";
import { TabsProps } from "./types";

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
  };
}
