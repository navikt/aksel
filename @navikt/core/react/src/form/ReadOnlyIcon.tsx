import { PadlockLockedFillIcon } from "@navikt/aksel-icons";
import React from "react";

export const ReadOnlyIcon = ({ readOnly }: { readOnly?: boolean }) => {
  if (readOnly) {
    return (
      <PadlockLockedFillIcon
        aria-hidden
        className="navds-form-field__readonly-icon"
      />
    );
  }
  return null;
};
