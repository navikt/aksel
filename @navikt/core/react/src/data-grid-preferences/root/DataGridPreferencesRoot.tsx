import React, { forwardRef, useCallback, useMemo } from "react";
import { CogIcon } from "@navikt/aksel-icons";
import { Button } from "../../button";
import type { DataGridSettings } from "../../data-grid/root/DataGrid.types";
import { useDataGridContext } from "../../data-grid/root/DataGridRoot.context";
import {
  Dialog,
  DialogBody,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "../../dialog";
import { cl } from "../../utils/helpers";
import { useControllableState } from "../../utils/hooks";
import { DataGridPreferencesColumnLayoutSettings } from "../column-layout-settings/DataGridPreferencesColumnLayoutSettings";
import {
  type DataGridPreferencesColumnDisplay,
  DataGridPreferencesColumnSettings,
} from "../column-settings/DataGridPreferencesColumnSettings";
import { resolveDataGridSettings } from "../helpers/data-grid-settings";
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
 * <DataGrid columns={columns} data={data} onSettingsChange={handleSettingsChange}>
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
        "[Aksel] DataGrid.Preferences must be used within DataGrid",
      );
    }

    const { tableSettings, updateTableSettings, columnDefinitions } = context;

    const [open, setOpen] = useControllableState({
      defaultValue: defaultOpen,
      value: openParam,
      onChange: onOpenChange,
    });

    const resolved = useMemo(
      () => resolveDataGridSettings(tableSettings ?? {}),
      [tableSettings],
    );

    const columnDefinitionMap = useMemo(
      () => new Map(columnDefinitions.map((col) => [col.id, col.header])),
      [columnDefinitions],
    );

    /**
     * Combines the saved column order/visibility (`tableSettings.columnDisplay`)
     * with column labels from `columnDefinitions`. Falls back to all columns
     * visible in definition order when `columnDisplay` is unset.
     */
    const columnEntries = useMemo((): DataGridPreferencesColumnDisplay[] => {
      const display =
        tableSettings?.columnDisplay ??
        columnDefinitions.map((col) => ({ id: col.id, visible: true }));

      return display.flatMap(({ id, visible }) => {
        const label = columnDefinitionMap.get(id);
        return label ? [{ id, label, visible }] : [];
      });
    }, [columnDefinitionMap, tableSettings?.columnDisplay, columnDefinitions]);

    const handleColumnsChange = useCallback(
      (columns: DataGridPreferencesColumnDisplay[]) => {
        updateTableSettings?.({
          columnDisplay: columns.map(({ id, visible }) => ({ id, visible })),
        });
      },
      [updateTableSettings],
    );

    return (
      <Dialog
        open={open}
        onOpenChange={setOpen}
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
        <DialogPopup width="large" position="right" rootElement={rootElement}>
          <DialogHeader withClosebutton>
            <DialogTitle>Innstillinger</DialogTitle>
          </DialogHeader>
          <DialogBody className="aksel-data-grid__preferences-body">
            <div className="aksel-data-grid__preferences-content">
              <div className="aksel-data-grid__preferences-block">
                {isFieldVisible("rowDensity", fields) && (
                  <DataGridPreferencesRowDensitySettings
                    value={resolved.rowDensity}
                    onChange={(value) =>
                      updateTableSettings?.({ rowDensity: value })
                    }
                  />
                )}
                {isFieldVisible("textSize", fields) && (
                  <DataGridPreferencesTextSizeSettings
                    value={resolved.textSize}
                    onChange={(value) =>
                      updateTableSettings?.({ textSize: value })
                    }
                  />
                )}

                <DataGridPreferencesRowPropertiesSettings
                  fields={{
                    truncateContent: isFieldVisible("truncateContent", fields),
                    zebraStripes: isFieldVisible("zebraStripes", fields),
                  }}
                  value={{
                    truncateContent: resolved.truncateContent,
                    zebraStripes: resolved.zebraStripes,
                  }}
                  onChange={(value) => updateTableSettings?.(value)}
                />

                <DataGridPreferencesColumnLayoutSettings
                  fields={{
                    columnDividers: isFieldVisible("columnDividers", fields),
                    stickyColumns: isFieldVisible("stickyColumns", fields),
                  }}
                  value={{
                    columnDividers: resolved.columnDividers,
                    stickyColumns: resolved.stickyColumns,
                  }}
                  onChange={(value) => updateTableSettings?.(value)}
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

// eslint-disable-next-line @typescript-eslint/no-namespace, import/export
export namespace DataGridPreferencesRoot {
  export type Props = DataGridPreferencesProps;
}

export type { DataGridPreferencesProps };
// eslint-disable-next-line import/export
export { DataGridPreferencesRoot };
export default DataGridPreferencesRoot;
