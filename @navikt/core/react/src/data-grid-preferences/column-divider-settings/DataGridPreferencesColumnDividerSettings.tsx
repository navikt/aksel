import React from "react";
import { Checkbox, CheckboxGroup } from "../../form/checkbox";

type DataGridPreferencesColumnDividerSettingsProps = {
  value: boolean;
  onChange: (value: boolean) => void;
};

function DataGridPreferencesColumnDividerSettings({
  value,
  onChange,
}: DataGridPreferencesColumnDividerSettingsProps) {
  return (
    <CheckboxGroup
      legend="Kolonner"
      size="small"
      value={value ? ["columnDividers"] : []}
      onChange={(values: string[]) => {
        onChange(values.includes("columnDividers"));
      }}
    >
      <Checkbox
        value="columnDividers"
        description="Skiller kolonner fra hverandre med en strek"
      >
        Kolonnestrek
      </Checkbox>
    </CheckboxGroup>
  );
}

export { DataGridPreferencesColumnDividerSettings };
export type { DataGridPreferencesColumnDividerSettingsProps };
