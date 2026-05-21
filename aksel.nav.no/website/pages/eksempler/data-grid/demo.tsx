import { VStack } from "@navikt/ds-react";
import { DataGrid } from "@navikt/ds-react/PREVIEW";
import { withDsExample } from "@/web/examples/withDsExample";
import { generateDataGridDemo } from "../../../components/website-modules/examples/__parts/DataGridDemoData";

const { columns, data } = generateDataGridDemo();

const Example = () => {
  return (
    <VStack height="100vh" padding="space-16">
      <DataGrid columns={columns} data={data} getRowId={(row) => row.caseId}>
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
  index: 0,
  desc: "For å sikre statiske ['keys'](https://react.dev/learn/rendering-lists#why-does-react-need-keys) i DataGrid, må hver rad ha en unik identifikator. I dette eksemplet bruker vi 'caseId' som nøkkel for hver rad, og vi spesifiserer dette ved å bruke 'getRowId' prop på DataGrid-komponenten.",
};
