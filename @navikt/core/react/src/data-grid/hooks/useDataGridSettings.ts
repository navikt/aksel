import { useCallback, useMemo } from "react";
import { resolveDataGridSettings } from "../../data-grid-preferences/helpers/data-grid-settings";
import { useControllableState } from "../../utils/hooks";
import { type DataGridSettings } from "../root/DataGrid.types";

type UseDataGridSettingsArgs = {
  settings?: DataGridSettings;
  defaultSettings?: DataGridSettings;
  onSettingsChange?: (newSettings: DataGridSettings) => void;
};

function useDataGridSettings(args: UseDataGridSettingsArgs): {
  settings: ResolvedDataGridSettings;
  updateSettings: (newSettings: Partial<DataGridSettings>) => void;
} {
  const { settings: userSettings, defaultSettings, onSettingsChange } = args;

  const [settings, setSettings] = useControllableState<DataGridSettings>({
    defaultValue: defaultSettings ?? {},
    value: userSettings,
    onChange: onSettingsChange,
  });

  const resolvedSettings = useMemo(
    () => resolveDataGridSettings(settings),
    [settings],
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
