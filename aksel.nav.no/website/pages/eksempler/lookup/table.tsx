import { Lookup, Table, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell scope="col">100% alderspensjon</Table.HeaderCell>
          <Table.HeaderCell scope="col">Kr per år</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map(({ pension, amount, lookup }) => {
          return (
            <Table.Row key={pension}>
              <Table.HeaderCell scope="row">
                {lookup ? <Lookup word={pension}>{lookup}</Lookup> : pension}
              </Table.HeaderCell>
              <Table.DataCell>{amount}</Table.DataCell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};

const data = [
  {
    pension: "Grunnpensjon",
    amount: "168 788",
  },
  {
    pension: "Tilleggspensjon",
    amount: "28 680",
  },
  {
    pension: "Inntektspensjon",
    amount: "40 680",
    lookup: (
      <VStack align="center">
        Pensjonsbeholdning x Uttaksgrad x Andel dagens regler
        <hr style={{ height: "1px", width: "100%" }} />
        Delingstall
      </VStack>
    ),
  },
  {
    pension: "Garantitillegg",
    amount: "28 234",
  },
];

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
