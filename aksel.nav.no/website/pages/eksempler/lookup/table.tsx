import { Lookup, Table } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell scope="col">100% alderspensjon</Table.HeaderCell>
          <Table.HeaderCell scope="col" align="right">
            Kr per år
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.HeaderCell scope="row">Grunnpensjon</Table.HeaderCell>
          <Table.DataCell align="right">168 788</Table.DataCell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell scope="row">Tilleggspensjon</Table.HeaderCell>
          <Table.DataCell align="right">34 490</Table.DataCell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell scope="row">
            <Lookup word="Inntektspensjon">
              Inntektspensjon er den delen av alderspensjonen i folketrygden som
              du tjener opp basert på din egen arbeidsinntekt. Hvert år settes
              18,1 prosent av inntekten din opp til 7,1 ganger folketrygdens
              grunnbeløp (G) inn i en individuell pensjonsbeholdning{" "}
            </Lookup>
          </Table.HeaderCell>
          <Table.DataCell align="right">13 452</Table.DataCell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell scope="row">Garantitillegg</Table.HeaderCell>
          <Table.DataCell align="right">28 234</Table.DataCell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};
// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args: ExampleArgsT = {
  index: 2,
  desc: "Lookup kan brukes i tabeller for å gi mer informasjon om innholdet i cellene.",
};
