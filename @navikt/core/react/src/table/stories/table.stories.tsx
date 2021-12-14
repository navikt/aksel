import React, { useState } from "react";
import { Table } from "../index";
import { Alert, Checkbox, Link } from "@navikt/ds-react";

export default {
  title: "ds-react/table",
  component: Table,
};

export const All = () => {
  const TableComponent = (props) => (
    <Table {...props}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>ID</Table.HeaderCell>
          <Table.HeaderCell>Fornavn</Table.HeaderCell>
          <Table.HeaderCell>Etternavn</Table.HeaderCell>
          <Table.HeaderCell>Rolle</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.HeaderCell>1</Table.HeaderCell>
          <Table.DataCell>Jean-Luc</Table.DataCell>
          <Table.DataCell>Picard</Table.DataCell>
          <Table.DataCell>Kaptein</Table.DataCell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>2</Table.HeaderCell>
          <Table.DataCell>William</Table.DataCell>
          <Table.DataCell>Riker</Table.DataCell>
          <Table.DataCell>Kommandør</Table.DataCell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>3</Table.HeaderCell>
          <Table.DataCell>Geordi</Table.DataCell>
          <Table.DataCell>La Forge</Table.DataCell>
          <Table.DataCell>Sjefsingeniør</Table.DataCell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
  return (
    <>
      <h1>Table</h1>
      <TableComponent />
      <h2>Zebra</h2>
      <TableComponent zebraStripes />
      <h2>Small Table</h2>
      <TableComponent size="small" />
      <h2>Table with divs</h2>
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

export const Selection = () => (
  <>
    <h1>Selection</h1>
    <h2>Medium</h2>
    <SelectionTable />
    <h2>Small</h2>
    <SelectionTable size="small" />
  </>
);

const SelectionTable = ({ size }) => {
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
    <Table size={size}>
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
              aria-labelledby="x_r1"
            ></Checkbox>
          </Table.DataCell>
          <Table.HeaderCell scope="row">
            <span id="x_r1">Donald Smith</span>
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
              aria-labelledby="x_r2"
            ></Checkbox>
          </Table.DataCell>
          <Table.HeaderCell scope="row">
            <span id="x_r2">Preben Aalborg</span>
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
              aria-labelledby="x_r3"
            ></Checkbox>
          </Table.DataCell>
          <Table.HeaderCell scope="row">
            <span id="x_r3">Rudolph Bachenmeier</span>
          </Table.HeaderCell>
          <Table.DataCell>32</Table.DataCell>
          <Table.DataCell>Germany</Table.DataCell>
          <Table.DataCell>70</Table.DataCell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};
