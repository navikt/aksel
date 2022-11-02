import { Pagination, Table } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";
import { format } from "date-fns";
import { useState } from "react";

const Example = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 4;

  let sortData = data;
  sortData = sortData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <div className="grid gap-4">
      <Table size="medium">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell scope="col">Navn</Table.HeaderCell>
            <Table.HeaderCell scope="col">Fødseslnr.</Table.HeaderCell>
            <Table.HeaderCell scope="col">Start</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sortData.map(({ name, fnr, start }, i) => {
            return (
              <Table.Row key={i + fnr}>
                <Table.HeaderCell scope="row">{name}</Table.HeaderCell>
                <Table.DataCell>{fnr}</Table.DataCell>
                <Table.DataCell>
                  {format(new Date(start), "dd.MM.yyyy")}
                </Table.DataCell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
      <Pagination
        page={page}
        onPageChange={setPage}
        count={Math.ceil(data.length / rowsPerPage)}
        size="small"
      />
    </div>
  );
};

const data = [
  {
    name: "Jakobsen, Markus",
    fnr: "03129265463",
    start: "2021-04-28T19:12:14.358Z",
  },
  {
    name: "Halvorsen, Mari",
    fnr: "16063634134",
    start: "2022-01-29T09:51:19.833Z",
  },
  {
    name: "Christiansen, Mathias",
    fnr: "18124441438",
    start: "2021-06-04T20:57:29.159Z",
  },
  {
    name: "Fredriksen, Leah",
    fnr: "24089080180",
    start: "2021-08-31T15:47:36.293Z",
  },
  {
    name: "Evensen, Jonas",
    fnr: "18106248460",
    start: "2021-07-17T11:13:26.116Z",
  },
  {
    name: "Strand, Thomas",
    fnr: "11123693157",
    start: "2021-08-14T14:15:44.597Z",
  },
  {
    name: "Eriksen, Sofie",
    fnr: "07067878435",
    start: "2021-12-20T15:55:02.613Z",
  },
  {
    name: "Jørgensen, Erik",
    fnr: "02099681196",
    start: "2021-09-05T11:33:19.361Z",
  },
  {
    name: "Carlsen, Sondre",
    fnr: "23096491197",
    start: "2022-01-25T16:10:47.223Z",
  },
  {
    name: "Berge, Martine",
    fnr: "11090293151",
    start: "2022-01-09T11:15:50.833Z",
  },
];

export default withDsExample(Example);

export const args = {
  index: 5,
};
