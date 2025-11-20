import type { API, FileInfo } from "jscodeshift";
import { moveVariantToDataColor } from "../../../utils/move-variant-to-data-color";

const migrationConfig = {
  component: "Tag",
  prop: "variant",
  changes: {
    warning: { replacement: "outline", color: "warning" },
    "warning-moderate": { replacement: "moderate", color: "warning" },
    "warning-filled": { replacement: "strong", color: "warning" },
    error: { replacement: "outline", color: "danger" },
    "error-moderate": { replacement: "moderate", color: "danger" },
    "error-filled": { replacement: "strong", color: "danger" },
    info: { replacement: "outline", color: "info" },
    "info-moderate": { replacement: "moderate", color: "info" },
    "info-filled": { replacement: "strong", color: "info" },
    success: { replacement: "outline", color: "success" },
    "success-moderate": { replacement: "moderate", color: "success" },
    "success-filled": { replacement: "strong", color: "success" },
    neutral: { replacement: "outline", color: "neutral" },
    "neutral-moderate": { replacement: "moderate", color: "neutral" },
    "neutral-filled": { replacement: "strong", color: "neutral" },
    alt1: { replacement: "outline", color: "meta-purple" },
    "alt1-moderate": { replacement: "moderate", color: "meta-purple" },
    "alt1-filled": { replacement: "strong", color: "meta-purple" },
    alt2: { replacement: "outline", color: "meta-lime" },
    "alt2-moderate": { replacement: "moderate", color: "meta-lime" },
    "alt2-filled": { replacement: "strong", color: "meta-lime" },
    alt3: { replacement: "outline", color: "info" },
    "alt3-moderate": { replacement: "moderate", color: "info" },
    "alt3-filled": { replacement: "strong", color: "info" },
  },
};

export default function transformer(file: FileInfo, api: API) {
  return moveVariantToDataColor(file, api, migrationConfig);
}
