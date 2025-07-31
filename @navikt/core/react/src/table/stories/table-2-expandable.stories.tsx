import React, { useState } from "react";
import { Button } from "../../button";
import { Checkbox } from "../../form/checkbox";
import { Link } from "../../link";
import Table from "../Table";

export default {
  title: "ds-react/Table",
  component: Table,
  parameters: {
    chromatic: { disable: true },
  },
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
        {data.map((row) => (
          <Table.ExpandableRow
            expansionDisabled={row.animal === "Sel"}
            content={row.content}
            key={row.name}
            togglePlacement="right"
            defaultOpen
            selected={row.animal === "Mudkip"}
          >
            {columns.map(({ key }, index) =>
              index === 0 ? (
                <Table.HeaderCell key={key}>{row[key]}</Table.HeaderCell>
              ) : (
                <Table.DataCell key={key}>{row[key]}</Table.DataCell>
              ),
            )}
          </Table.ExpandableRow>
        ))}
      </Table.Body>
    </Table>
  );
};

export const ExpandableLarge = () => {
  const [open, setOpen] = useState(false);
  return (
    <Table size="large">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell />
          {columns.map(({ key, name }) => (
            <Table.HeaderCell key={key}>{name}</Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.slice(0, 1).map((row) => (
          <Table.ExpandableRow defaultOpen content={row.content} key={row.name}>
            {columns.map(({ key }) => (
              <Table.DataCell key={key}>{row[key]}</Table.DataCell>
            ))}
          </Table.ExpandableRow>
        ))}
        {data.slice(1, 2).map((row) => (
          <Table.ExpandableRow
            content={row.content}
            key={row.name}
            open={open}
            onOpenChange={setOpen}
          >
            {columns.map(({ key }) => (
              <Table.DataCell key={key}>{row[key]}</Table.DataCell>
            ))}
          </Table.ExpandableRow>
        ))}
      </Table.Body>
    </Table>
  );
};

export const ExpandableSmall = () => {
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
        {data.slice(0, 1).map((row) => (
          <Table.ExpandableRow defaultOpen content={row.content} key={row.name}>
            {columns.map(({ key }) => (
              <Table.DataCell key={key}>{row[key]}</Table.DataCell>
            ))}
          </Table.ExpandableRow>
        ))}
        {data.slice(1, 2).map((row) => (
          <Table.ExpandableRow
            content={row.content}
            key={row.name}
            open={open}
            onOpenChange={setOpen}
          >
            {columns.map(({ key }) => (
              <Table.DataCell key={key}>{row[key]}</Table.DataCell>
            ))}
          </Table.ExpandableRow>
        ))}
      </Table.Body>
    </Table>
  );
};

export const ExpandableContentGutter = () => {
  return (
    <Table zebraStripes>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell></Table.HeaderCell>
          <Table.HeaderCell>Cell</Table.HeaderCell>
          <Table.HeaderCell>Cell</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.ExpandableRow
          defaultOpen
          content="ContentContent ContentContent ContentContent"
          togglePlacement="left"
        >
          <Table.DataCell>Cell</Table.DataCell>
          <Table.DataCell>Cell</Table.DataCell>
          <Table.DataCell>Cell</Table.DataCell>
        </Table.ExpandableRow>
        <Table.ExpandableRow
          content="ContentContent ContentContent ContentContent"
          togglePlacement="right"
          defaultOpen
        >
          <Table.DataCell>Cell</Table.DataCell>
          <Table.DataCell>Cell</Table.DataCell>
          <Table.DataCell>Cell</Table.DataCell>
        </Table.ExpandableRow>
        <Table.ExpandableRow
          content="ContentContent ContentContent ContentContent"
          defaultOpen
          contentGutter="left"
        >
          <Table.DataCell>Cell</Table.DataCell>
          <Table.DataCell>Cell</Table.DataCell>
          <Table.DataCell>Cell</Table.DataCell>
        </Table.ExpandableRow>
        <Table.ExpandableRow
          content="ContentContent ContentContent ContentContent"
          defaultOpen
          contentGutter="right"
        >
          <Table.DataCell>Cell</Table.DataCell>
          <Table.DataCell>Cell</Table.DataCell>
          <Table.DataCell>Cell</Table.DataCell>
        </Table.ExpandableRow>
        <Table.ExpandableRow
          content="ContentContent ContentContent ContentContent Con.."
          defaultOpen
          contentGutter="none"
        >
          <Table.DataCell>Cell</Table.DataCell>
          <Table.DataCell>Cell</Table.DataCell>
          <Table.DataCell>Cell</Table.DataCell>
        </Table.ExpandableRow>
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
        Ola Conny Brakkestad sier hei. Her er litt innhold med en{" "}
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
        Henriette Kristensen sier hei. Her er litt innhold med en{" "}
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
        Suki Clydesdale sier hei. Her er litt innhold med en{" "}
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
        Hans-Hermann Hoppe sier hei. Her er litt innhold med en{" "}
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
        Max Kraft sier hei. Her er litt innhold med en{" "}
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
        Pat Ole sier hei. Her er litt innhold med en{" "}
        <Link href="http://example.com">lenke</Link>.
      </>
    ),
  },
];

export const ClickableRow = () => {
  const [isRowOpen1, setIsRowOpen1] = useState(false);
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
            expandOnRowClick
          >
            <Table.DataCell>Ola</Table.DataCell>
            <Table.DataCell>
              <Button
                size="xsmall"
                onClick={() => {
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
            expandOnRowClick
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
};
