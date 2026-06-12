import { useState } from "react";
import { HStack, Select, VStack } from "@navikt/ds-react";
import { DataGrid } from "@navikt/ds-react/PREVIEW";
import { withDsExample } from "@/web/examples/withDsExample";
import { generateDataGridDemo } from "../../../components/website-modules/examples/__parts/DataGridDemoData";

const { columns, data } = generateDataGridDemo();

const Example = () => {
  const [userSettings, setUserSettings] = useState<DataGrid.Settings>({
    rowDensity: "standard",
    textSize: "medium",
    truncateContent: true,
    zebraStripes: false,
    columnDividers: true,
  });

  return (
    <VStack height="100vh" padding="space-16" gap="space-24">
      <SettingsBar
        setUserSettings={setUserSettings}
        userSettings={userSettings}
      />
      <DataGrid
        columns={columns}
        data={data}
        getRowId={(row) => row.caseId}
        settings={userSettings}
        selection={{
          mode: "multiple",
        }}
      >
        <DataGrid.Table />
      </DataGrid>
    </VStack>
  );
};

function SettingsBar({
  setUserSettings,
  userSettings,
}: {
  userSettings: DataGrid.Settings;
  setUserSettings: React.Dispatch<React.SetStateAction<DataGrid.Settings>>;
}) {
  return (
    <HStack gap="space-16" align="center">
      <Select
        size="small"
        label="Radtetthet"
        value={userSettings.rowDensity}
        onChange={(e) =>
          setUserSettings((s) => ({
            ...s,
            rowDensity: e.target.value as DataGrid.Settings["rowDensity"],
          }))
        }
      >
        <option value="tight">Tight</option>
        <option value="standard">Standard</option>
        <option value="loose">Loose</option>
      </Select>
      <Select
        size="small"
        label="Tekststørrelse"
        value={userSettings.textSize}
        onChange={(e) =>
          setUserSettings((s) => ({
            ...s,
            textSize: e.target.value as DataGrid.Settings["textSize"],
          }))
        }
      >
        <option value="medium">Medium</option>
        <option value="small">Small</option>
      </Select>
      <Select
        size="small"
        label="Zebrastriper"
        value={userSettings.zebraStripes ? "on" : "off"}
        onChange={(e) =>
          setUserSettings((s) => ({
            ...s,
            zebraStripes: e.target.value === "on",
          }))
        }
      >
        <option value="on">På</option>
        <option value="off">Av</option>
      </Select>
      <Select
        size="small"
        label="Kutt innhold"
        value={userSettings.truncateContent ? "on" : "off"}
        onChange={(e) =>
          setUserSettings((s) => ({
            ...s,
            truncateContent: e.target.value === "on",
          }))
        }
      >
        <option value="on">På</option>
        <option value="off">Av</option>
      </Select>
      <Select
        size="small"
        label="Kolonne-separator"
        value={userSettings.columnDividers ? "on" : "off"}
        onChange={(e) =>
          setUserSettings((s) => ({
            ...s,
            columnDividers: e.target.value === "on",
          }))
        }
      >
        <option value="on">På</option>
        <option value="off">Av</option>
      </Select>
    </HStack>
  );
}

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, {
  variant: "fullscreen",
});

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 6,
};
