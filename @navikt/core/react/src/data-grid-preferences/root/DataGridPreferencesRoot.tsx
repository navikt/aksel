import React, { forwardRef, useMemo, useState } from "react";
import { CogIcon } from "@navikt/aksel-icons";
import { Button } from "../../button";
import {
  DataGridSettings,
  DataGridSettingsOptions,
} from "../../data-grid/root/DataGrid.types";
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
import { Checkbox, CheckboxGroup } from "../../form/checkbox";
import { Radio, RadioGroup } from "../../form/radio";
import { cl } from "../../utils/helpers";
import {
  type DataGridPreferencesColumnDisplay,
  DataGridPreferencesColumnSettings,
} from "../column-settings/DataGridPreferencesColumnSettings";
import { DataGridPreferencesRowDensitySettings } from "../row-density-settings/DataGridPreferencesRowDensitySettings";

type TextSizeOption = keyof typeof DataGridSettingsOptions.textSize;

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

  function isTextSizeOption(value: string): value is TextSizeOption {
    return value in DataGridSettingsOptions.textSize;
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
                value={draft.rowDensity}
                onChange={(value) => {
                  setDraft((prev) => ({
                    ...prev,
                    rowDensity: value,
                  }));
                }}
              />

              <RadioGroup
                legend="Tekststørrelse"
                size="small"
                onChange={(value) => {
                  if (!isTextSizeOption(value)) {
                    return;
                  }

                  setDraft((prev) => ({
                    ...prev,
                    textSize: value,
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
