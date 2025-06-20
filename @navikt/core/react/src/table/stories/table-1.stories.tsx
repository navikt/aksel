import React, { useState } from "react";
import { Table, TableProps } from "../";
import { Button } from "../../button";
import { Checkbox } from "../../form/checkbox";
import { VStack } from "../../layout/stack";
import {
  Expandable,
  ExpandableLarge,
  ExpandableSmall,
} from "./table-2-expandable.stories";

export default {
  title: "ds-react/Table",
  component: Table,
  parameters: {
    chromatic: { disable: true },
  },
};

interface Props extends TableProps {
  button?: boolean;
  shadeOnHover?: boolean;
}

const TableComponent = ({ button, shadeOnHover, ...rest }: Props) => (
  <Table {...rest}>
    <Table.Header>
      <Table.Row>
        {button && <Table.HeaderCell>Action</Table.HeaderCell>}
        <Table.HeaderCell>ID</Table.HeaderCell>
        <Table.HeaderCell>Fornavn</Table.HeaderCell>
        <Table.HeaderCell textSize="medium">Etternavn</Table.HeaderCell>
        <Table.HeaderCell textSize="small">Rolle</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row shadeOnHover={shadeOnHover}>
        {button && (
          <Table.DataCell
            style={{
              paddingTop: 6,
              paddingBottom: 6,
            }}
          >
            <Button size="xsmall">Click me!</Button>
          </Table.DataCell>
        )}
        <Table.HeaderCell>1</Table.HeaderCell>
        <Table.DataCell>Jean-Luc</Table.DataCell>
        <Table.DataCell>Picard</Table.DataCell>
        <Table.DataCell>Kaptein</Table.DataCell>
      </Table.Row>
      <Table.Row shadeOnHover={shadeOnHover}>
        {button && (
          <Table.DataCell
            style={{
              paddingTop: 6,
              paddingBottom: 6,
            }}
          >
            <Button size="xsmall">Click me!</Button>
          </Table.DataCell>
        )}
        <Table.HeaderCell>2</Table.HeaderCell>
        <Table.DataCell>William</Table.DataCell>
        <Table.DataCell>Riker</Table.DataCell>
        <Table.DataCell>Kommandør</Table.DataCell>
      </Table.Row>
      <Table.Row shadeOnHover={shadeOnHover}>
        {button && (
          <Table.DataCell
            style={{
              paddingTop: 6,
              paddingBottom: 6,
            }}
          >
            <Button size="xsmall">Click me!</Button>
          </Table.DataCell>
        )}
        <Table.HeaderCell>3</Table.HeaderCell>
        <Table.DataCell>Geordi</Table.DataCell>
        <Table.DataCell textSize="medium">La Forge</Table.DataCell>
        <Table.DataCell textSize="small">Sjefsingeniør</Table.DataCell>
      </Table.Row>
    </Table.Body>
  </Table>
);

export const Default = () => <TableComponent />;
export const Zebra = () => <TableComponent zebraStripes />;
export const NoShadeOnHover = () => <TableComponent shadeOnHover={false} />;
export const ZebraNoShadeOnHover = () => (
  <TableComponent zebraStripes shadeOnHover={false} />
);
export const SizeLarge = () => <TableComponent size="large" />;
export const SizeMedium = () => <TableComponent size="medium" />;
export const SizeSmall = () => <TableComponent size="small" />;

export const Buttons = () => <TableComponent size="small" button />;

const SelectionTable = ({ size = "medium" }: { size?: "small" | "medium" }) => {
  const useToggleList = (initialState) => {
    const [list, setList] = useState(initialState);

    return [
      list,
      (value) =>
        setList((oldList) =>
          oldList.includes(value)
            ? oldList.filter((id) => id !== value)
            : [...oldList, value],
        ),
    ];
  };

  const [selectedRows, toggleSelectedRow] = useToggleList([]);

  return (
    <Table size={size} zebraStripes>
      <Table.Body>
        <Table.Row>
          <Table.DataCell>
            <Checkbox
              size={size}
              indeterminate
              onChange={() => toggleSelectedRow("all")}
            >
              Select all
            </Checkbox>
          </Table.DataCell>
          <Table.HeaderCell scope="col">Name</Table.HeaderCell>
          <Table.HeaderCell scope="col">Age</Table.HeaderCell>
          <Table.HeaderCell scope="col">Country</Table.HeaderCell>
          <Table.HeaderCell scope="col">Points</Table.HeaderCell>
        </Table.Row>
        <Table.Row selected={selectedRows.includes("1")}>
          <Table.DataCell>
            <Checkbox
              size={size}
              hideLabel
              checked={selectedRows.includes("1")}
              onChange={() => toggleSelectedRow("1")}
              aria-labelledby={`x_r1-${size}`}
            >
              {" "}
            </Checkbox>
          </Table.DataCell>
          <Table.HeaderCell scope="row">
            <span id={`x_r1-${size}`}>Donald Smith</span>
          </Table.HeaderCell>
          <Table.DataCell>32</Table.DataCell>
          <Table.DataCell>USA</Table.DataCell>
          <Table.DataCell>38</Table.DataCell>
        </Table.Row>
        <Table.Row selected>
          <Table.DataCell>
            <Checkbox
              size={size}
              hideLabel
              checked
              onChange={() => toggleSelectedRow("2")}
              aria-labelledby={`x_r2-${size}`}
            >
              {" "}
            </Checkbox>
          </Table.DataCell>
          <Table.HeaderCell scope="row">
            <span id={`x_r2-${size}`}>Preben Aalborg</span>
          </Table.HeaderCell>
          <Table.DataCell>44</Table.DataCell>
          <Table.DataCell>Denmark</Table.DataCell>
          <Table.DataCell>11</Table.DataCell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

export const Selection = () => <SelectionTable />;
export const SelectionSmall = () => <SelectionTable size="small" />;

export const ColorRole = () => (
  <div data-color="brand-magenta">
    <SelectionTable />
  </div>
);

export const StickyHeader = () => {
  const rows = Array.from({ length: 100 }, (_, i) => (
    <Table.Row key={i}>
      <Table.HeaderCell>{i + 1}</Table.HeaderCell>
      <Table.DataCell>Row {i + 1}</Table.DataCell>
      <Table.DataCell>Row {i + 1}</Table.DataCell>
      <Table.DataCell>Row {i + 1}</Table.DataCell>
    </Table.Row>
  ));
  return (
    <div style={{ maxHeight: 200, overflowY: "auto" }}>
      <Table stickyHeader>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Fornavn</Table.HeaderCell>
            <Table.HeaderCell>one</Table.HeaderCell>
            <Table.HeaderCell>two</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{rows}</Table.Body>
      </Table>
    </div>
  );
};

export const Chromatic = {
  render: () => (
    <VStack gap="8">
      <div>
        <h3>Default</h3>
        <Default />
        <h3>Zebra</h3>
        <Zebra />
      </div>
      <div>
        <h3>Large</h3>
        <SizeLarge />
      </div>
      <div>
        <h3>Medium</h3>
        <SizeMedium />
      </div>
      <div>
        <h3>Small</h3>
        <SizeSmall />
      </div>
      <div>
        <h3>With Buttons</h3>
        <Buttons />
      </div>
      <div>
        <h3>Selection</h3>
        <Selection />
      </div>
      <div>
        <h3>Selection small</h3>
        <SelectionSmall />
      </div>
      <h2>Expandable</h2>
      <div>
        <h3>Large</h3>
        <ExpandableLarge />
      </div>
      <div>
        <h3>Medium</h3>
        <Expandable />
      </div>
      <div>
        <h3>Small</h3>
        <ExpandableSmall />
      </div>
      <div>
        <h3>ColorRole</h3>
        <ColorRole />
      </div>
    </VStack>
  ),
  parameters: {
    chromatic: { disable: false },
  },
};
