import React, { useCallback, useMemo } from "react";
import type { DataGridSettings } from "../../data-grid/root/DataGrid.types";
import DragAndDrop from "../../data/drag-and-drop/root/DragAndDropRoot";
import { Checkbox } from "../../form/checkbox";
import { Fieldset } from "../../form/fieldset";

type DataGridPreferencesColumnDisplay = NonNullable<
  DataGridSettings["columnDisplay"]
>[number] & {
  label: string;
};

type DataGridPreferencesColumnSettingsProps = {
  columns: DataGridPreferencesColumnDisplay[];
  onColumnsChange: (columns: DataGridPreferencesColumnDisplay[]) => void;
};

function DataGridPreferencesColumnSettings({
  columns,
  onColumnsChange,
}: DataGridPreferencesColumnSettingsProps) {
  const visibleCount = columns.filter((c) => !!c.visible).length;
  const isAllVisible = visibleCount === columns.length;

  const dndItems = useMemo(
    () => columns.map(({ id, label }) => ({ id, label })),
    [columns],
  );

  const colMap = useMemo(
    () => new Map(columns.map((c) => [c.id, c])),
    [columns],
  );

  const setDndItems = useCallback(
    (action: React.SetStateAction<{ id: string; label: string }[]>) => {
      const newItems = typeof action === "function" ? action(dndItems) : action;
      onColumnsChange(
        newItems.flatMap((item) => {
          const col = colMap.get(item.id);
          return col ? [col] : [];
        }),
      );
    },
    [colMap, dndItems, onColumnsChange],
  );

  const toggleAll = useCallback(() => {
    const newVisible = !isAllVisible;

    onColumnsChange(
      columns.map((c) => ({
        ...c,
        visible: c.visible === "always" ? "always" : newVisible,
      })),
    );
  }, [columns, isAllVisible, onColumnsChange]);

  const toggleColumn = useCallback(
    (id: string) => {
      const col = colMap.get(id);
      if (col?.visible === "always") return;
      onColumnsChange(
        columns.map((c) => (c.id === id ? { ...c, visible: !c.visible } : c)),
      );
    },
    [colMap, columns, onColumnsChange],
  );

  return (
    <Fieldset legend="Vis kolonner">
      <Checkbox
        size="small"
        checked={isAllVisible}
        indeterminate={visibleCount > 0 && !isAllVisible}
        onChange={toggleAll}
      >
        {`Velg alle (${visibleCount}/${columns.length})`}
      </Checkbox>
      <DragAndDrop
        className="aksel-data-grid__preferences-dnd"
        items={dndItems}
        setItems={setDndItems}
        renderItem={(item) => {
          const visibleState = colMap.get(item.id)?.visible ?? true;
          const alwaysVisible = visibleState === "always";

          return (
            <Checkbox
              size="small"
              checked={visibleState !== false}
              onChange={() => toggleColumn(item.id)}
              disabled={alwaysVisible}
            >
              {item.label}
            </Checkbox>
          );
        }}
      />
    </Fieldset>
  );
}

export { DataGridPreferencesColumnSettings };
export type { DataGridPreferencesColumnDisplay };
