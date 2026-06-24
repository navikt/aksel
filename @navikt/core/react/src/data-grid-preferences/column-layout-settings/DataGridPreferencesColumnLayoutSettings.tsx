import React from "react";
import type { DataGridSettings } from "../../data-grid/root/DataGrid.types";
import { Checkbox, CheckboxGroup } from "../../form/checkbox";

type DataGridPreferencesColumnLayout = {
  columnDividers: boolean;
  stickyColumns: NonNullable<DataGridSettings["stickyColumns"]>;
};

type DataGridPreferencesColumnLayoutSettingsProps = {
  value: DataGridPreferencesColumnLayout;
  onChange: (value: DataGridPreferencesColumnLayout) => void;
};

function DataGridPreferencesColumnLayoutSettings({
  value,
  onChange,
}: DataGridPreferencesColumnLayoutSettingsProps) {
  const { columnDividers, stickyColumns } = value;

  const checkboxValues = [
    ...(columnDividers ? ["columnDividers"] : []),
    ...(stickyColumns.start ? ["sticky-start"] : []),
    ...(stickyColumns.end ? ["sticky-end"] : []),
  ];

  return (
    <CheckboxGroup
      legend="Kolonner"
      size="small"
      value={checkboxValues}
      onChange={(values: string[]) => {
        onChange({
          columnDividers: values.includes("columnDividers"),
          stickyColumns: {
            start: values.includes("sticky-start") ? 1 : undefined,
            end: values.includes("sticky-end") ? 1 : undefined,
          },
        });
      }}
    >
      <Checkbox
        value="columnDividers"
        description="Skiller kolonner fra hverandre med en strek"
      >
        Kolonnestrek
      </Checkbox>
      <Checkbox value="sticky-start">Fest første kolonne</Checkbox>
      <Checkbox value="sticky-end">Fest siste kolonne</Checkbox>
    </CheckboxGroup>
  );
}

export { DataGridPreferencesColumnLayoutSettings };
export type {
  DataGridPreferencesColumnLayout,
  DataGridPreferencesColumnLayoutSettingsProps,
};
