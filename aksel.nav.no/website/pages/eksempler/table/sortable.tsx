import { Table } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";
import { format } from "date-fns";
import { useState } from "react";

const Example = () => {
  const [sort, setSort] = useState(null);

  const handleSort = (sortKey) => {
    setSort(
      sort && sortKey === sort.orderBy && sort.direction === "descending"
        ? undefined
        : {
            orderBy: sortKey,
            direction:
              sort && sortKey === sort.orderBy && sort.direction === "ascending"
                ? "descending"
                : "ascending",
          }
    );
  };

  let sortData = data;

  sortData = sortData.slice().sort((a, b) => {
    if (sort) {
      const comparator = (a, b, orderBy) => {
        if (b[orderBy] < a[orderBy] || b[orderBy] === undefined) {
          return -1;
        }
        if (b[orderBy] > a[orderBy]) {
          return 1;
        }
        return 0;
      };

      return sort.direction === "ascending"
        ? comparator(b, a, sort.orderBy)
        : comparator(a, b, sort.orderBy);
    }
    return 1;
  });

  return (
    <>
      <Table sort={sort} onSortChange={(sortKey) => handleSort(sortKey)}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader sortKey="name" sortable>
              Navn
            </Table.ColumnHeader>
            <Table.HeaderCell scope="col">Fødseslnr.</Table.HeaderCell>
            <Table.ColumnHeader sortKey="start" sortable>
              Start
            </Table.ColumnHeader>
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
    </>
  );
};

const data = [
  {
    name: "Jakobsen, Markus",
    fnr: "03129265463",
    start: "2020-04-28T19:12:14.358Z",
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
    start: "2015-08-31T15:47:36.293Z",
  },
  {
    name: "Evensen, Jonas",
    fnr: "18106248460",
    start: "2010-07-17T11:13:26.116Z",
  },
];

export default withDsExample(Example);

export const args = {
  index: 3,
};
