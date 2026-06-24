import React from "react";
import { DataGridSettingsOptions } from "../../data-grid/root/DataGrid.types";
import { Select } from "../../form/select";

type DataGridPreferencesTextSizeSettingsProps = {
  value?: keyof typeof DataGridSettingsOptions.textSize;
  onChange: (value: keyof typeof DataGridSettingsOptions.textSize) => void;
};

function DataGridPreferencesTextSizeSettings({
  value,
  onChange,
}: DataGridPreferencesTextSizeSettingsProps) {
  return (
    <Select
      label="Tekststørrelse"
      size="small"
      onChange={(event) => {
        const newValue = event.target.value;
        if (isTextSizeOption(newValue)) {
          onChange(newValue);
        }
      }}
      value={value}
    >
      {Object.entries(DataGridSettingsOptions.textSize).map(
        ([key, radioValue]) => (
          <option key={key} value={key}>
            {radioValue}
          </option>
        ),
      )}
    </Select>
  );
}

function isTextSizeOption(
  value: string,
): value is keyof typeof DataGridSettingsOptions.textSize {
  return value in DataGridSettingsOptions.textSize;
}

export { DataGridPreferencesTextSizeSettings };
export type { DataGridPreferencesTextSizeSettingsProps };
