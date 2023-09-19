import { Table, Heading, ShowMore } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <div style={{ minHeight: "423px", width: "300px" }}>
      <ShowMore aria-labelledby="overskrift123" size="small">
        <Heading size="medium" id="overskrift123">
          Tabellvisning
        </Heading>
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
    </div>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 4,
};
