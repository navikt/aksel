import React from "react";
import { Checkbox, CheckboxGroup } from "../../form/checkbox";

type DataGridPreferencesRowProperties = {
  truncateContent: boolean;
  zebraStripes: boolean;
};

type DataGridPreferencesRowPropertiesFields = {
  truncateContent?: boolean;
  zebraStripes?: boolean;
};

type DataGridPreferencesRowPropertiesSettingsProps = {
  value: DataGridPreferencesRowProperties;
  onChange: (value: DataGridPreferencesRowProperties) => void;
  /**
   * Controls which checkboxes are shown. Defaults to all visible.
   */
  fields?: DataGridPreferencesRowPropertiesFields;
};

function DataGridPreferencesRowPropertiesSettings({
  value,
  onChange,
  fields,
}: DataGridPreferencesRowPropertiesSettingsProps) {
  const showTruncateContent = fields?.truncateContent !== false;
  const showZebraStripes = fields?.zebraStripes !== false;

  if (!showTruncateContent && !showZebraStripes) {
    return null;
  }

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
          truncateContent: showTruncateContent
            ? values.includes("truncateContent")
            : value.truncateContent,
          zebraStripes: showZebraStripes
            ? values.includes("zebraStripes")
            : value.zebraStripes,
        });
      }}
    >
      {showTruncateContent && (
        <Checkbox
          value="truncateContent"
          description="Kutter innhold som ikke får plass i cellen på en linje"
        >
          Kutt innhold
        </Checkbox>
      )}
      {showZebraStripes && (
        <Checkbox
          value="zebraStripes"
          description="Legger på en bakgrunnsfarge for annenhver rad"
        >
          Zebra-striper
        </Checkbox>
      )}
    </CheckboxGroup>
  );
}

export { DataGridPreferencesRowPropertiesSettings };
export type {
  DataGridPreferencesRowProperties,
  DataGridPreferencesRowPropertiesFields,
  DataGridPreferencesRowPropertiesSettingsProps,
};
