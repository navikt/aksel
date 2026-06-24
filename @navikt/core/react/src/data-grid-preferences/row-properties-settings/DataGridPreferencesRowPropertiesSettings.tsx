import React from "react";
import { Checkbox, CheckboxGroup } from "../../form/checkbox";

type DataGridPreferencesRowProperties = {
  truncateContent: boolean;
  zebraStripes: boolean;
  columnDividers: boolean;
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
    ...(value.columnDividers ? ["columnDividers"] : []),
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
          columnDividers: values.includes("columnDividers"),
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
      <Checkbox
        value="columnDividers"
        description="Skiller kolonner fra hverandre med en strek"
      >
        Kolonnestrek
      </Checkbox>
    </CheckboxGroup>
  );
}

export { DataGridPreferencesRowPropertiesSettings };
export type {
  DataGridPreferencesRowProperties,
  DataGridPreferencesRowPropertiesSettingsProps,
};
