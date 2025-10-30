import { useState } from "react";
import { Checkbox, Table } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>(["18994441438"]);

  const toggleSelectedRow = (value) =>
    setSelectedRows((list) =>
      list.includes(value)
        ? list.filter((id) => id !== value)
        : [...list, value],
    );

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.DataCell>
            <Checkbox
              checked={selectedRows.length === data.length}
              indeterminate={
                selectedRows.length > 0 && selectedRows.length !== data.length
              }
              onChange={() => {
                selectedRows.length === data.length
                  ? setSelectedRows([])
                  : setSelectedRows(data.map(({ fnr }) => fnr));
              }}
              hideLabel
            >
              Velg alle rader
            </Checkbox>
          </Table.DataCell>

          <Table.HeaderCell scope="col">Navn</Table.HeaderCell>
          <Table.HeaderCell scope="col">Fødselsnr.</Table.HeaderCell>
          <Table.HeaderCell scope="col">Start</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map(({ name, fnr, start }, i) => {
          return (
            <Table.Row key={i + fnr} selected={selectedRows.includes(fnr)}>
              <Table.DataCell>
                <Checkbox
                  hideLabel
                  checked={selectedRows.includes(fnr)}
                  onChange={() => toggleSelectedRow(fnr)}
                  aria-labelledby={`id-${fnr}`}
                >
                  {" "}
                </Checkbox>
              </Table.DataCell>
              <Table.HeaderCell scope="row">
                <span id={`id-${fnr}`}>{name}</span>
              </Table.HeaderCell>
              <Table.DataCell>{fnr}</Table.DataCell>
              <Table.DataCell>{format(new Date(start))}</Table.DataCell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};

const format = (date: Date) => {
  const y = date.getFullYear();
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  const d = date.getDate().toString().padStart(2, "0");
  return `${d}.${m}.${y}`;
};

const data = [
  {
    name: "Jakobsen, Markus",
    fnr: "03999265463",
    start: "2020-04-28T19:12:14.358Z",
  },
  {
    name: "Halvorsen, Mari",
    fnr: "16993634134",
    start: "2022-01-29T09:51:19.833Z",
  },
  {
    name: "Christiansen, Mathias",
    fnr: "18994441438",
    start: "2021-06-04T20:57:29.159Z",
  },
  {
    name: "Fredriksen, Leah",
    fnr: "24999080180",
    start: "2015-08-31T15:47:36.293Z",
  },
  {
    name: "Evensen, Jonas",
    fnr: "18996248460",
    start: "2010-07-17T11:13:26.116Z",
  },
];

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 8,
};
