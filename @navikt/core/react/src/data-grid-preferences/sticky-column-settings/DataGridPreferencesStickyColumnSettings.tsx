import React from "react";
import type { DataGridSettings } from "../../data-grid/root/DataGrid.types";
import { Checkbox, CheckboxGroup } from "../../form/checkbox";

type DataGridPreferencesStickyColumns = NonNullable<
  DataGridSettings["stickyColumns"]
>;

type DataGridPreferencesStickyColumnSettingsProps = {
  value?: DataGridPreferencesStickyColumns;
  onChange: (value: DataGridPreferencesStickyColumns) => void;
};

function DataGridPreferencesStickyColumnSettings({
  value,
  onChange,
}: DataGridPreferencesStickyColumnSettingsProps) {
  const checkboxValues = [
    ...(value?.start ? ["sticky-start"] : []),
    ...(value?.end ? ["sticky-end"] : []),
  ];

  return (
    <CheckboxGroup
      legend="Sticky kolonner"
      size="small"
      value={checkboxValues}
      onChange={(values: string[]) => {
        onChange({
          start: values.includes("sticky-start") ? 1 : undefined,
          end: values.includes("sticky-end") ? 1 : undefined,
        });
      }}
    >
      <Checkbox value="sticky-start">Første kolonne</Checkbox>
      <Checkbox value="sticky-end">Siste kolonne</Checkbox>
    </CheckboxGroup>
  );
}

export { DataGridPreferencesStickyColumnSettings };
export type {
  DataGridPreferencesStickyColumns,
  DataGridPreferencesStickyColumnSettingsProps,
};
