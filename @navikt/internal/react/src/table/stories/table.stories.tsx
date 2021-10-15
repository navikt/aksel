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
      <h2>Small Table</h2>
      <Table size="small">
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
      <h2>Table with zebra style</h2>
      <Table zebraStyle={true}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.Row.HeaderCell>Fornavn</Table.Row.HeaderCell>
            <Table.Row.HeaderCell>Etternavn</Table.Row.HeaderCell>
            <Table.Row.HeaderCell>Rolle</Table.Row.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.DataCell>1</Table.DataCell>
            <Table.DataCell>Jean-Luc</Table.DataCell>
            <Table.DataCell>Picard</Table.DataCell>
            <Table.DataCell>Kaptein</Table.DataCell>
          </Table.Row>
          <Table.Row>
            <Table.DataCell>2</Table.DataCell>
            <Table.DataCell>William</Table.DataCell>
            <Table.DataCell>Riker</Table.DataCell>
            <Table.DataCell>Kommandør</Table.DataCell>
          </Table.Row>
          <Table.Row>
            <Table.DataCell>3</Table.DataCell>
            <Table.DataCell>Geordi</Table.DataCell>
            <Table.DataCell>La Forge</Table.DataCell>
            <Table.DataCell>Sjefsingeniør</Table.DataCell>
          </Table.Row>
        </Table.Body>
      </Table>
      <h2>Table vertical lines</h2>
      <Table verticalLines={true}>
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
            <Table.DataCell>1</Table.DataCell>
            <Table.DataCell>Jean-Luc</Table.DataCell>
            <Table.DataCell>Picard</Table.DataCell>
            <Table.DataCell>Kaptein</Table.DataCell>
          </Table.Row>
          <Table.Row>
            <Table.DataCell>2</Table.DataCell>
            <Table.DataCell>William</Table.DataCell>
            <Table.DataCell>Riker</Table.DataCell>
            <Table.DataCell>Kommandør</Table.DataCell>
          </Table.Row>
          <Table.Row>
            <Table.DataCell>3</Table.DataCell>
            <Table.DataCell>Geordi</Table.DataCell>
            <Table.DataCell>La Forge</Table.DataCell>
            <Table.DataCell>Sjefsingeniør</Table.DataCell>
          </Table.Row>
        </Table.Body>
      </Table>
    </>
  );
};
