import React from "react";
import {
  CheckmarkCircleFillIcon,
  CheckmarkCircleIcon,
  ExclamationmarkTriangleFillIcon,
  ExclamationmarkTriangleIcon,
  MegaphoneSpeakingFillIcon,
  MegaphoneSpeakingIcon,
  XMarkOctagonFillIcon,
  XMarkOctagonIcon,
} from "@navikt/aksel-icons";
import type { AkselColor } from "../../../types";
import { useI18n } from "../../../util/i18n/i18n.hooks";
import type { BaseAlertContextProps } from "../root/BaseAlertRoot.context";

function baseAlertStatusToDataColor(
  status: BaseAlertContextProps["status"],
): AkselColor {
  switch (status) {
    case "announcement":
      return "neutral";
    case "success":
      return "success";
    case "warning":
      return "warning";
    case "error":
      return "danger";
  }

  return "neutral";
}

const STATUS_ICONS = {
  announcement: {
    fill: MegaphoneSpeakingFillIcon,
    outline: MegaphoneSpeakingIcon,
  },
  success: {
    fill: CheckmarkCircleFillIcon,
    outline: CheckmarkCircleIcon,
  },
  warning: {
    fill: ExclamationmarkTriangleFillIcon,
    outline: ExclamationmarkTriangleIcon,
  },
  error: {
    fill: XMarkOctagonFillIcon,
    outline: XMarkOctagonIcon,
  },
} as const;

function BaseAlertStatusIcon({
  status,
  fill = true,
}: {
  status: BaseAlertContextProps["status"];
  fill?: boolean;
}) {
  const translate = useI18n("global");

  if (!status) {
    return null;
  }

  const Icon = fill ? STATUS_ICONS[status].fill : STATUS_ICONS[status].outline;

  return <Icon title={translate(status)} aria-hidden />;
}

export { baseAlertStatusToDataColor, BaseAlertStatusIcon };
