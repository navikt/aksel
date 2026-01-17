import React from "react";
import {
  CheckmarkCircleFillIcon,
  ExclamationmarkTriangleFillIcon,
  InformationSquareFillIcon,
  XMarkOctagonFillIcon,
} from "@navikt/aksel-icons";

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
  if (!(status in STATUS_ICONS)) {
    return null;
  }

  const Icon = STATUS_ICONS[status];

  return <Icon className="aksel-inline-message__icon" aria-hidden />;
}

export { InlineMessageIcon };
