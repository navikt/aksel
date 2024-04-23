import { useEffect, useState } from "react";
import { useControllableState } from "../util/hooks/useControllableState";
import { ToggleGroupProps } from "./ToggleGroup.types";

export function useToggleGroup({
  onChange,
  value,
  defaultValue = "",
}: Pick<ToggleGroupProps, "onChange" | "value" | "defaultValue">) {
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

  return {
    selectedValue,
    setSelectedValue,
    focusedValue,
    setFocusedValue,
  };
}
