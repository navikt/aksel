import { useState } from "react";
import { HStack, Select, VStack } from "@navikt/ds-react";
import { DataGrid } from "@navikt/ds-react/PREVIEW";
import { withDsExample } from "@/web/examples/withDsExample";
import { generateDataGridDemo } from "../../../components/website-modules/examples/__parts/DataGridDemoData";

const { columns, data } = generateDataGridDemo();

const Example = () => {
  const [userSettings, setUserSettings] = useState<DataGrid.Settings>({
    rowDensity: "normal",
    textSize: "medium",
    truncateContent: true,
    zebraStripes: false,
  });

  return (
    <VStack height="100vh" padding="space-16" gap="space-24">
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
          <option value="condensed">Condensed</option>
          <option value="normal">Normal</option>
          <option value="spacious">Spacious</option>
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
      </HStack>
      <DataGrid
        columns={columns}
        data={data}
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

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, {
  variant: "fullscreen",
});

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 5,
};
