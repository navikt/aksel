import { Stack } from "@navikt/ds-react";
import { DataGrid } from "@navikt/ds-react/PREVIEW";
import { withDsExample } from "@/web/examples/withDsExample";
import { generateDataGridDemo } from "../../../components/website-modules/examples/__parts/DataGridDemoData";

const { columns } = generateDataGridDemo();

const Example = () => {
  return (
    <Stack height="100vh" padding="space-16" wrap={false}>
      <DataGrid columns={columns} data={[]} getRowId={(row) => row.caseId}>
        <DataGrid.Table layout="auto" emptyContent="Ingen data å vise..." />
      </DataGrid>
    </Stack>
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
  index: 0,
};
