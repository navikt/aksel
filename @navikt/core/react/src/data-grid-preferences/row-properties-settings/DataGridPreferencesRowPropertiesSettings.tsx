import React from "react";
import { Checkbox, CheckboxGroup } from "../../form/checkbox";

type DataGridPreferencesRowProperties = {
  truncateContent: boolean;
  zebraStripes: boolean;
};

type DataGridPreferencesRowPropertiesSettingsProps = {
  value: DataGridPreferencesRowProperties;
  onChange: (value: DataGridPreferencesRowProperties) => void;
};

function DataGridPreferencesRowPropertiesSettings({
  value,
  onChange,
}: DataGridPreferencesRowPropertiesSettingsProps) {
  const checkboxValues = [
    ...(value.truncateContent ? ["truncateContent"] : []),
    ...(value.zebraStripes ? ["zebraStripes"] : []),
  ];

  return (
    <CheckboxGroup
      legend="Radegenskaper"
      size="small"
      value={checkboxValues}
      onChange={(values: string[]) => {
        onChange({
          truncateContent: values.includes("truncateContent"),
          zebraStripes: values.includes("zebraStripes"),
        });
      }}
    >
      <Checkbox
        value="truncateContent"
        description="Kutter innhold som ikke får plass i cellen på en linje"
      >
        Kutt innhold
      </Checkbox>
      <Checkbox
        value="zebraStripes"
        description="Legger på en bakgrunnsfarge for annenhver rad"
      >
        Zebra-striper
      </Checkbox>
    </CheckboxGroup>
  );
}

export { DataGridPreferencesRowPropertiesSettings };
export type {
  DataGridPreferencesRowProperties,
  DataGridPreferencesRowPropertiesSettingsProps,
};
