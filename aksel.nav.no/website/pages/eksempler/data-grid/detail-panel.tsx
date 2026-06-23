import { BodyLong, Heading, List, VStack } from "@navikt/ds-react";
import { DataGrid } from "@navikt/ds-react/PREVIEW";
import { withDsExample } from "@/web/examples/withDsExample";
import { generateDataGridDemo } from "../../../components/website-modules/examples/__parts/DataGridDemoData";

const { columns, data } = generateDataGridDemo();

const Example = () => {
  return (
    <VStack height="100vh" padding="space-16">
      <DataGrid columns={columns} data={data} getRowId={(row) => row.caseId}>
        <DataGrid.Table<(typeof data)[0]>
          detailsPanel={{
            getContent: (row) => (
              <VStack padding="space-24" gap="space-6">
                <Heading size="small" level="2">
                  Detaljer for sak {row.caseId}
                </Heading>
                <List>
                  <List.Item>Sakstype: {row.caseType}</List.Item>
                  <List.Item>Status: {row.status}</List.Item>
                </List>
                <BodyLong>
                  Her kan du legge til mer informasjon om saken, for eksempel en
                  beskrivelse, kontaktinformasjon, eller andre relevante data.
                  Detaljpanelet er fleksibelt og kan inneholde hvilken som helst
                  React-komponent, så du kan tilpasse det etter behov.
                </BodyLong>
              </VStack>
            ),
          }}
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

export const args = {
  index: 11,
};
