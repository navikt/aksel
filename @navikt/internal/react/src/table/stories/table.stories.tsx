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
            <th>ID</th>
            <th>Fornavn</th>
            <th>Etternavn</th>
            <th>Rolle</th>
          </Table.Header.Row>
        </Table.Header>
        <Table.Body>
          <Table.Body.Row>
            <th>1</th>
            <td>Jean-Luc</td>
            <td>Picard</td>
            <td>Kaptein</td>
          </Table.Body.Row>
          <Table.Body.Row>
            <th>2</th>
            <td>William</td>
            <td>Riker</td>
            <td>Kommandør</td>
          </Table.Body.Row>
          <Table.Body.Row>
            <th>3</th>
            <td>Geordi</td>
            <td>La Forge</td>
            <td>Sjefsingeniør</td>
          </Table.Body.Row>
        </Table.Body>
      </Table>
    </div>
  );
};
