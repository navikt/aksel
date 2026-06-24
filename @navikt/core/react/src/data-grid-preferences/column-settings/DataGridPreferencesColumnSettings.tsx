import React, { useCallback, useMemo } from "react";
import type { DataGridSettings } from "../../data-grid/root/DataGrid.types";
import DragAndDrop from "../../data/drag-and-drop/root/DragAndDropRoot";
import { Fieldset } from "../../form/fieldset";
import { Switch } from "../../form/switch";

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
  const visibleCount = columns.filter((c) => c.visible).length;
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
    onColumnsChange(columns.map((c) => ({ ...c, visible: newVisible })));
  }, [columns, isAllVisible, onColumnsChange]);

  const toggleColumn = useCallback(
    (id: string) => {
      onColumnsChange(
        columns.map((c) => (c.id === id ? { ...c, visible: !c.visible } : c)),
      );
    },
    [columns, onColumnsChange],
  );

  return (
    <Fieldset legend="Vis kolonner">
      <Switch size="small" checked={isAllVisible} onChange={toggleAll}>
        Velg alle
      </Switch>
      <DragAndDrop
        className="aksel-data-grid__preferences-dnd"
        items={dndItems}
        setItems={setDndItems}
        renderItem={(item) => (
          <Switch
            size="small"
            checked={colMap.get(item.id)?.visible ?? true}
            onChange={() => toggleColumn(item.id)}
          >
            {item.label}
          </Switch>
        )}
      />
    </Fieldset>
  );
}

export { DataGridPreferencesColumnSettings };
export type { DataGridPreferencesColumnDisplay };
