import React, { forwardRef, useCallback, useMemo, useState } from "react";
import { CogIcon } from "@navikt/aksel-icons";
import { Button } from "../../button";
import DragAndDrop from "../../data/drag-and-drop/root/DragAndDropRoot";
import {
  Dialog,
  DialogBody,
  DialogCloseTrigger,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "../../dialog";
import { Checkbox, CheckboxGroup } from "../../form/checkbox";
import { Fieldset } from "../../form/fieldset";
import { Radio, RadioGroup } from "../../form/radio";
import { Switch } from "../../form/switch";
import { cl } from "../../utils/helpers";
import {
  type DataGridSettings,
  DataGridSettingsOptions,
} from "../root/DataGrid.types";
import { useDataGridContext } from "../root/DataGridRoot.context";

type ColumnDisplayEntry = { id: string; label: string; visible: boolean };

interface DataGridPreferencesProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: never;
}

/**
 * Component for displaying preferences/settings for data-grid.
 *
 * **WARNING: This component is in active development and may receive breaking changes outside major releases!**
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/datagrid)
 * @see 🏷️ {@link DataGridPreferences}
 *
 * @example
 * ```jsx
 * ```
 */
const DataGridPreferences = forwardRef<
  HTMLButtonElement,
  DataGridPreferencesProps
>(({ className, ...rest }: DataGridPreferencesProps, forwardedRef) => {
  const context = useDataGridContext(false);

  if (!context) {
    throw new Error(
      "[Aksel] DataGrid.Preferences must be used within a DataGrid",
    );
  }

  const { tableSettings, updateTableSettings, columnDefinitions } = context;
  const [open, setOpen] = useState(true /* TODO: Only for testing */);
  const [draft, setDraft] = useState<DataGridSettings>({});

  function handleOpenChange(nextOpen: boolean) {
    if (nextOpen) {
      setDraft(tableSettings ?? {});
    }
    setOpen(nextOpen);
  }

  function handleSave() {
    updateTableSettings?.(draft);
    setOpen(false);
  }

  /**
   * Merges draft.columnDisplay (order + visibility) with columnDefinitions (labels).
   * Falls back to all columns visible in definition order when columnDisplay is unset.
   */
  const columnEntries = useMemo((): ColumnDisplayEntry[] => {
    const display =
      draft.columnDisplay ??
      columnDefinitions.map((col) => ({ id: col.id, visible: true }));
    return display
      .map(({ id, visible }) => {
        const def = columnDefinitions.find((c) => c.id === id);
        return def ? { id, label: def.header, visible } : null;
      })
      .filter((c): c is ColumnDisplayEntry => c !== null);
  }, [draft.columnDisplay, columnDefinitions]);

  function handleColumnsChange(columns: ColumnDisplayEntry[]) {
    setDraft((prev) => ({
      ...prev,
      columnDisplay: columns.map(({ id, visible }) => ({ id, visible })),
    }));
  }

  const rowPropertyValues = [
    ...(draft.truncateContent ? ["truncateContent"] : []),
    ...(draft.zebraStripes ? ["zebraStripes"] : []),
  ];

  const stickyColumnValues = [
    ...(draft.stickyColumns?.start ? ["sticky-start"] : []),
    ...(draft.stickyColumns?.end ? ["sticky-end"] : []),
  ];

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger>
        <Button
          ref={forwardedRef}
          {...rest}
          variant="tertiary"
          size="small"
          data-color="neutral"
          icon={<CogIcon />}
          className={cl("aksel-data-grid__preferences-button", className)}
        />
      </DialogTrigger>
      <DialogPopup width="medium" position="right">
        <DialogHeader withClosebutton>
          <DialogTitle>Innstillinger</DialogTitle>
        </DialogHeader>
        <DialogBody className="aksel-data-grid__preferences-body">
          <div className="aksel-data-grid__preferences-content">
            <div className="aksel-data-grid__preferences-block">
              <RadioGroup
                legend="Velg radtetthet"
                size="small"
                onChange={(value) => {
                  setDraft((prev) => ({
                    ...prev,
                    rowDensity: value as DataGridSettings["rowDensity"],
                  }));
                }}
                value={draft.rowDensity}
              >
                {Object.entries(DataGridSettingsOptions.rowDensity).map(
                  ([key, value]) => (
                    <Radio key={key} value={key}>
                      {value}
                    </Radio>
                  ),
                )}
              </RadioGroup>
              <RadioGroup
                legend="Tekststørrelse"
                size="small"
                onChange={(value) => {
                  setDraft((prev) => ({
                    ...prev,
                    textSize: value as DataGridSettings["textSize"],
                  }));
                }}
                value={draft.textSize}
              >
                {Object.entries(DataGridSettingsOptions.textSize).map(
                  ([key, value]) => (
                    <Radio key={key} value={key}>
                      {value}
                    </Radio>
                  ),
                )}
              </RadioGroup>
              <CheckboxGroup
                legend="Radegenskaper"
                size="small"
                value={rowPropertyValues}
                onChange={(values: string[]) => {
                  setDraft((prev) => ({
                    ...prev,
                    truncateContent: values.includes("truncateContent"),
                    zebraStripes: values.includes("zebraStripes"),
                  }));
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
                {/* TODO: Setting not yet available */}
                {/* <Checkbox
                  value="columnDividers"
                  description="Skiller kolonner fra hverandre med en strek"
                  defaultChecked={draft.columnDisplay === "dividers"}

                >
                  Kolonnestrek
                </Checkbox> */}
              </CheckboxGroup>
              <CheckboxGroup
                legend="Sticky kolonner"
                size="small"
                value={stickyColumnValues}
                onChange={(values: string[]) => {
                  setDraft((prev) => ({
                    ...prev,
                    stickyColumns: {
                      start: values.includes("sticky-start") ? 1 : undefined,
                      end: values.includes("sticky-end") ? 1 : undefined,
                    },
                  }));
                }}
              >
                <Checkbox value="sticky-start">Første kolonne</Checkbox>
                <Checkbox value="sticky-end">Siste kolonne</Checkbox>
              </CheckboxGroup>
            </div>
            <ColumnDisplayBlock
              columns={columnEntries}
              onColumnsChange={handleColumnsChange}
            />
          </div>
        </DialogBody>

        <DialogFooter className="aksel-data-grid__preferences-footer">
          <DialogCloseTrigger>
            <Button variant="secondary">Avbryt</Button>
          </DialogCloseTrigger>
          <Button onClick={handleSave}>Lagre</Button>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  );
});

function ColumnDisplayBlock({
  columns,
  onColumnsChange,
}: {
  columns: ColumnDisplayEntry[];
  onColumnsChange: (columns: ColumnDisplayEntry[]) => void;
}) {
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
    <div className="aksel-data-grid__preferences-block">
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
    </div>
  );
}

export { DataGridPreferences }; // DataGridRoot needs to be exported b.c. of docgen
export default DataGridPreferences;
