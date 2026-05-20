import { Box, Stack } from "@navikt/ds-react";
import { DataGrid } from "@navikt/ds-react/PREVIEW";
import { withDsExample } from "@/web/examples/withDsExample";
import { generateDataGridDemo } from "../../../components/website-modules/examples/__parts/DataGridDemoData";

const { columns, data } = generateDataGridDemo();

const Example = () => {
  return (
    <Stack height="100vh" padding="space-16" wrap={false}>
      <DataGrid columns={columns} data={data}>
        <DataGrid.Table<(typeof data)[0]>
          detailsPanel={{
            getContent: (row) => (
              <Box padding="space-24">{`Id: ${row.caseId}`}</Box>
            ),
          }}
        />
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
  index: 6,
};
