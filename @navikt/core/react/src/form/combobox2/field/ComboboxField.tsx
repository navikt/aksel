import React, { forwardRef } from "react";
import { ChevronDownIcon } from "@navikt/aksel-icons";
import { cl } from "../../../utils/helpers";
import {
  type ComboboxRootProps,
  useComboboxRootContext,
} from "../root/ComboboxRoot";

interface ComboboxFieldProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

const ComboboxField = forwardRef<HTMLButtonElement, ComboboxFieldProps>(
  ({ children, ...rest }, ref) => {
    const { options, selectedOptions, size } = useComboboxRootContext();

    const labels = getLabels(selectedOptions, options);

    return (
      <div className="aksel-combobox2__field-container">
        <button
          type="button"
          ref={ref}
          className={cl(
            "aksel-combobox2__field-btn",
            "aksel-body-short",
            `aksel-body-short--${size ?? "medium"}`,
          )}
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
  selectedOptions: ComboboxRootProps["selectedOptions"],
  options: ComboboxRootProps["options"],
) => {
  const labels: string[] = [];

  for (const optOrGroup of options) {
    if ("options" in optOrGroup) {
      // It's a group
      for (const option of optOrGroup.options) {
        if (selectedOptions.includes(option.value)) {
          labels.push(option.label);
        }
      }
    } else {
      // It's a single option
      if (selectedOptions.includes(optOrGroup.value)) {
        labels.push(optOrGroup.label);
      }
    }
  }

  return labels;
};

export { ComboboxField };
