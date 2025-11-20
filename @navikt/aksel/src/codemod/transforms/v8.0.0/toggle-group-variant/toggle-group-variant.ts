import type { API, FileInfo } from "jscodeshift";
import { moveVariantToDataColor } from "../../../utils/move-variant-to-data-color";

export const migrationConfig = {
  component: "ToggleGroup",
  prop: "variant",
  changes: {
    action: { color: "accent" },
    neutral: { color: "neutral" },
  },
};

export default function transformer(file: FileInfo, api: API) {
  return moveVariantToDataColor(file, api, migrationConfig);
}
