import type { API, FileInfo } from "jscodeshift";
import { moveVariantToDataColor } from "../../../utils/move-variant-to-data-color";

export const migrationConfig = {
  component: "Button",
  prop: "variant",
  changes: {
    "primary-neutral": { replacement: "primary", color: "neutral" },
    "secondary-neutral": { replacement: "secondary", color: "neutral" },
    "tertiary-neutral": { replacement: "tertiary", color: "neutral" },
    danger: { replacement: "primary", color: "danger" },
  },
};

export default function transformer(file: FileInfo, api: API) {
  return moveVariantToDataColor(file, api, migrationConfig);
}
