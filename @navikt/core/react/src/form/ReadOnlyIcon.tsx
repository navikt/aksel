import React from "react";
import { PadlockLockedFillIcon } from "@navikt/aksel-icons";

export const ReadOnlyIcon = ({
  readOnly,
  nativeReadOnly = true,
}: {
  readOnly?: boolean;
  nativeReadOnly?: boolean;
}) => {
  if (readOnly) {
    return (
      <PadlockLockedFillIcon
        {...(nativeReadOnly ? { "aria-hidden": true } : { title: "readonly" })}
        className="navds-form-field__readonly-icon"
      />
    );
  }
  return null;
};
