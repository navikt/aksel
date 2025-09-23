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

function baseAlertVariantToDataColor(
  variant: BaseAlertContextProps["variant"],
): AkselColor | undefined {
  switch (variant) {
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

const VARIANT_ICONS = {
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

function BaseAlertVariantIcon({
  variant,
  fill = true,
}: {
  variant: BaseAlertContextProps["variant"];
  fill?: boolean;
}) {
  const translate = useI18n("Alert");

  if (!variant) {
    return null;
  }

  const Icon = fill
    ? VARIANT_ICONS[variant].fill
    : VARIANT_ICONS[variant].outline;

  return <Icon title={translate(variant)} />;
}

export { baseAlertVariantToDataColor, BaseAlertVariantIcon };
