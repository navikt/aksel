import { useCallback, useMemo } from "react";
import { useControllableState } from "../../utils/hooks";
import type { DataGridSettings } from "../root/DataGrid.types";

type UseDataGridSettingsArgs = {
  settings?: DataGridSettings;
  defaultSettings?: DataGridSettings;
  onSettingsChange?: (newSettings: DataGridSettings) => void;
};

function useDataGridSettings(args: UseDataGridSettingsArgs): {
  settings: DataGridSettings;
  updateSettings: (newSettings: Partial<DataGridSettings>) => void;
} {
  const { settings: userSettings, defaultSettings, onSettingsChange } = args;

  const [settings, setSettings] = useControllableState<DataGridSettings>({
    defaultValue: defaultSettings ?? {},
    value: userSettings,
    onChange: onSettingsChange,
  });

  const resolvedSettings = useMemo(
    () => ({
      rowDensity: settings?.rowDensity ?? "standard",
      zebraStripes: settings?.zebraStripes ?? false,
      truncateContent: settings?.truncateContent ?? true,
      stickyColumns: settings?.stickyColumns ?? {},
      textSize: settings?.textSize ?? "medium",
      columnDisplay: settings?.columnDisplay,
      columnDividers: settings?.columnDividers ?? true,
    }),
    [
      settings?.rowDensity,
      settings?.zebraStripes,
      settings?.truncateContent,
      settings?.stickyColumns,
      settings?.textSize,
      settings?.columnDisplay,
      settings?.columnDividers,
    ],
  );

  const updateSettings = useCallback(
    (newSettings: Partial<DataGridSettings>) => {
      setSettings((prevSettings) => ({
        ...prevSettings,
        ...newSettings,
      }));
    },
    [setSettings],
  );

  return {
    settings: resolvedSettings,
    updateSettings,
  };
}

export { useDataGridSettings };
