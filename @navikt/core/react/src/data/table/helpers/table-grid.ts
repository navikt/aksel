function buildTableGrid(tableRef: HTMLTableElement): {
  grid: (Element | undefined)[][];
  positions: Map<Element, { x: number; y: number }>;
  maxCols: number;
} {
  const rows = tableRef.rows;
  const grid: (Element | undefined)[][] = [];
  const positions = new Map<Element, { x: number; y: number }>();
  let maxCols = 0;

  for (let rowIndex = 0; rowIndex < rows.length; rowIndex += 1) {
    const row = rows[rowIndex];
    const cells = row.cells;
    if (!grid[rowIndex]) {
      grid[rowIndex] = [];
    }

    let colIndex = 0;
    for (let cellIndex = 0; cellIndex < cells.length; cellIndex += 1) {
      const cell = cells[cellIndex];
      while (grid[rowIndex][colIndex]) {
        colIndex += 1;
      }

      const colSpan = Math.max(cell.colSpan || 1, 1);
      const rowSpan = Math.max(cell.rowSpan || 1, 1);

      for (let y = rowIndex; y < rowIndex + rowSpan; y += 1) {
        if (!grid[y]) {
          grid[y] = [];
        }
        for (let x = colIndex; x < colIndex + colSpan; x += 1) {
          grid[y][x] = cell;
        }
      }

      if (!positions.has(cell)) {
        positions.set(cell, { x: colIndex, y: rowIndex });
      }

      colIndex += colSpan;
      if (colIndex > maxCols) {
        maxCols = colIndex;
      }
    }
  }

  return { grid, positions, maxCols };
}

export { buildTableGrid };
