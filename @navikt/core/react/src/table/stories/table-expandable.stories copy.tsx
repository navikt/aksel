import React, { useState } from "react";
import cl from "classnames";
import { Expand, ExpandFilled } from "@navikt/ds-icons";
import { Table } from "..";
import { Link } from "../..";

export default {
  title: "ds-react/table",
  component: Table,
};

export const Expandable = () => {
  const [openRows, setOpenRows] = useState([]);

  const toggleRow = (row) =>
    setOpenRows(
      openRows.includes(row)
        ? openRows.filter((i) => row !== i)
        : [...openRows, row]
    );

  console.log(openRows);

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell />
          {columns.map(({ key, name }) => (
            <Table.HeaderCell key={key}>{name}</Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map((data, index) =>
          data.isExpandable ? (
            <Table.Expandable>
              <Table.Expandable.Row togglePlacement="left">
                {columns.map(({ key }) => (
                  <Table.DataCell key={key}>{data[key]}</Table.DataCell>
                ))}
              </Table.Expandable.Row>
              <Table.Expandable.Content columns={columns.length}>
                {data.content}
              </Table.Expandable.Content>
            </Table.Expandable>
          ) : (
            <Table.Row>
              {columns.map(({ key }) => (
                <Table.DataCell key={key}>{data[key]}</Table.DataCell>
              ))}
            </Table.Row>
          )
        )}
      </Table.Body>
    </Table>
  );
};

const columns = [
  {
    name: "Navn",
    key: "name",
  },
  {
    name: "Favoritt dyr",
    key: "animal",
  },
  {
    name: "Favoritt farge",
    key: "color",
  },
  {
    name: "Minst favoritt dyr",
    key: "leastAnimal",
  },
  {
    name: "Minst favoritt farge",
    key: "leastColor",
  },
  {
    name: "Status",
    key: "status",
  },
];

const data = [
  {
    name: "Ola Conny Brakkestad",
    animal: "Ku",
    color: "Brun",
    leastAnimal: "Sel",
    leastColor: "Lyseblå",
    status: "Inaktiv",
    content: (
      <>
        Ola Conny Brakkestad sier "hei". Her er litt innhold med en{" "}
        <Link href="#">link.</Link>
      </>
    ),
  },

  {
    name: "Henriette Kristensen",
    animal: "Bjørn",
    color: "Hvit",
    leastAnimal: "Grevling",
    leastColor: "Transparent",
    status: <Link href="http://example.com">Hissig</Link>,
    content: (
      <>
        Henriette Kristensen sier "hei". Her er litt innhold med en{" "}
        <Link href="http://example.com">lenke</Link>. I forhold til en betydelig
        avveining synliggjøres potensialet med sikte på satsingsområdet. Gitt en
        manglende avveining synliggjøres instrumentet på bakgrunn av forholdene.
        Under hensyntagen til en inkluderende avveining stimuleres resultatene
        med henblikk på løsningen. På grunn av en integrert organisasjon
        initieres kunnskapene eller sagt på en annen måte: evalueringen. Grunnet
        en gjeldende målsetting dokumenteres relasjonene hva angår egenarten.
      </>
    ),
  },

  {
    name: "Suki Clydesdale",
    animal: "Sel",
    color: "Grønn",
    leastAnimal: "Serval",
    leastColor: "Rosa",
    status: "Deaktivert",
    content: (
      <>
        Suki Clydesdale sier "hei". Her er litt innhold med en{" "}
        <Link href="http://example.com">link</Link>.
      </>
    ),
  },

  {
    name: "Hans-Hermann Hoppe",
    animal: "Mudkip",
    color: "Oransje",
    leastAnimal: "Skare",
    leastColor: "Hvit",
    status: <Link href="#">Starter</Link>,
    content: (
      <>
        Hans-Hermann Hoppe sier "hei". Her er litt innhold med en{" "}
        <Link href="http://example.com">link</Link>.
      </>
    ),
  },

  {
    name: "Max Kraft",
    animal: "Løve",
    color: "Blå",
    leastAnimal: "Hund",
    leastColor: "Cyan",
    status: <Link href="#">Eksplodert</Link>,
    content: (
      <>
        Max Kraft sier "hei". Her er litt innhold med en{" "}
        <Link href="http://example.com">link</Link>.
      </>
    ),
  },

  {
    name: "Pat Ole",
    animal: "Bjørnedyr",
    color: "Gul",
    leastAnimal: "Meitemark",
    leastColor: "Svart",
    status: <Link href="#">Gunstig</Link>,
    content: (
      <>
        Pat Ole sier "hei". Her er litt innhold med en{" "}
        <Link href="http://example.com">lenke</Link>.
      </>
    ),
  },
];
