import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import "../src/index.less";

export default {
  title: "Tabell",
} as Meta;

export const All = () => {
  return (
    <div style={{ display: "grid", gridAutoRows: "8rem", rowGap: "8rem" }}>
      <table className="tabell">
        <thead>
          <tr>
            <th>ID</th>
            <th>Fornavn</th>
            <th>Etternavn</th>
            <th>Rolle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Jean-Luc</td>
            <td>Picard</td>
            <td>Kaptein</td>
          </tr>
          <tr>
            <td>2</td>
            <td>William</td>
            <td>Riker</td>
            <td>Kommandør</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Geordi</td>
            <td>La Forge</td>
            <td>Sjefsingeniør</td>
          </tr>
        </tbody>
      </table>

      <table className="tabell tabell--stripet">
        <thead>
          <tr>
            <th>ID</th>
            <th>Fornavn</th>
            <th>Etternavn</th>
            <th>Rolle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Jean-Luc</td>
            <td>Picard</td>
            <td>Kaptein</td>
          </tr>
          <tr>
            <td>2</td>
            <td>William</td>
            <td>Riker</td>
            <td>Kommandør</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Geordi</td>
            <td>La Forge</td>
            <td>Sjefsingeniør</td>
          </tr>
        </tbody>
      </table>

      <table className="tabell tabell--border">
        <thead>
          <tr>
            <th>ID</th>
            <th>Fornavn</th>
            <th>Etternavn</th>
            <th>Rolle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Jean-Luc</td>
            <td>Picard</td>
            <td>Kaptein</td>
          </tr>
          <tr>
            <td>2</td>
            <td>William</td>
            <td>Riker</td>
            <td>Kommandør</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Geordi</td>
            <td>La Forge</td>
            <td>Sjefsingeniør</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
