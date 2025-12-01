import { Table } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell scope="col">Navn</Table.HeaderCell>
          <Table.HeaderCell scope="col" align="right">
            Beløp
          </Table.HeaderCell>
          <Table.HeaderCell scope="col" align="right">
            Prosent
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map(({ name, amount, percent }, i) => (
          <Table.Row key={i + name}>
            <Table.HeaderCell scope="row">{name}</Table.HeaderCell>
            <Table.DataCell align="right">
              {formatter.format(amount)}
            </Table.DataCell>
            <Table.DataCell align="right">{percent}&nbsp;%</Table.DataCell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

const formatter = new Intl.NumberFormat(undefined, {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const data = [
  {
    name: "Jakobsen, Markus",
    amount: 123,
    percent: 100,
  },
  {
    name: "Halvorsen, Mari",
    amount: 1045,
    percent: 50,
  },
  {
    name: "Christiansen, Mathias",
    amount: 123,
    percent: 95,
  },
  {
    name: "Fredriksen, Leah",
    amount: 940.5,
    percent: 100,
  },
  {
    name: "Evensen, Jonas",
    amount: 1100,
    percent: 9,
  },
];

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 0,
};
