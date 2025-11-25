import type { API, FileInfo } from "jscodeshift";
import { moveVariantToDataColor } from "../../../utils/move-variant-to-data-color";

const migrationConfigToggleSub = {
  component: "Chips.Toggle",
  prop: "variant",
  changes: {
    action: { color: "accent" },
    neutral: { color: "neutral" },
  },
};

const migrationConfigToggleDirect = {
  ...migrationConfigToggleSub,
  component: "ChipsToggle",
};

const migrationConfigRemovableSub = {
  ...migrationConfigToggleSub,
  component: "Chips.Removable",
};

const migrationConfigRemovableDirect = {
  ...migrationConfigToggleSub,
  component: "ChipsRemovable",
};

export default function transformer(file: FileInfo, api: API) {
  const configs = [
    migrationConfigToggleSub,
    migrationConfigToggleDirect,
    migrationConfigRemovableSub,
    migrationConfigRemovableDirect,
  ];

  let source = file.source;

  for (const config of configs) {
    const newSource = moveVariantToDataColor({ ...file, source }, api, config);
    if (newSource) {
      source = newSource;
    }
  }

  return source;
}
