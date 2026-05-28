import React, { forwardRef, useMemo, useState } from "react";
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

  const { tableSettings, updateTableSettings } = context;
  const [open, setOpen] = useState(true /* TODO: true for testing only */);
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

  const rowPropertyValues = [
    ...(draft.truncateContent ? ["truncateContent"] : []),
    ...(draft.zebraStripes ? ["zebraStripes"] : []),
  ];

  const stickyColumnValues = [
    ...(draft.stickyColumns?.start ? ["sticky-start"] : []),
    ...(draft.stickyColumns?.end ? ["sticky-end"] : []),
  ];

  return (
    <Dialog open={open} onOpenChange={(nextOpen) => handleOpenChange(nextOpen)}>
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
      <DialogPopup width="large" position="right">
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
                  defaultChecked={draft.truncateContent}
                >
                  Kutt innhold
                </Checkbox>
                <Checkbox
                  value="zebraStripes"
                  description="Legger på en bakgrunnsfarge for annenhver rad"
                  defaultChecked={draft.zebraStripes}
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
            <DragNDropSettingsBlock
              columnDisplay={draft.columnDisplay}
              setDraft={setDraft}
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

function DragNDropSettingsBlock({
  columnDisplay,
  setDraft,
}: {
  columnDisplay: DataGridSettings["columnDisplay"];
  setDraft: React.Dispatch<React.SetStateAction<DataGridSettings>>;
}) {
  const context = useDataGridContext();

  /**
   * Single source of truth for the ordered+visible column list.
   * - No columnDisplay set → all columns visible in definition order.
   * - columnDisplay set → columns in display order with saved visibility.
   */
  const mergedColumns = useMemo(() => {
    const defs = context.columnDefinitions;
    if (!columnDisplay) {
      return defs.map((col) => ({
        id: col.id,
        label: col.header,
        visible: true,
      }));
    }
    return columnDisplay
      .map((displayCol) => {
        const def = defs.find((c) => c.id === displayCol.id);
        if (!def) return null;
        return { id: def.id, label: def.header, visible: displayCol.visible };
      })
      .filter(
        (c): c is { id: string; label: string; visible: boolean } => c !== null,
      );
  }, [columnDisplay, context.columnDefinitions]);

  const isAllVisible =
    mergedColumns.length > 0 && mergedColumns.every((col) => col.visible);

  const dndItems = useMemo(
    () => mergedColumns.map(({ id, label }) => ({ id, label })),
    [mergedColumns],
  );

  function setDndItems(
    action: React.SetStateAction<{ id: string; label: string }[]>,
  ) {
    const newItems = typeof action === "function" ? action(dndItems) : action;
    const visibilityMap = new Map(mergedColumns.map((c) => [c.id, c.visible]));
    setDraft((prev) => ({
      ...prev,
      columnDisplay: newItems.map((item) => ({
        id: item.id,
        visible: visibilityMap.get(item.id) ?? true,
      })),
    }));
  }

  function toggleAll() {
    const newVisible = !isAllVisible;
    setDraft((prev) => ({
      ...prev,
      columnDisplay: mergedColumns.map(({ id }) => ({
        id,
        visible: newVisible,
      })),
    }));
  }

  function toggleColumn(id: string) {
    const col = mergedColumns.find((c) => c.id === id);
    const newVisible = !(col?.visible ?? true);
    setDraft((prev) => ({
      ...prev,
      columnDisplay: mergedColumns.map((c) => ({
        id: c.id,
        visible: c.id === id ? newVisible : c.visible,
      })),
    }));
  }

  return (
    <div className="aksel-data-grid__preferences-block">
      <Fieldset legend="Vis kolonner">
        <Switch size="small" checked={isAllVisible} onChange={toggleAll}>
          Velg alle
        </Switch>
        <DragAndDrop
          items={dndItems}
          setItems={setDndItems}
          renderItem={(item) => (
            <Switch
              size="small"
              checked={
                mergedColumns.find((c) => c.id === item.id)?.visible ?? true
              }
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
