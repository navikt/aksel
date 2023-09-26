import { Heading, Table, Box, ShowMore, Bleed } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <div style={{ maxWidth: 560 }}>
      <Heading size="large" spacing>
        Årlig pensjon hvis du tar ut alderspensjon ved 62 år og 10 måneder
      </Heading>
      <DiagramPlaceholder />
      <Bleed marginInline="4" asChild>
        <ShowMore heading="Tabellvisning">
          <Table size="large">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell scope="col">Alder</Table.HeaderCell>
                <Table.HeaderCell scope="col" align="right">
                  Sum (kr)
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.DataCell>61 år</Table.DataCell>
                <Table.DataCell align="right">621 924</Table.DataCell>
              </Table.Row>
              <Table.Row>
                <Table.DataCell>62 år</Table.DataCell>
                <Table.DataCell align="right">602 019</Table.DataCell>
              </Table.Row>
              <Table.Row>
                <Table.DataCell>63 år</Table.DataCell>
                <Table.DataCell align="right">451 221</Table.DataCell>
              </Table.Row>
              <Table.Row>
                <Table.DataCell>64 år</Table.DataCell>
                <Table.DataCell align="right">472 919</Table.DataCell>
              </Table.Row>
              <Table.Row>
                <Table.DataCell>65 år</Table.DataCell>
                <Table.DataCell align="right">514 371</Table.DataCell>
              </Table.Row>
            </Table.Body>
          </Table>
        </ShowMore>
      </Bleed>
    </div>
  );
};

const DiagramPlaceholder = () => (
  <Box
    background="surface-alt-3-subtle"
    borderColor="border-alt-3"
    borderWidth="1"
    borderRadius="large large"
    paddingBlock="24"
    style={{ textAlign: "center", borderStyle: "dashed" }}
  >
    Graf
  </Box>
);

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 6,
  desc: "Du kan bruke Bleed-komponenten for å utligne paddingen.",
};
