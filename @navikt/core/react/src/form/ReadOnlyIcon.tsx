import React from "react";
import { PadlockLockedFillIcon } from "@navikt/aksel-icons";
import { useI18n } from "../util/i18n/i18n.context";

export const ReadOnlyIcon = () => (
  <PadlockLockedFillIcon
    aria-hidden
    className="navds-form-field__readonly-icon"
  />
);

export const ReadOnlyIconWithTitle = () => (
  <PadlockLockedFillIcon
    title={useI18n("global")("readOnly")}
    className="navds-form-field__readonly-icon"
  />
);
