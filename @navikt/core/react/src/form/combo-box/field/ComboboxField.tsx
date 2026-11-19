import React, { forwardRef, useEffect, useState } from "react";
import { ChevronDownIcon } from "@navikt/aksel-icons";
import { cl } from "../../../utils/helpers";
import { useI18n } from "../../../utils/i18n/i18n.hooks";
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
    const translate = useI18n("Combobox2");

    const labels = getLabels(value, options);
    const label =
      children ??
      (labels.length > 1
        ? translate("selectedCount", { count: labels.length })
        : labels[0]);

    // Workaround for issue where VO on Safari announces the old label when focusing this button right after selecting a new option
    const [ariaLabel, setAriaLabel] = useState<string>();
    useEffect(() => {
      if (label) {
        // oxlint-disable-next-line react/set-state-in-effect -- Briefly sets and resets the label as part of the VoiceOver workaround.
        setAriaLabel(label);
        setTimeout(() => setAriaLabel(undefined), 100);
      }
    }, [label]);

    return (
      <div className="aksel-combo-box__field-container">
        <button
          type="button"
          ref={ref}
          data-error={hasError}
          className={cl(
            "aksel-combo-box__field-btn",
            "aksel-body-short",
            `aksel-body-short--${size ?? "medium"}`,
          )}
          aria-label={ariaLabel}
          {...rest}
        >
          {label}
        </button>
        <ChevronDownIcon
          className="aksel-combo-box__field-chevron"
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
