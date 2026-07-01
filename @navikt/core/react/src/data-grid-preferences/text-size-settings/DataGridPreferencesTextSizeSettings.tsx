import React from "react";
import { Select } from "../../form/select";

const TEXT_SIZE_OPTIONS = {
  small: "Liten",
  medium: "Medium",
} as const;

type DataGridPreferencesTextSizeSettingsProps = {
  value?: keyof typeof TEXT_SIZE_OPTIONS;
  onChange: (value: keyof typeof TEXT_SIZE_OPTIONS) => void;
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
      {Object.entries(TEXT_SIZE_OPTIONS).map(([key, label]) => (
        <option key={key} value={key}>
          {label}
        </option>
      ))}
    </Select>
  );
}

function isTextSizeOption(
  value: string,
): value is keyof typeof TEXT_SIZE_OPTIONS {
  return value in TEXT_SIZE_OPTIONS;
}

export { DataGridPreferencesTextSizeSettings };
export type { DataGridPreferencesTextSizeSettingsProps };
