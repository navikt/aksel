import React, { useState } from "react";
import people from "./people.json";
import { Table } from "../index";
import Pagination from "../Pagination";

export default {
  title: "ds-react/table",
  component: Table,
};

export const Full = () => {
  const [page, setPage] = useState(0);
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
              <Table.HeaderCell key={key}>{name}</Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {people
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
