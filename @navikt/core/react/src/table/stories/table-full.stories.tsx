import React, { useState } from "react";
import people from "./people.json";
import { Table } from "../index";

export default {
  title: "ds-react/table",
  component: Table,
};

export const Full = () => {
  const columns = [
    {
      id: "name",
      label: "Name",
    },
    {
      id: "height",
      label: "Height",
    },
    {
      id: "mass",
      label: "Mass",
    },
    {
      id: "birth_year",
      label: "Birth year",
    },
    {
      id: "eye_color",
      label: "Eye color",
    },
    {
      id: "gender",
      label: "Gender",
    },
    {
      id: "hair_color",
      label: "Hair color",
    },
    {
      id: "skin_color",
      label: "Skin color",
    },
  ];
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          {columns.map(({ id, label }) => (
            <Table.HeaderCell key={id}>{label}</Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {people.map((person) => (
          <Table.Row key={person.name}>
            {columns.map(({ id }) => (
              <Table.DataCell key={id}>{person[id]}</Table.DataCell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
