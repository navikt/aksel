import React from "react";
import { DataGridSettingsOptions } from "../../data-grid/root/DataGrid.types";
import { Radio, RadioGroup } from "../../form/radio";

type DataGridPreferencesTextSizeSettingsProps = {
  value?: keyof typeof DataGridSettingsOptions.textSize;
  onChange: (value: keyof typeof DataGridSettingsOptions.textSize) => void;
};

function DataGridPreferencesTextSizeSettings({
  value,
  onChange,
}: DataGridPreferencesTextSizeSettingsProps) {
  return (
    <RadioGroup
      legend="Tekststørrelse"
      size="small"
      onChange={(newValue) => {
        if (isTextSizeOption(newValue)) {
          onChange(newValue);
        }
      }}
      value={value}
    >
      {Object.entries(DataGridSettingsOptions.textSize).map(
        ([key, radioValue]) => (
          <Radio key={key} value={key}>
            {radioValue}
          </Radio>
        ),
      )}
    </RadioGroup>
  );
}

function isTextSizeOption(
  value: string,
): value is keyof typeof DataGridSettingsOptions.textSize {
  return value in DataGridSettingsOptions.textSize;
}

export { DataGridPreferencesTextSizeSettings };
export type { DataGridPreferencesTextSizeSettingsProps };
