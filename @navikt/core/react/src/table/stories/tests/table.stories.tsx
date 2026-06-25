import React, { useState } from "react";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";
import { Button } from "../../../button";
import { Link } from "../../../link";
import { VStack } from "../../../primitives/stack";
import Table from "../../Table";

export default {
  title: "ds-react/Table/Tests",
  component: Table,
  parameters: {
    chromatic: { disable: true },
  },
};

export const ClickableRowTest = {
  render: ({ onOpenChange }) => {
    return (
      <Table zebraStripes>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell aria-hidden />
            <Table.HeaderCell aria-hidden />
            <Table.HeaderCell aria-hidden />
            <Table.HeaderCell aria-hidden />
            <Table.HeaderCell aria-hidden />
            <Table.HeaderCell aria-hidden />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.ExpandableRow
            content={<div>placeholder row 2</div>}
            togglePlacement="right"
            data-testid="row1"
            expandOnRowClick
            onOpenChange={onOpenChange}
          >
            <Table.DataCell>
              <div data-testid="cell1">Should be clickable</div>
            </Table.DataCell>
            <Table.DataCell data-testid="cell2">
              Should also be clickable
            </Table.DataCell>

            <Table.DataCell>
              <button data-testid="cell3">Should not be clickable</button>
            </Table.DataCell>
            <Table.DataCell>
              <div>
                <div>
                  <button data-testid="cell4">
                    Nested should not be clickable
                  </button>
                </div>
              </div>
            </Table.DataCell>
            <Table.DataCell>
              <div>
                <div>
                  <button data-testid="cell4">
                    <span>2x nested should not be clickable</span>
                  </button>
                </div>
              </div>
            </Table.DataCell>
          </Table.ExpandableRow>
        </Table.Body>
      </Table>
    );
  },
  args: {
    onOpenChange: fn(),
  },
  play: async ({ canvasElement, args }) => {
    args.onOpenChange.mockClear();
    const canvas = within(canvasElement);

    const cell1 = canvas.getByText("Should be clickable");
    const cell2 = canvas.getByText("Should also be clickable");
    const cell3 = canvas.getByText("Should not be clickable");
    const cell4 = canvas.getByText("Nested should not be clickable");
    const cell5 = canvas.getByText("2x nested should not be clickable");

    await userEvent.click(cell1);
    expect(args.onOpenChange.mock.calls).toHaveLength(1);
    await userEvent.click(cell1);
    expect(args.onOpenChange.mock.calls).toHaveLength(2);

    await userEvent.click(cell2);
    expect(args.onOpenChange.mock.calls).toHaveLength(3);
    await userEvent.click(cell2);
    expect(args.onOpenChange.mock.calls).toHaveLength(4);

    await userEvent.click(cell3);
    expect(args.onOpenChange.mock.calls).toHaveLength(4);

    await userEvent.click(cell4);
    expect(args.onOpenChange.mock.calls).toHaveLength(4);

    await userEvent.click(cell5);
    expect(args.onOpenChange.mock.calls).toHaveLength(4);
  },
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

export const ExpandableWithActivity = {
  render: () => {
    const [open, setOpen] = useState(true);
    const [openExpandables, setOpenExpandables] = useState(false);

    return (
      <React.StrictMode>
        <VStack gap="space-48" padding="space-20">
          <Button variant="primary" onClick={() => setOpen((prev) => !prev)}>
            ToggleButton
          </Button>
          <Button
            variant="primary"
            onClick={() => setOpenExpandables((prev) => !prev)}
          >
            ToggleExpandables
          </Button>

          <React.Activity mode={open ? "visible" : "hidden"} name="table-test">
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
                {data.map((row, index) => (
                  <Table.ExpandableRow
                    content={`nested-row-${index}`}
                    key={row.name}
                    data-testid={`row-${index}`}
                    open={openExpandables}
                    onOpenChange={() => setOpenExpandables((prev) => !prev)}
                  >
                    {columns.map(({ key }) => (
                      <Table.DataCell key={key}>{row[key]}</Table.DataCell>
                    ))}
                  </Table.ExpandableRow>
                ))}
              </Table.Body>
            </Table>
          </React.Activity>
        </VStack>
      </React.StrictMode>
    );
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const button = canvas.getByText("ToggleButton");

    const parentRow = canvas.getByTestId("row-0");
    const nestedRow = canvas.getByText("nested-row-0");

    expect(parentRow).toBeInTheDocument();
    expect(parentRow).toBeVisible();
    expect(nestedRow).toBeInTheDocument();
    expect(nestedRow).not.toBeVisible();

    const expandButton = within(parentRow).getByRole("button", {
      name: "Vis mer",
    });

    await userEvent.click(expandButton);
    await waitFor(() => expect(nestedRow).toBeVisible());

    await userEvent.click(button);
    await userEvent.click(button);

    await waitFor(() => expect(nestedRow).toBeVisible());

    const expandAllButton = canvas.getByText("ToggleExpandables");

    await userEvent.click(expandAllButton);
    await waitFor(() => expect(nestedRow).not.toBeVisible());
    await userEvent.click(button);

    await userEvent.click(expandAllButton);
    await userEvent.click(button);
    await waitFor(() => expect(nestedRow).toBeVisible());
  },
};
