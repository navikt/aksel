import React, { useState } from "react";
import people from "./people.json";
import { Table } from "../index";
import Pagination from "../Pagination";
import { Down, Up } from "@navikt/ds-icons";

export default {
  title: "ds-react/table",
  component: Table,
};

interface SortState {
  key: string;
  asc: boolean;
}

export const Full = () => {
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState<SortState>();

  const columns = [
    { key: "name", name: "Name" },
    { key: "height", name: "Height" },
    { key: "mass", name: "Mass" },
    { key: "birth_year", name: "Birth year" },
    { key: "eye_color", name: "Eye color" },
    { key: "gender", name: "Gender" },
    { key: "hair_color", name: "Hair color" },
    { key: "skin_color", name: "Skin color" },
  ];
  const rowsPerPage = 10;

  return (
    <>
      <Table>
        <Table.Header>
          <Table.Row>
            {columns.map(({ key, name }) => (
              <Table.HeaderCell
                key={key}
                onClick={() =>
                  setSort((sort) =>
                    sort?.key === key && sort?.asc === false
                      ? undefined
                      : {
                          key,
                          asc: sort?.key !== key || !sort?.asc,
                        }
                  )
                }
              >
                {name}
                {sort?.key === key && (sort.asc ? <Down /> : <Up />)}
              </Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {people
            .slice()
            .sort((a, b) =>
              sort
                ? typeof a[sort.key] === "string"
                  ? sort.asc
                    ? a[sort.key].localeCompare(b[sort.key])
                    : b[sort.key].localeCompare(a[sort.key])
                  : sort.asc
                  ? a[sort.key] - b[sort.key]
                  : b[sort.key] - a[sort.key]
                : 1
            )
            .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
            .map((person) => (
              <Table.Row key={person.name}>
                {columns.map(({ key }) => (
                  <Table.DataCell key={key}>{person[key]}</Table.DataCell>
                ))}
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
      <Pagination
        page={page}
        onPageChange={setPage}
        rowsPerPage={rowsPerPage}
        count={people.length}
      />
    </>
  );
};
