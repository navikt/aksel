import React from "react";
import {
  CheckmarkCircleFillIcon,
  ExclamationmarkTriangleFillIcon,
  InformationSquareFillIcon,
  XMarkOctagonFillIcon,
} from "@navikt/aksel-icons";
import { useRenameCSS } from "../../theme/Theme";
import { useI18n } from "../../util/i18n/i18n.hooks";

const VARIANT_ICONS = {
  info: InformationSquareFillIcon,
  success: CheckmarkCircleFillIcon,
  warning: ExclamationmarkTriangleFillIcon,
  error: XMarkOctagonFillIcon,
} as const;

function InlineMessageIcon({
  variant,
}: {
  variant: "info" | "success" | "warning" | "error";
}) {
  const translate = useI18n("Alert");
  const { cn } = useRenameCSS();

  if (!(variant in VARIANT_ICONS)) {
    return null;
  }

  const Icon = VARIANT_ICONS[variant];

  return (
    <Icon
      title={translate(variant)}
      className={cn("navds-inline-message__icon")}
    />
  );
}

export { InlineMessageIcon };
