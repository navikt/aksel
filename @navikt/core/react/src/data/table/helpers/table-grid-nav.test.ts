import { afterEach, describe, expect, test } from "vitest";
import { buildTableGridMap } from "./table-grid-nav";

describe("buildTableGridMap", () => {
  let container: HTMLDivElement;

  afterEach(() => {
    container?.parentNode && document.body.removeChild(container);
  });

  function createTable(html: string): HTMLTableElement {
    container = document.createElement("div");
    container.innerHTML = html;
    document.body.appendChild(container);
    return container.querySelector("table")!;
  }

  test("should build grid for simple 2x2 table without spans", () => {
    const table = createTable(`
      <table>
        <tr>
          <td>A1</td>
          <td>B1</td>
        </tr>
        <tr>
          <td>A2</td>
          <td>B2</td>
        </tr>
      </table>
    `);

    const { grid, positions } = buildTableGridMap(table);

    expect(grid.length).toBe(2);
    expect(grid[0].length).toBe(2);
    expect(grid[1].length).toBe(2);

    const cells = Array.from(table.querySelectorAll("td"));
    expect(grid[0][0]).toBe(cells[0]);
    expect(grid[0][1]).toBe(cells[1]);
    expect(grid[1][0]).toBe(cells[2]);
    expect(grid[1][1]).toBe(cells[3]);

    expect(positions.get(cells[0])).toEqual({ x: 0, y: 0 });
    expect(positions.get(cells[1])).toEqual({ x: 1, y: 0 });
    expect(positions.get(cells[2])).toEqual({ x: 0, y: 1 });
    expect(positions.get(cells[3])).toEqual({ x: 1, y: 1 });
  });

  test("should handle colspan correctly", () => {
    const table = createTable(`
      <table>
        <tr>
          <td colspan="2">A1-B1</td>
        </tr>
        <tr>
          <td>A2</td>
          <td>B2</td>
        </tr>
      </table>
    `);

    const { grid, positions } = buildTableGridMap(table);

    expect(grid.length).toBe(2);
    expect(grid[0].length).toBe(2);
    expect(grid[1].length).toBe(2);

    const cells = Array.from(table.querySelectorAll("td"));
    const cellWithColspan = cells[0];

    expect(grid[0][0]).toBe(cellWithColspan);
    expect(grid[0][1]).toBe(cellWithColspan);
    expect(grid[1][0]).toBe(cells[1]);
    expect(grid[1][1]).toBe(cells[2]);

    expect(positions.get(cellWithColspan)).toEqual({ x: 0, y: 0 });
    expect(positions.get(cells[1])).toEqual({ x: 0, y: 1 });
    expect(positions.get(cells[2])).toEqual({ x: 1, y: 1 });
  });

  test("should handle rowspan correctly", () => {
    const table = createTable(`
      <table>
        <tr>
          <td rowspan="2">A1-A2</td>
          <td>B1</td>
        </tr>
        <tr>
          <td>B2</td>
        </tr>
      </table>
    `);

    const { grid, positions } = buildTableGridMap(table);

    expect(grid.length).toBe(2);
    expect(grid[0].length).toBe(2);
    expect(grid[1].length).toBe(2);

    const cells = Array.from(table.querySelectorAll("td"));
    const cellWithRowspan = cells[0];

    expect(grid[0][0]).toBe(cellWithRowspan);
    expect(grid[0][1]).toBe(cells[1]);
    expect(grid[1][0]).toBe(cellWithRowspan);
    expect(grid[1][1]).toBe(cells[2]);

    expect(positions.get(cellWithRowspan)).toEqual({ x: 0, y: 0 });
    expect(positions.get(cells[1])).toEqual({ x: 1, y: 0 });
    expect(positions.get(cells[2])).toEqual({ x: 1, y: 1 });
  });

  test("should handle both colspan and rowspan", () => {
    const table = createTable(`
      <table>
        <tr>
          <td colspan="2" rowspan="2">A1-B1-A2-B2</td>
          <td>C1</td>
        </tr>
        <tr>
          <td>C2</td>
        </tr>
      </table>
    `);

    const { grid, positions } = buildTableGridMap(table);

    expect(grid.length).toBe(2);
    expect(grid[0].length).toBe(3);
    expect(grid[1].length).toBe(3);

    const cells = Array.from(table.querySelectorAll("td"));
    const spanningCell = cells[0];

    expect(grid[0][0]).toBe(spanningCell);
    expect(grid[0][1]).toBe(spanningCell);
    expect(grid[0][2]).toBe(cells[1]);
    expect(grid[1][0]).toBe(spanningCell);
    expect(grid[1][1]).toBe(spanningCell);
    expect(grid[1][2]).toBe(cells[2]);

    expect(positions.get(spanningCell)).toEqual({ x: 0, y: 0 });
    expect(positions.get(cells[1])).toEqual({ x: 2, y: 0 });
    expect(positions.get(cells[2])).toEqual({ x: 2, y: 1 });
  });

  test("should handle complex table with multiple spans", () => {
    const table = createTable(`
      <table>
        <tr>
          <td>A1</td>
          <td colspan="2">B1-C1</td>
          <td>D1</td>
        </tr>
        <tr>
          <td rowspan="2">A2-A3</td>
          <td>B2</td>
          <td>C2</td>
          <td>D2</td>
        </tr>
        <tr>
          <td>B3</td>
          <td colspan="2">C3-D3</td>
        </tr>
      </table>
    `);

    const { grid, positions } = buildTableGridMap(table);

    expect(grid.length).toBe(3);
    expect(grid[0].length).toBe(4);
    expect(grid[1].length).toBe(4);
    expect(grid[2].length).toBe(4);

    const cells = Array.from(table.querySelectorAll("td"));

    expect(grid[0][0]).toBe(cells[0]);
    expect(grid[0][1]).toBe(cells[1]);
    expect(grid[0][2]).toBe(cells[1]);
    expect(grid[0][3]).toBe(cells[2]);

    expect(grid[1][0]).toBe(cells[3]);
    expect(grid[1][1]).toBe(cells[4]);
    expect(grid[1][2]).toBe(cells[5]);
    expect(grid[1][3]).toBe(cells[6]);

    expect(grid[2][0]).toBe(cells[3]);
    expect(grid[2][1]).toBe(cells[7]);
    expect(grid[2][2]).toBe(cells[8]);
    expect(grid[2][3]).toBe(cells[8]);

    expect(positions.get(cells[0])).toEqual({ x: 0, y: 0 });
    expect(positions.get(cells[1])).toEqual({ x: 1, y: 0 });
    expect(positions.get(cells[2])).toEqual({ x: 3, y: 0 });
    expect(positions.get(cells[3])).toEqual({ x: 0, y: 1 });
    expect(positions.get(cells[4])).toEqual({ x: 1, y: 1 });
    expect(positions.get(cells[5])).toEqual({ x: 2, y: 1 });
    expect(positions.get(cells[6])).toEqual({ x: 3, y: 1 });
    expect(positions.get(cells[7])).toEqual({ x: 1, y: 2 });
    expect(positions.get(cells[8])).toEqual({ x: 2, y: 2 });
  });

  test("should handle table with thead, tbody, and tfoot", () => {
    const table = createTable(`
      <table>
        <thead>
          <tr>
            <th>Header 1</th>
            <th>Header 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Body 1</td>
            <td>Body 2</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>Footer 1</td>
            <td>Footer 2</td>
          </tr>
        </tfoot>
      </table>
    `);

    const { grid } = buildTableGridMap(table);

    expect(grid.length).toBe(3);
    expect(grid[0].length).toBe(2);
    expect(grid[1].length).toBe(2);
    expect(grid[2].length).toBe(2);

    const headerCells = Array.from(table.querySelectorAll("th"));
    const bodyCells = Array.from(table.querySelectorAll("tbody td"));
    const footerCells = Array.from(table.querySelectorAll("tfoot td"));

    expect(grid[0][0]).toBe(headerCells[0]);
    expect(grid[0][1]).toBe(headerCells[1]);
    expect(grid[1][0]).toBe(bodyCells[0]);
    expect(grid[1][1]).toBe(bodyCells[1]);
    expect(grid[2][0]).toBe(footerCells[0]);
    expect(grid[2][1]).toBe(footerCells[1]);
  });

  test("should handle empty table", () => {
    const table = createTable("<table></table>");

    const { grid, positions } = buildTableGridMap(table);

    expect(grid.length).toBe(0);
    expect(positions.size).toBe(0);
  });

  test("should handle table with empty row", () => {
    const table = createTable(`
      <table>
        <tr></tr>
      </table>
    `);

    const { grid, positions } = buildTableGridMap(table);

    expect(grid.length).toBe(1);
    expect(grid[0].length).toBe(0);
    expect(positions.size).toBe(0);
  });

  test("should handle colspan=0 and rowspan=0 as 1", () => {
    const table = createTable(`
      <table>
        <tr>
          <td colspan="0">A</td>
          <td>B</td>
        </tr>
        <tr>
          <td rowspan="0">C</td>
          <td>D</td>
        </tr>
      </table>
    `);

    const { grid } = buildTableGridMap(table);
    const cells = Array.from(table.querySelectorAll("td"));

    expect(grid[0][0]).toBe(cells[0]);
    expect(grid[0][1]).toBe(cells[1]);
    expect(grid[1][0]).toBe(cells[2]);
    expect(grid[1][1]).toBe(cells[3]);
  });

  test("should handle negative span values as 1", () => {
    const table = createTable(`
      <table>
        <tr>
          <td colspan="-1">A</td>
          <td>B</td>
        </tr>
        <tr>
          <td rowspan="-2">C</td>
          <td>D</td>
        </tr>
      </table>
    `);

    const { grid } = buildTableGridMap(table);
    const cells = Array.from(table.querySelectorAll("td"));

    expect(grid[0][0]).toBe(cells[0]);
    expect(grid[0][1]).toBe(cells[1]);
    expect(grid[1][0]).toBe(cells[2]);
    expect(grid[1][1]).toBe(cells[3]);
  });

  test("should handle large span values", () => {
    const table = createTable(`
      <table>
        <tr>
          <td colspan="5">Wide cell</td>
        </tr>
        <tr>
          <td>A</td>
          <td>B</td>
          <td>C</td>
          <td>D</td>
          <td>E</td>
        </tr>
      </table>
    `);

    const { grid, positions } = buildTableGridMap(table);
    const cells = Array.from(table.querySelectorAll("td"));
    const wideCell = cells[0];

    expect(grid[0].length).toBe(5);
    expect(grid[0][0]).toBe(wideCell);
    expect(grid[0][1]).toBe(wideCell);
    expect(grid[0][2]).toBe(wideCell);
    expect(grid[0][3]).toBe(wideCell);
    expect(grid[0][4]).toBe(wideCell);

    expect(positions.get(wideCell)).toEqual({ x: 0, y: 0 });
  });

  test("should skip over slots occupied by previous spans", () => {
    const table = createTable(`
      <table>
        <tr>
          <td rowspan="2">A</td>
          <td>B</td>
          <td>C</td>
        </tr>
        <tr>
          <td>D</td>
          <td>E</td>
        </tr>
      </table>
    `);

    const { grid, positions } = buildTableGridMap(table);
    const cells = Array.from(table.querySelectorAll("td"));

    expect(grid[0][0]).toBe(cells[0]);
    expect(grid[0][1]).toBe(cells[1]);
    expect(grid[0][2]).toBe(cells[2]);
    expect(grid[1][0]).toBe(cells[0]);
    expect(grid[1][1]).toBe(cells[3]);
    expect(grid[1][2]).toBe(cells[4]);

    expect(positions.get(cells[3])).toEqual({ x: 1, y: 1 });
    expect(positions.get(cells[4])).toEqual({ x: 2, y: 1 });
  });
});
