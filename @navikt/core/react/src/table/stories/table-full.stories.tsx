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
    { key: "name", name: "Name", width: 154 },
    { key: "height", name: "Height", width: 108 },
    { key: "mass", name: "Mass", width: 95 },
    { key: "birth_year", name: "Birth year", width: 133 },
    { key: "eye_color", name: "Eye color", width: 127 },
    { key: "gender", name: "Gender", width: 113 },
    { key: "hair_color", name: "Hair color", width: 132 },
    { key: "skin_color", name: "Skin color", width: 133 },
  ];
  const rowsPerPage = 10;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <Table style={{ width: "initial" }}>
        <Table.Header>
          <Table.Row>
            {columns.map(({ key, name, width }) => (
              <Table.HeaderCell
                scope="row"
                style={{ width, minWidth: width, maxWidth: width }}
                key={key}
                aria-sort={
                  sort?.key === key
                    ? sort.asc
                      ? "ascending"
                      : "descending"
                    : "none"
                }
              >
                <button
                  className="navds-table__sort-button"
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
                </button>
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
                {columns.map(({ key, width }) => (
                  <Table.DataCell
                    style={{
                      width,
                      minWidth: width,
                      maxWidth: width,
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                    title={person[key]}
                    key={key}
                  >
                    {person[key]}
                  </Table.DataCell>
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
    </div>
  );
};
