import { getFocusableTarget } from "./table-focus";

/**
 * Builds a utility grid allowing for easier keyboard-navigation between cells on columns and rows
 */
function buildTableGrid(tableRef: HTMLTableElement): {
  grid: (Element | undefined)[][];
  positions: Map<Element, { x: number; y: number }>;
} {
  const rows = tableRef.rows;
  const grid: (Element | undefined)[][] = [];
  const positions = new Map<Element, { x: number; y: number }>();

  /* Walk trough each row in order */
  for (let rowIndex = 0; rowIndex < rows.length; rowIndex += 1) {
    const row = rows[rowIndex];
    const cells = row.cells;
    if (!grid[rowIndex]) {
      grid[rowIndex] = [];
    }

    let colIndex = 0;

    /* Walk trough each cell in row */
    for (let cellIndex = 0; cellIndex < cells.length; cellIndex += 1) {
      const cell = cells[cellIndex];

      /* Skip over slots already occupied by previous row/col spans. */
      while (grid[rowIndex][colIndex]) {
        colIndex += 1;
      }

      const colSpan = Math.max(cell.colSpan || 1, 1);
      const rowSpan = Math.max(cell.rowSpan || 1, 1);

      /* Fill the grid with references to this cell for its row/col span. */
      for (let y = rowIndex; y < rowIndex + rowSpan; y += 1) {
        if (!grid[y]) {
          grid[y] = [];
        }
        for (let x = colIndex; x < colIndex + colSpan; x += 1) {
          grid[y][x] = cell;
        }
      }

      /* Track the top-left coordinate for each unique cell. */
      if (!positions.has(cell)) {
        positions.set(cell, { x: colIndex, y: rowIndex });
      }

      colIndex += colSpan;
    }
  }

  return { grid, positions };
}

type TableGrid = ReturnType<typeof buildTableGrid>;

type GridCache = { grid: TableGrid | null; dirty: boolean };

/**
 * Makes sure to keep a cached version of the table grid, and only rebuild it when necessary (when "dirty" flag is set)
 */
function ensureTableGrid(
  tableRef: HTMLTableElement,
  tableGridCache: GridCache,
): TableGrid {
  if (tableGridCache.dirty || !tableGridCache.grid) {
    tableGridCache.grid = buildTableGrid(tableRef);
    tableGridCache.dirty = false;
  }

  return tableGridCache.grid;
}

/**
 * Finds the next cell in the given direction, starting from the current position.
 * Skips over cells that are not focusable or are the same as the current cell.
 * Returns null if no next cell is found in the given direction.
 */
function findNextCell(
  grid: (Element | undefined)[][],
  currentPos: { x: number; y: number },
  delta: { x: number; y: number },
  currentCell: Element,
): Element | null {
  let x = currentPos.x + delta.x;
  let y = currentPos.y + delta.y;

  const maxRows = grid.length;

  while (y >= 0 && y < maxRows) {
    const row = grid[y] ?? [];
    if (x < 0 || x >= row.length) {
      break;
    }
    const cell = row[x];
    if (cell && cell !== currentCell && !!getFocusableTarget(cell)) {
      return cell;
    }
    x += delta.x;
    y += delta.y;
  }

  return null;
}

export { buildTableGrid, ensureTableGrid, findNextCell, type GridCache };
