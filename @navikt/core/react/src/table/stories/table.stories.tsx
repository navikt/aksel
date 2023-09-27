import React, { useState } from "react";
import { Table } from "../";
import { Alert, Button, Checkbox, Link } from "../..";

export default {
  title: "ds-react/Table",
  component: Table,
};

const TableComponent = (props) => (
  <Table {...props}>
    <Table.Header>
      <Table.Row>
        {props.button && <Table.HeaderCell>Action</Table.HeaderCell>}
        <Table.HeaderCell>ID</Table.HeaderCell>
        <Table.HeaderCell>Fornavn</Table.HeaderCell>
        <Table.HeaderCell>Etternavn</Table.HeaderCell>
        <Table.HeaderCell>Rolle</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row shadeOnHover={props.shadeOnHover}>
        {props.button && (
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
      <Table.Row shadeOnHover={props.shadeOnHover}>
        {props.button && (
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
      <Table.Row shadeOnHover={props.shadeOnHover}>
        {props.button && (
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
        <Table.DataCell>La Forge</Table.DataCell>
        <Table.DataCell>Sjefsingeniør</Table.DataCell>
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

export const WithDivs = () => {
  return (
    <>
      <Alert variant="warning">
        Obs! Hvis man skal bygge tabeller uten å bruke vanlig {"<tabell> "}
        -markup er det svært viktig at man supplerer elementene med{" "}
        <Link href="https://www.w3.org/TR/wai-aria-practices-1.1/examples/table/table.html">
          riktige
        </Link>{" "}
        role-attributter og display-stiler for å bevare den semantiske verdien i
        tabellene. Vi anbefaler fortsatt å ikke ta i bruk denne metoden hvis
        mulig, da nettleseren ikke kan tolke tabellen like bra uten riktig
        markup.
      </Alert>
      <div className="navds-table" role="table">
        <div className="navds-table__header" role="rowgroup">
          <div className="navds-table__row" role="row">
            <div className="navds-table__header-cell" role="columnheader">
              Fornavn
            </div>
            <div className="navds-table__header-cell" role="columnheader">
              Etternavn
            </div>
            <div className="navds-table__header-cell" role="columnheader">
              Rolle
            </div>
          </div>
        </div>
        <div className="navds-table__body" role="rowgroup">
          <div className="navds-table__row" role="row">
            <div className="navds-table__data-cell" role="cell">
              Jean-Luc
            </div>
            <div className="navds-table__data-cell" role="cell">
              Picard
            </div>
            <div className="navds-table__data-cell" role="cell">
              Kaptein
            </div>
          </div>
          <div className="navds-table__row" role="row">
            <div className="navds-table__data-cell" role="cell">
              William
            </div>
            <div className="navds-table__data-cell" role="cell">
              Riker
            </div>
            <div className="navds-table__data-cell" role="cell">
              Kommandør
            </div>
          </div>
          <div className="navds-table__row" role="row">
            <div className="navds-table__data-cell" role="cell">
              Geordi
            </div>
            <div className="navds-table__data-cell" role="cell">
              La Forge
            </div>
            <div className="navds-table__data-cell" role="cell">
              Sjefsingeniør
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const Selection = () => <SelectionTable />;
export const SelectionSmall = () => <SelectionTable size="small" />;

const SelectionTable = ({ size = "medium" }: { size?: "small" | "medium" }) => {
  const useToggleList = (initialState) => {
    const [list, setList] = useState(initialState);

    return [
      list,
      (value) =>
        setList((list) =>
          list.includes(value)
            ? list.filter((id) => id !== value)
            : [...list, value]
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
              checked={selectedRows.includes("all")}
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
        <Table.Row selected={selectedRows.includes("2")}>
          <Table.DataCell>
            <Checkbox
              size={size}
              hideLabel
              checked={selectedRows.includes("2")}
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
        <Table.Row selected={selectedRows.includes("3")}>
          <Table.DataCell>
            <Checkbox
              size={size}
              hideLabel
              checked={selectedRows.includes("3")}
              onChange={() => toggleSelectedRow("3")}
              aria-labelledby={`x_r3-${size}`}
            >
              {" "}
            </Checkbox>
          </Table.DataCell>
          <Table.HeaderCell scope="row">
            <span id={`x_r3-${size}`}>Rudolph Bachenmeier</span>
          </Table.HeaderCell>
          <Table.DataCell>32</Table.DataCell>
          <Table.DataCell>Germany</Table.DataCell>
          <Table.DataCell>70</Table.DataCell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};
