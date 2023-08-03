import React, { useState } from "react";
import { Table } from "..";
import { Button, Checkbox, Link } from "../..";
// import { within, userEvent } from "@storybook/testing-library";
// import { expect } from "@storybook/jest";

export default {
  title: "ds-react/Table",
  component: Table,
};

export const Expandable = () => {
  return (
    <Table zebraStripes>
      <Table.Header>
        <Table.Row>
          {columns.map(({ key, name }) => (
            <Table.HeaderCell key={key}>{name}</Table.HeaderCell>
          ))}
          <Table.HeaderCell />
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map((data) => (
          <Table.ExpandableRow
            expansionDisabled={data.animal === "Sel"}
            content={data.content}
            key={data.name}
            togglePlacement="right"
          >
            {columns.map(({ key }) => (
              <Table.DataCell key={key}>{data[key]}</Table.DataCell>
            ))}
          </Table.ExpandableRow>
        ))}
      </Table.Body>
    </Table>
  );
};

export const ExpandableSmall = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [open, setOpen] = useState(false);
  return (
    <Table size="small">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell />
          {columns.map(({ key, name }) => (
            <Table.HeaderCell key={key}>{name}</Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.slice(0, 1).map((data) => (
          <Table.ExpandableRow content={data.content} key={data.name}>
            {columns.map(({ key }) => (
              <Table.DataCell key={key}>{data[key]}</Table.DataCell>
            ))}
          </Table.ExpandableRow>
        ))}
        {data.slice(1, 2).map((data) => (
          <Table.ExpandableRow
            content={data.content}
            key={data.name}
            open={open}
            onOpenChange={(open) => setOpen(open)}
          >
            {columns.map(({ key }) => (
              <Table.DataCell key={key}>{data[key]}</Table.DataCell>
            ))}
          </Table.ExpandableRow>
        ))}
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

export const ExpandableOpen = () => {
  return (
    <Table zebraStripes>
      <Table.Header>
        <Table.Row>
          {columns.map(({ key, name }) => (
            <Table.HeaderCell key={key}>{name}</Table.HeaderCell>
          ))}
          <Table.HeaderCell />
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map((data) => (
          <Table.ExpandableRow
            expansionDisabled={data.animal === "Sel"}
            content={data.content}
            key={data.name}
            togglePlacement="right"
            defaultOpen
          >
            {columns.map(({ key }) => (
              <Table.DataCell key={key}>{data[key]}</Table.DataCell>
            ))}
          </Table.ExpandableRow>
        ))}
      </Table.Body>
    </Table>
  );
};

export const ClickableRow = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isRowOpen1, setIsRowOpen1] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isRowOpen2, setIsRowOpen2] = useState(false);

    return (
      <>
        <Table zebraStripes>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Navn</Table.HeaderCell>
              <Table.HeaderCell>Info</Table.HeaderCell>
              <Table.HeaderCell aria-hidden />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.ExpandableRow
              content={<div>placeholder row 1</div>}
              togglePlacement="right"
              onOpenChange={setIsRowOpen1}
              data-testid="row1"
              open={isRowOpen1}
            >
              <Table.DataCell>Ola</Table.DataCell>
              <Table.DataCell>
                <Button
                  size="xsmall"
                  onClick={(e) => {
                    alert("Mer info");
                  }}
                >
                  Mer info
                </Button>
              </Table.DataCell>
            </Table.ExpandableRow>
            <Table.ExpandableRow
              content={<div>placeholder row 2</div>}
              togglePlacement="right"
              onOpenChange={setIsRowOpen2}
              data-testid="row2"
              open={isRowOpen2}
            >
              <Table.DataCell>Hans</Table.DataCell>
              <Table.DataCell>
                <Checkbox hideLabel size="small">
                  Sett
                </Checkbox>
              </Table.DataCell>
            </Table.ExpandableRow>
          </Table.Body>
        </Table>
      </>
    );
  },
  // play: async ({ canvasElement, step }) => {
  //   const canvas = within(canvasElement);
  //   const button = canvas.getByText("Mer info");
  //   const checkbox = canvas.getByText("Sett");

  //   await step("click elements", async () => {
  //     userEvent.click(button);
  //     userEvent.click(checkbox);
  //   });

  //   const row1 = canvas.getByTestId("row1");
  //   const row2 = canvas.getByTestId("row2");

  //   expect(
  //     row1.className.includes("navds-table__expandable-row--open")
  //   ).toBeFalsy();
  //   expect(
  //     row2.className.includes("navds-table__expandable-row--open")
  //   ).toBeFalsy();
  // },
};
