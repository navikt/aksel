import React, { forwardRef, useMemo, useState } from "react";
import { CogIcon } from "@navikt/aksel-icons";
import { Button } from "../../button";
import { DataGridSettings } from "../../data-grid/root/DataGrid.types";
import { useDataGridContext } from "../../data-grid/root/DataGridRoot.context";
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
import { cl } from "../../utils/helpers";
import {
  type DataGridPreferencesColumnDisplay,
  DataGridPreferencesColumnSettings,
} from "../column-settings/DataGridPreferencesColumnSettings";
import { resolveDataGridSettings } from "../helpers/data-grid-settings";
import { DataGridPreferencesRowDensitySettings } from "../row-density-settings/DataGridPreferencesRowDensitySettings";
import { DataGridPreferencesRowPropertiesSettings } from "../row-properties-settings/DataGridPreferencesRowPropertiesSettings";
import { DataGridPreferencesStickyColumnSettings } from "../sticky-column-settings/DataGridPreferencesStickyColumnSettings";
import { DataGridPreferencesTextSizeSettings } from "../text-size-settings/DataGridPreferencesTextSizeSettings";

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
const DataGridPreferencesRoot = forwardRef<
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
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<DataGridSettings>({});

  const resolvedDraft = resolveDataGridSettings(draft);

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

  const columnDefinitionMap = useMemo(
    () => new Map(columnDefinitions.map((col) => [col.id, col.header])),
    [columnDefinitions],
  );

  /**
   * Merges draft.columnDisplay (order + visibility) with columnDefinitions (labels).
   * Falls back to all columns visible in definition order when columnDisplay is unset.
   */
  const columnEntries = useMemo((): DataGridPreferencesColumnDisplay[] => {
    const display =
      draft.columnDisplay ??
      columnDefinitions.map((col) => ({ id: col.id, visible: true }));

    return display.flatMap(({ id, visible }) => {
      const label = columnDefinitionMap.get(id);
      return label ? [{ id, label, visible }] : [];
    });
  }, [columnDefinitionMap, draft.columnDisplay, columnDefinitions]);

  function handleColumnsChange(columns: DataGridPreferencesColumnDisplay[]) {
    setDraft((prev) => ({
      ...prev,
      columnDisplay: columns.map(({ id, visible }) => ({ id, visible })),
    }));
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger>
        <Button
          ref={forwardedRef}
          aria-label="Åpne innstillinger for tabell"
          {...rest}
          variant="tertiary"
          size="small"
          data-color="neutral"
          icon={<CogIcon />}
          className={cl("aksel-data-grid__preferences-button", className)}
          /* TODO: i18n */
        />
      </DialogTrigger>
      <DialogPopup width="medium" position="right">
        <DialogHeader withClosebutton>
          <DialogTitle>Innstillinger</DialogTitle>
        </DialogHeader>
        <DialogBody className="aksel-data-grid__preferences-body">
          <div className="aksel-data-grid__preferences-content">
            <div className="aksel-data-grid__preferences-block">
              <DataGridPreferencesRowDensitySettings
                value={resolvedDraft.rowDensity}
                onChange={(value) => {
                  setDraft((prev) => ({
                    ...prev,
                    rowDensity: value,
                  }));
                }}
              />

              <DataGridPreferencesTextSizeSettings
                value={resolvedDraft.textSize}
                onChange={(value) => {
                  setDraft((prev) => ({
                    ...prev,
                    textSize: value,
                  }));
                }}
              />
              <DataGridPreferencesRowPropertiesSettings
                value={{
                  truncateContent: resolvedDraft.truncateContent,
                  zebraStripes: resolvedDraft.zebraStripes,
                  columnDividers: resolvedDraft.columnDividers,
                }}
                onChange={(value) => {
                  setDraft((prev) => ({
                    ...prev,
                    ...value,
                  }));
                }}
              />
              <DataGridPreferencesStickyColumnSettings
                value={resolvedDraft.stickyColumns}
                onChange={(value) => {
                  setDraft((prev) => ({
                    ...prev,
                    stickyColumns: value,
                  }));
                }}
              />
            </div>
            <div className="aksel-data-grid__preferences-block">
              <DataGridPreferencesColumnSettings
                columns={columnEntries}
                onColumnsChange={handleColumnsChange}
              />
            </div>
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

export { DataGridPreferencesRoot };
export default DataGridPreferencesRoot;
