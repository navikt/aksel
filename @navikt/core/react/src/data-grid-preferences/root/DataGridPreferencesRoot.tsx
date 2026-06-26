import React, { forwardRef, useCallback, useMemo, useState } from "react";
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
import { useClientLayoutEffect } from "../../utils-external";
import { cl } from "../../utils/helpers";
import { useControllableState } from "../../utils/hooks";
import { DataGridPreferencesColumnLayoutSettings } from "../column-layout-settings/DataGridPreferencesColumnLayoutSettings";
import {
  type DataGridPreferencesColumnDisplay,
  DataGridPreferencesColumnSettings,
} from "../column-settings/DataGridPreferencesColumnSettings";
import {
  diffDataGridSettings,
  resolveDataGridSettings,
} from "../helpers/data-grid-settings";
import { DataGridPreferencesRowDensitySettings } from "../row-density-settings/DataGridPreferencesRowDensitySettings";
import { DataGridPreferencesRowPropertiesSettings } from "../row-properties-settings/DataGridPreferencesRowPropertiesSettings";
import { DataGridPreferencesTextSizeSettings } from "../text-size-settings/DataGridPreferencesTextSizeSettings";

interface DataGridPreferencesProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: never;
  /**
   * Controls which preference fields are shown.
   *
   * All fields are visible by default. Set a field to `false` to hide it.
   * Fields left out of the object stay visible.
   *
   * @example
   * // Hide the text size field
   * fields={{ textSize: false }}
   */
  fields?: Partial<Record<keyof DataGridSettings, boolean>>;
  /**
   * Whether the DataGrid Preferences dialog is currently open.
   */
  open?: boolean;
  /**
   * Whether the DataGrid Preferences dialog should be initially open.
   *
   * To render a controlled dialog, use the `open` prop instead.
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Event handler called when the DataGrid Preferences dialog is opened or closed.
   */
  onOpenChange?: (nextOpen: boolean) => void;
  /**
   * Event handler called after any animations complete when the DataGrid Preferences dialog is opened or closed.
   */
  onOpenChangeComplete?: (open: boolean) => void;
  /**
   * An optional container where the portaled content should be appended.
   */
  rootElement?: HTMLElement | null;
}

/**
 * Component for displaying preferences/settings for DataGrid.
 *
 * **WARNING: This component is in active development and may receive breaking changes outside major releases!**
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/datagrid)
 * @see 🏷️ {@link DataGridPreferences}
 *
 * @example
 * ```jsx
 * <DataGrid columns={columns} data={data}>
 *   <DataGrid.Preferences />
 *   <DataGrid.Table />
 * </DataGrid>
 * ```
 */
const DataGridPreferencesRoot = forwardRef<
  HTMLButtonElement,
  DataGridPreferencesProps
>(
  (
    {
      className,
      fields,
      rootElement,
      open: openParam,
      defaultOpen,
      onOpenChange,
      onOpenChangeComplete,
      ...rest
    }: DataGridPreferencesProps,
    forwardedRef,
  ) => {
    const context = useDataGridContext(false);

    if (!context) {
      throw new Error(
        "[Aksel] DataGrid.Preferences must be used within a DataGrid",
      );
    }

    const { tableSettings, updateTableSettings, columnDefinitions } = context;

    const [open, setOpenStateInternal] = useControllableState({
      defaultValue: defaultOpen,
      value: openParam,
      onChange: onOpenChange,
    });

    const [draft, setDraft] = useState<DataGridSettings>({});

    const resolvedDraft = useMemo(
      () => resolveDataGridSettings(draft),
      [draft],
    );

    /**
     * Seed the draft from the current table settings whenever the dialog opens,
     * including when opened via the `open`/`defaultOpen` props. `tableSettings`
     * is intentionally excluded so external updates don't reset an in-progress
     * draft.
     */
    useClientLayoutEffect(() => {
      if (open) {
        setDraft(tableSettings ?? {});
      }
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [open]);

    const handleOpenChange = useCallback(
      (nextOpen: boolean) => {
        setOpenStateInternal(nextOpen);
      },
      [setOpenStateInternal],
    );

    const handleSave = useCallback(() => {
      const changes = diffDataGridSettings(tableSettings ?? {}, draft);
      if (Object.keys(changes).length > 0) {
        updateTableSettings?.(changes);
      }
      handleOpenChange(false);
    }, [tableSettings, draft, handleOpenChange, updateTableSettings]);

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

    const handleColumnsChange = useCallback(
      (columns: DataGridPreferencesColumnDisplay[]) => {
        setDraft((prev) => ({
          ...prev,
          columnDisplay: columns.map(({ id, visible }) => ({ id, visible })),
        }));
      },
      [],
    );

    return (
      <Dialog
        open={open}
        onOpenChange={handleOpenChange}
        onOpenChangeComplete={onOpenChangeComplete}
        size="small"
      >
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
        <DialogPopup width="large" position="center" rootElement={rootElement}>
          <DialogHeader withClosebutton>
            <DialogTitle>Innstillinger</DialogTitle>
          </DialogHeader>
          <DialogBody className="aksel-data-grid__preferences-body">
            <div className="aksel-data-grid__preferences-content">
              <div className="aksel-data-grid__preferences-block">
                {isFieldVisible("rowDensity", fields) && (
                  <DataGridPreferencesRowDensitySettings
                    value={resolvedDraft.rowDensity}
                    onChange={(value) => {
                      setDraft((prev) => ({
                        ...prev,
                        rowDensity: value,
                      }));
                    }}
                  />
                )}
                {isFieldVisible("textSize", fields) && (
                  <DataGridPreferencesTextSizeSettings
                    value={resolvedDraft.textSize}
                    onChange={(value) => {
                      setDraft((prev) => ({
                        ...prev,
                        textSize: value,
                      }));
                    }}
                  />
                )}

                <DataGridPreferencesRowPropertiesSettings
                  fields={{
                    truncateContent: isFieldVisible("truncateContent", fields),
                    zebraStripes: isFieldVisible("zebraStripes", fields),
                  }}
                  value={{
                    truncateContent: resolvedDraft.truncateContent,
                    zebraStripes: resolvedDraft.zebraStripes,
                  }}
                  onChange={(value) => {
                    setDraft((prev) => ({
                      ...prev,
                      ...value,
                    }));
                  }}
                />

                <DataGridPreferencesColumnLayoutSettings
                  fields={{
                    columnDividers: isFieldVisible("columnDividers", fields),
                    stickyColumns: isFieldVisible("stickyColumns", fields),
                  }}
                  value={{
                    columnDividers: resolvedDraft.columnDividers,
                    stickyColumns: resolvedDraft.stickyColumns,
                  }}
                  onChange={(value) => {
                    setDraft((prev) => ({
                      ...prev,
                      columnDividers: value.columnDividers,
                      stickyColumns: value.stickyColumns,
                    }));
                  }}
                />
              </div>
              <div className="aksel-data-grid__preferences-block">
                {isFieldVisible("columnDisplay", fields) && (
                  <DataGridPreferencesColumnSettings
                    columns={columnEntries}
                    onColumnsChange={handleColumnsChange}
                  />
                )}
              </div>
            </div>
          </DialogBody>

          <DialogFooter className="aksel-data-grid__preferences-footer">
            <DialogCloseTrigger>
              <Button size="small" variant="secondary">
                Avbryt
              </Button>
            </DialogCloseTrigger>
            <Button size="small" onClick={handleSave}>
              Lagre
            </Button>
          </DialogFooter>
        </DialogPopup>
      </Dialog>
    );
  },
);

function isFieldVisible(
  key: keyof DataGridSettings,
  fields?: Partial<Record<keyof DataGridSettings, boolean>>,
) {
  return fields?.[key] !== false;
}

export { DataGridPreferencesRoot };
export type { DataGridPreferencesProps };
export default DataGridPreferencesRoot;
