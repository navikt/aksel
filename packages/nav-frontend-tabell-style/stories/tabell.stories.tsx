import React, { useState } from "react";
import { Meta } from "@storybook/react/types-6-0";

import button from "nav-frontend-lenker";
import "../src/index.less";

export default {
  title: "Tabell",
} as Meta;

export const All = () => {
  const [sort, setSort] = useState("asc");
  const handleClick = (e) => {
    e.preventDefault();
    const states = ["desc", "asc", "none"];
    setSort((sort) => states[(states.indexOf(sort) + 1) % states.length]);
  };
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
            <th>1</th>
            <td>Jean-Luc</td>
            <td>Picard</td>
            <td>Kaptein</td>
          </tr>
          <tr>
            <th>2</th>
            <td>William</td>
            <td>Riker</td>
            <td>Kommandør</td>
          </tr>
          <tr>
            <th>3</th>
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
              <button>ID</button>
            </th>
            <th
              role="columnheader"
              aria-sort="descending"
              className="tabell__th--sortert-desc"
            >
              <button>Fornavn</button>
            </th>
            <th
              role="columnheader"
              aria-sort="none"
              className={`tabell__th--sortert-${sort}`}
            >
              <button onClick={(e) => handleClick(e)}>Etternavn</button>
            </th>
            <th role="columnheader" aria-sort="none">
              <button>Rolle</button>
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
