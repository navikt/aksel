import React from "react";
import {
  CheckmarkCircleFillIcon,
  ExclamationmarkTriangleFillIcon,
  InformationSquareFillIcon,
  XMarkOctagonFillIcon,
} from "@navikt/aksel-icons";
import { useRenameCSS } from "../../theme/Theme";
import { useI18n } from "../../util/i18n/i18n.hooks";

const STATUS_ICONS = {
  info: InformationSquareFillIcon,
  success: CheckmarkCircleFillIcon,
  warning: ExclamationmarkTriangleFillIcon,
  error: XMarkOctagonFillIcon,
} as const;

function InlineMessageIcon({
  status,
}: {
  status: "info" | "success" | "warning" | "error";
}) {
  const translate = useI18n("global");
  const { cn } = useRenameCSS();

  if (!(status in STATUS_ICONS)) {
    return null;
  }

  const Icon = STATUS_ICONS[status];

  return (
    <Icon
      title={translate(status)}
      className={cn("navds-inline-message__icon")}
    />
  );
}

export { InlineMessageIcon };
