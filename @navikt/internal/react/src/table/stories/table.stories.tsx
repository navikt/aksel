import React from "react";
import Table from "../Table";

export default {
  title: "ds-react-internal/table",
  component: Table,
};

export const All = () => {
  return (
    <>
      <h1>Table</h1>
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
      <h2>Small Table</h2>
      <Table size="small">
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
      <h2>Table with zebra style</h2>
      <Table variants={["zebra"]}>
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
            <Table.Body.Row.Cell>1</Table.Body.Row.Cell>
            <Table.Body.Row.Cell>Jean-Luc</Table.Body.Row.Cell>
            <Table.Body.Row.Cell>Picard</Table.Body.Row.Cell>
            <Table.Body.Row.Cell>Kaptein</Table.Body.Row.Cell>
          </Table.Body.Row>
          <Table.Body.Row>
            <Table.Body.Row.Cell>2</Table.Body.Row.Cell>
            <Table.Body.Row.Cell>William</Table.Body.Row.Cell>
            <Table.Body.Row.Cell>Riker</Table.Body.Row.Cell>
            <Table.Body.Row.Cell>Kommandør</Table.Body.Row.Cell>
          </Table.Body.Row>
          <Table.Body.Row>
            <Table.Body.Row.Cell>3</Table.Body.Row.Cell>
            <Table.Body.Row.Cell>Geordi</Table.Body.Row.Cell>
            <Table.Body.Row.Cell>La Forge</Table.Body.Row.Cell>
            <Table.Body.Row.Cell>Sjefsingeniør</Table.Body.Row.Cell>
          </Table.Body.Row>
        </Table.Body>
      </Table>
      <h2>Table with zebra style and vertical stripes</h2>
      <Table variants={["zebra", "vertical"]}>
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
            <Table.Body.Row.Cell>1</Table.Body.Row.Cell>
            <Table.Body.Row.Cell>Jean-Luc</Table.Body.Row.Cell>
            <Table.Body.Row.Cell>Picard</Table.Body.Row.Cell>
            <Table.Body.Row.Cell>Kaptein</Table.Body.Row.Cell>
          </Table.Body.Row>
          <Table.Body.Row>
            <Table.Body.Row.Cell>2</Table.Body.Row.Cell>
            <Table.Body.Row.Cell>William</Table.Body.Row.Cell>
            <Table.Body.Row.Cell>Riker</Table.Body.Row.Cell>
            <Table.Body.Row.Cell>Kommandør</Table.Body.Row.Cell>
          </Table.Body.Row>
          <Table.Body.Row>
            <Table.Body.Row.Cell>3</Table.Body.Row.Cell>
            <Table.Body.Row.Cell>Geordi</Table.Body.Row.Cell>
            <Table.Body.Row.Cell>La Forge</Table.Body.Row.Cell>
            <Table.Body.Row.Cell>Sjefsingeniør</Table.Body.Row.Cell>
          </Table.Body.Row>
        </Table.Body>
      </Table>
    </>
  );
};
