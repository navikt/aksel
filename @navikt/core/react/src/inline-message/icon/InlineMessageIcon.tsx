import React from "react";
import {
  CheckmarkCircleFillIcon,
  ExclamationmarkTriangleFillIcon,
  InformationSquareFillIcon,
  XMarkOctagonFillIcon,
} from "@navikt/aksel-icons";
import { useRenameCSS } from "../../theme/Theme";

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
  const { cn } = useRenameCSS();

  if (!(status in STATUS_ICONS)) {
    return null;
  }

  const Icon = STATUS_ICONS[status];

  return <Icon className={cn("navds-inline-message__icon")} aria-hidden />;
}

export { InlineMessageIcon };
