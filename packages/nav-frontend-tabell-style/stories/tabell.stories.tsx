import React from "react";
import { Meta } from "@storybook/react/types-6-0";

import Lenke from "nav-frontend-lenker";
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
            <th scope="col">ID</th>
            <th scope="col">Fornavn</th>
            <th scope="col">Etternavn</th>
            <th scope="col">Rolle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Jean-Luc</td>
            <td>Picard</td>
            <td>Kaptein</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>William</td>
            <td>Riker</td>
            <td>Kommandør</td>
          </tr>
          <tr>
            <th scope="row">3</th>
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

      <table className="tabell">
        <thead>
          <tr>
            <th role="columnheader" aria-sort="none">
              <Lenke href="#">ID</Lenke>
            </th>
            <th
              role="columnheader"
              aria-sort="descending"
              className="tabell__th--sortert-desc"
            >
              <Lenke href="#">Fornavn</Lenke>
            </th>
            <th role="columnheader" aria-sort="none">
              <Lenke href="#">Etternavn</Lenke>
            </th>
            <th role="columnheader" aria-sort="none">
              <Lenke href="#">Rolle</Lenke>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>3</td>
            <td className="tabell__td--sortert">Geordi</td>
            <td>La Forge</td>
            <td>Sjefsingeniør</td>
          </tr>
          <tr>
            <td>1</td>
            <td className="tabell__td--sortert">Jean-Luc</td>
            <td>Picard</td>
            <td>Kaptein</td>
          </tr>
          <tr>
            <td>2</td>
            <td className="tabell__td--sortert">William</td>
            <td>Riker</td>
            <td>Kommandør</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
