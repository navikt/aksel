import React, { forwardRef } from "react";
import { ChevronDownIcon } from "@navikt/aksel-icons";
import { cl } from "../../../utils/helpers";
import {
  type ComboboxRootProps,
  useComboboxRootContext,
} from "../root/ComboboxRoot";

interface ComboboxFieldProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: string;
  hasError?: boolean;
}

const ComboboxField = forwardRef<HTMLButtonElement, ComboboxFieldProps>(
  ({ children, hasError, ...rest }, ref) => {
    const { options, value, size } = useComboboxRootContext();

    const labels = getLabels(value, options);
    const label =
      children ?? (labels.length > 1 ? `${labels.length} valgt` : labels[0]);

    return (
      <div className="aksel-combobox2__field-container">
        <button
          type="button"
          ref={ref}
          data-error={hasError}
          className={cl(
            "aksel-combobox2__field-btn",
            "aksel-body-short",
            `aksel-body-short--${size ?? "medium"}`,
          )}
          // TODO: This results in other problems. Find another fix!
          //aria-label={label} // Without this, VO on Safari will announce the old label when focusing this button right after selecting a new option
          {...rest}
        >
          {label}
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
  value: ComboboxRootProps["value"],
  options: ComboboxRootProps["options"],
) => {
  const labels: string[] = [];

  for (const optOrGroup of options) {
    if ("options" in optOrGroup) {
      // It's a group
      for (const option of optOrGroup.options) {
        if (value.includes(option.value)) {
          labels.push(option.label);
        }
      }
    } else {
      // It's a single option
      if (value.includes(optOrGroup.value)) {
        labels.push(optOrGroup.label);
      }
    }
  }

  return labels;
};

export { ComboboxField };
