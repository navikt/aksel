import React from "react";
import Table from "../Table";

export default {
  title: "ds-react-internal/table",
  component: Table,
};

export const All = () => {
  return (
    <div style={{ display: "grid", gridAutoRows: "8rem", rowGap: "8rem" }}>
      <Table>
        <Table.Header>
          <Table.Header.Row>
            <Table.Body.Row.HeaderCell>ID</Table.Body.Row.HeaderCell>
            <Table.Body.Row.HeaderCell>Fornavn</Table.Body.Row.HeaderCell>
            <Table.Body.Row.HeaderCell>Etternavn</Table.Body.Row.HeaderCell>
            <Table.Body.Row.HeaderCell>Rolle</Table.Body.Row.HeaderCell>
          </Table.Header.Row>
        </Table.Header>
        <Table.Body>
          <Table.Body.Row>
            <Table.Body.Row.HeaderCell>1</Table.Body.Row.HeaderCell>
            <Table.Body.Row.Cell>Jean-Luc</Table.Body.Row.Cell>
            <Table.Body.Row.Cell>Picard</Table.Body.Row.Cell>
            <Table.Body.Row.Cell>Kaptein</Table.Body.Row.Cell>
          </Table.Body.Row>
          <Table.Body.Row>
            <Table.Body.Row.HeaderCell>2</Table.Body.Row.HeaderCell>
            <Table.Body.Row.Cell>William</Table.Body.Row.Cell>
            <Table.Body.Row.Cell>Riker</Table.Body.Row.Cell>
            <Table.Body.Row.Cell>Kommandør</Table.Body.Row.Cell>
          </Table.Body.Row>
          <Table.Body.Row>
            <Table.Body.Row.HeaderCell>3</Table.Body.Row.HeaderCell>
            <Table.Body.Row.Cell>Geordi</Table.Body.Row.Cell>
            <Table.Body.Row.Cell>La Forge</Table.Body.Row.Cell>
            <Table.Body.Row.Cell>Sjefsingeniør</Table.Body.Row.Cell>
          </Table.Body.Row>
        </Table.Body>
      </Table>
    </div>
  );
};
