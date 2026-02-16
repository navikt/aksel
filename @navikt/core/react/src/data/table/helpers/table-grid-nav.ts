import { findFocusableElementInCell } from "./table-focus";

/**
 * Builds a utility grid allowing for easier keyboard-navigation between cells on columns and rows
 */
function buildTableGridMap(tableRef: HTMLTableElement): {
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

type GridCache = {
  grid: ReturnType<typeof buildTableGridMap> | null;
  dirty: boolean;
};

/**
 * Pure function that calculates the next grid position given a current position and delta.
 * Returns the position if valid, or null if out of bounds.
 */
function getNextGridPosition(
  grid: (Element | undefined)[][],
  currentPos: { x: number; y: number },
  delta: { x: number; y: number },
): { x: number; y: number } | null {
  const x = currentPos.x + delta.x;
  const y = currentPos.y + delta.y;

  if (y < 0 || y >= grid.length) {
    return null;
  }

  const row = grid[y] ?? [];
  if (x < 0 || x >= row.length) {
    return null;
  }

  return { x, y };
}

/**
 * Checks if a cell is focusable (contains focusable elements).
 * Type guard that narrows Element | undefined to Element.
 */
function isCellFocusable(cell: Element | undefined): cell is Element {
  if (!cell) {
    return false;
  }
  return !!findFocusableElementInCell(cell);
}

/**
 * Finds the next cell in the given direction, starting from the current position.
 * Skips over cells that are not focusable.
 * Returns null if no next cell is found in the given direction.
 * TODO: Bug found: Since we dont check against current cell now, rowspan/colspan return the same cell, making no navigation happend.
 */
function findNextFocusableCell(
  grid: (Element | undefined)[][],
  currentPos: { x: number; y: number },
  delta: { x: number; y: number },
): Element | null {
  let position = currentPos;

  while (true) {
    const nextPos = getNextGridPosition(grid, position, delta);
    if (!nextPos) {
      return null;
    }

    const cell = grid[nextPos.y][nextPos.x];
    if (isCellFocusable(cell)) {
      return cell;
    }

    position = nextPos;
  }
}

/**
 * Finds the first focusable cell in the given row.
 */
function findFirstCellInRow(
  grid: (Element | undefined)[][],
  rowIndex: number,
): Element | null {
  const row = grid[rowIndex] ?? [];
  for (let x = 0; x < row.length; x += 1) {
    const cell = row[x];
    if (isCellFocusable(cell)) {
      return cell;
    }
  }

  return null;
}

/**
 * Finds the last focusable cell in the given row.
 */
function findLastCellInRow(
  grid: (Element | undefined)[][],
  rowIndex: number,
): Element | null {
  const row = grid[rowIndex] ?? [];
  for (let x = row.length - 1; x >= 0; x -= 1) {
    const cell = row[x];
    if (isCellFocusable(cell)) {
      return cell;
    }
  }

  return null;
}

/**
 * Finds the first focusable cell in the entire table.
 */
function findFirstCell(grid: (Element | undefined)[][]): Element | null {
  for (let y = 0; y < grid.length; y += 1) {
    const row = grid[y] ?? [];
    for (let x = 0; x < row.length; x += 1) {
      const cell = row[x];
      if (isCellFocusable(cell)) {
        return cell;
      }
    }
  }

  return null;
}

/**
 * Finds the last focusable cell in the entire table.
 */
function findLastCell(grid: (Element | undefined)[][]): Element | null {
  for (let y = grid.length - 1; y >= 0; y -= 1) {
    const row = grid[y] ?? [];
    for (let x = row.length - 1; x >= 0; x -= 1) {
      const cell = row[x];
      if (isCellFocusable(cell)) {
        return cell;
      }
    }
  }

  return null;
}

export {
  buildTableGridMap,
  findFirstCell,
  findFirstCellInRow,
  findLastCell,
  findLastCellInRow,
  findNextFocusableCell,
  getNextGridPosition,
  isCellFocusable,
};
export type { GridCache };
