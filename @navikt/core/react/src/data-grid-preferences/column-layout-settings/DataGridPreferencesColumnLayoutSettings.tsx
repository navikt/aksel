import React from "react";
import type { DataGridSettings } from "../../data-grid/root/DataGrid.types";
import { Checkbox, CheckboxGroup } from "../../form/checkbox";

type DataGridPreferencesColumnLayout = {
  columnDividers: boolean;
  stickyColumns: NonNullable<DataGridSettings["stickyColumns"]>;
};

type DataGridPreferencesColumnLayoutFields = {
  columnDividers?: boolean;
  stickyColumns?: boolean;
};

type DataGridPreferencesColumnLayoutSettingsProps = {
  value: DataGridPreferencesColumnLayout;
  onChange: (value: DataGridPreferencesColumnLayout) => void;
  /**
   * Controls which checkboxes are shown. Defaults to all visible.
   */
  fields?: DataGridPreferencesColumnLayoutFields;
};

function DataGridPreferencesColumnLayoutSettings({
  value,
  onChange,
  fields,
}: DataGridPreferencesColumnLayoutSettingsProps) {
  const { columnDividers, stickyColumns } = value;

  const showColumnDividers = fields?.columnDividers !== false;
  const showStickyColumns = fields?.stickyColumns !== false;

  if (!showColumnDividers && !showStickyColumns) {
    return null;
  }

  const checkboxValues = [
    ...(columnDividers ? ["columnDividers"] : []),
    ...(stickyColumns.start ? ["sticky-start"] : []),
    ...(stickyColumns.end ? ["sticky-end"] : []),
  ];

  return (
    <CheckboxGroup
      legend="Kolonneegenskaper"
      size="small"
      value={checkboxValues}
      onChange={(values: string[]) => {
        onChange({
          columnDividers: showColumnDividers
            ? values.includes("columnDividers")
            : columnDividers,
          stickyColumns: showStickyColumns
            ? {
                start: values.includes("sticky-start") ? 1 : undefined,
                end: values.includes("sticky-end") ? 1 : undefined,
              }
            : stickyColumns,
        });
      }}
    >
      {showColumnDividers && (
        <Checkbox
          value="columnDividers"
          description="Skiller kolonner fra hverandre med en strek"
        >
          Kolonnestrek
        </Checkbox>
      )}
      {showStickyColumns && (
        <Checkbox value="sticky-start">Fest første kolonne</Checkbox>
      )}
      {showStickyColumns && (
        <Checkbox value="sticky-end">Fest siste kolonne</Checkbox>
      )}
    </CheckboxGroup>
  );
}

export { DataGridPreferencesColumnLayoutSettings };
export type {
  DataGridPreferencesColumnLayout,
  DataGridPreferencesColumnLayoutFields,
  DataGridPreferencesColumnLayoutSettingsProps,
};
