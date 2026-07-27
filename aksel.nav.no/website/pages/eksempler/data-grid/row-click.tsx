import { VStack } from "@navikt/ds-react";
import { DataGrid } from "@navikt/ds-react/PREVIEW";
import { withDsExample } from "@/web/examples/withDsExample";
import { generateDataGridDemo } from "../../../components/website-modules/examples/__parts/DataGridDemoData";

const { columns, data } = generateDataGridDemo();

const Example = () => {
  return (
    <VStack height="100vh" padding="space-16">
      <DataGrid columns={columns} data={data} getRowId={(row) => row.caseId}>
        <DataGrid.Table
          onRowAction={(row) => alert(`Klikket på rad ${row.id}!`)}
        />
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

export const args: ExampleArgsT = {
  index: 13,
  desc: "`onRowAction`-callbacken gir tilgang til raden som ble klikket på, og kan brukes til å utføre en handling basert på denne raden.",
};
