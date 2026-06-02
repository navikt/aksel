import React from "react";
import { DataGridSettingsOptions } from "../../data-grid/root/DataGrid.types";
import { Radio, RadioGroup } from "../../form/radio";

type DataGridPreferencesRowDensitySettingsProps = {
  value?: keyof typeof DataGridSettingsOptions.rowDensity;
  onChange: (value: keyof typeof DataGridSettingsOptions.rowDensity) => void;
};

function DataGridPreferencesRowDensitySettings({
  value,
  onChange,
}: DataGridPreferencesRowDensitySettingsProps) {
  return (
    <RadioGroup
      legend="Velg radtetthet"
      size="small"
      onChange={(newValue) => {
        if (isRowDensityOption(newValue)) {
          onChange(newValue);
        }
      }}
      value={value}
    >
      {Object.entries(DataGridSettingsOptions.rowDensity).map(
        ([key, radioValue]) => (
          <Radio key={key} value={key}>
            {radioValue}
          </Radio>
        ),
      )}
    </RadioGroup>
  );
}

function isRowDensityOption(
  value: string,
): value is keyof typeof DataGridSettingsOptions.rowDensity {
  return value in DataGridSettingsOptions.rowDensity;
}

export { DataGridPreferencesRowDensitySettings };
export type { DataGridPreferencesRowDensitySettingsProps };
