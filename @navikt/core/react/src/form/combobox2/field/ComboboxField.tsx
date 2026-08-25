import React, { forwardRef } from "react";
import { ChevronDownIcon } from "@navikt/aksel-icons";
import {
  type ComboboxRootProps,
  useComboboxRootContext,
} from "../root/ComboboxRoot";

interface ComboboxFieldProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

const ComboboxField = forwardRef<HTMLButtonElement, ComboboxFieldProps>(
  ({ children, ...rest }, ref) => {
    const { items, selectedItems } = useComboboxRootContext();

    const labels = getLabels(selectedItems, items);

    return (
      <div className="aksel-combobox2__field-container">
        <button
          type="button"
          ref={ref}
          className="aksel-combobox2__field-btn"
          {...rest}
        >
          {children ||
            (labels.length > 1 ? `${labels.length} valgt` : labels[0])}
        </button>
        <ChevronDownIcon
          className="aksel-combobox2__field-chevron"
          aria-hidden
        />
      </div>
    );
  },
);

const getLabels = (
  selectedItems: ComboboxRootProps["selectedItems"],
  items: ComboboxRootProps["items"],
) => {
  const labels: string[] = [];

  for (const itemOrGroup of items) {
    if ("items" in itemOrGroup) {
      // It's a group
      for (const item of itemOrGroup.items) {
        if (selectedItems.includes(item.value)) {
          labels.push(item.label);
        }
      }
    } else {
      // It's a single item
      if (selectedItems.includes(itemOrGroup.value)) {
        labels.push(itemOrGroup.label);
      }
    }
  }

  return labels;
};

export { ComboboxField };
