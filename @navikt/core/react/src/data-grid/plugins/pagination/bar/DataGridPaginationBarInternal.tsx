import React from "react";
import type { DataGridPaginationAlign } from "../DataGridPagination.types";
import { DataGridPaginationPagesInternal } from "../pages/DataGridPaginationPagesInternal";
import { DataGridPaginationRowsInternal } from "../rows/DataGridPaginationRowsInternal";

interface DataGridPaginationBarInternalProps {
  position: "above" | "below";
  align: DataGridPaginationAlign;
  navLabel?: string;
}

function DataGridPaginationBarInternal({
  position,
  align,
  navLabel,
}: DataGridPaginationBarInternalProps) {
  return (
    <div
      className="aksel-data-grid__pagination-wrapper"
      data-position={position}
      data-align={align}
    >
      <div className="aksel-data-grid__pagination">
        <DataGridPaginationRowsInternal />
        <DataGridPaginationPagesInternal navLabel={navLabel} />
      </div>
    </div>
  );
}

export { DataGridPaginationBarInternal };
