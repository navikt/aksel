import React from "react";
import { DataGridSettingsOptions } from "../../data-grid/root/DataGrid.types";
import { Select } from "../../form/select";

type DataGridPreferencesRowDensitySettingsProps = {
  value?: keyof typeof DataGridSettingsOptions.rowDensity;
  onChange: (value: keyof typeof DataGridSettingsOptions.rowDensity) => void;
};

function DataGridPreferencesRowDensitySettings({
  value,
  onChange,
}: DataGridPreferencesRowDensitySettingsProps) {
  return (
    <Select
      label="Velg radtetthet"
      size="small"
      onChange={(event) => {
        const newValue = event.target.value;
        if (isRowDensityOption(newValue)) {
          onChange(newValue);
        }
      }}
      value={value}
    >
      {Object.entries(DataGridSettingsOptions.rowDensity).map(
        ([key, radioValue]) => (
          <option key={key} value={key}>
            {radioValue}
          </option>
        ),
      )}
    </Select>
  );
}

function isRowDensityOption(
  value: string,
): value is keyof typeof DataGridSettingsOptions.rowDensity {
  return value in DataGridSettingsOptions.rowDensity;
}

export { DataGridPreferencesRowDensitySettings };
export type { DataGridPreferencesRowDensitySettingsProps };
