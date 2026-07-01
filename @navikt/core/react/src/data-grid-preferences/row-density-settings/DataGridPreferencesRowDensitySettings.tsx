import React from "react";
import { Select } from "../../form/select";

const ROW_DENSITY_OPTIONS = {
  tight: "Tett",
  standard: "Standard",
  loose: "Løs",
} as const;

type DataGridPreferencesRowDensitySettingsProps = {
  value?: keyof typeof ROW_DENSITY_OPTIONS;
  onChange: (value: keyof typeof ROW_DENSITY_OPTIONS) => void;
};

function DataGridPreferencesRowDensitySettings({
  value,
  onChange,
}: DataGridPreferencesRowDensitySettingsProps) {
  return (
    <Select
      label="Radtetthet"
      size="small"
      onChange={(event) => {
        const newValue = event.target.value;
        if (isRowDensityOption(newValue)) {
          onChange(newValue);
        }
      }}
      value={value}
    >
      {Object.entries(ROW_DENSITY_OPTIONS).map(([key, label]) => (
        <option key={key} value={key}>
          {label}
        </option>
      ))}
    </Select>
  );
}

function isRowDensityOption(
  value: string,
): value is keyof typeof ROW_DENSITY_OPTIONS {
  return value in ROW_DENSITY_OPTIONS;
}

export { DataGridPreferencesRowDensitySettings };
export type { DataGridPreferencesRowDensitySettingsProps };
