import React from "react";
import { PadlockLockedFillIcon } from "@navikt/aksel-icons";
import { useRenameCSS } from "../theme/Theme";
import { useI18n } from "../util/i18n/i18n.hooks";

export const ReadOnlyIcon = () => {
  const { cn } = useRenameCSS();
  return (
    <PadlockLockedFillIcon
      aria-hidden
      className={cn("navds-form-field__readonly-icon")}
    />
  );
};

export const ReadOnlyIconWithTitle = () => {
  const { cn } = useRenameCSS();
  return (
    <PadlockLockedFillIcon
      title={useI18n("global")("readOnly")}
      className={cn("navds-form-field__readonly-icon")}
    />
  );
};
