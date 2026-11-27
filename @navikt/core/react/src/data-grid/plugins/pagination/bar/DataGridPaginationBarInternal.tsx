import React from "react";
import type { DataGridPaginationAlign } from "../DataGridPagination.types";
import { DataGridPaginationPagesInternal } from "../pages/DataGridPaginationPagesInternal";
import { DataGridPaginationRowsInternal } from "../rows/DataGridPaginationRowsInternal";

interface DataGridPaginationBarInternalProps {
  align: DataGridPaginationAlign;
  navLabel?: string;
}

function DataGridPaginationBarInternal({
  align,
  navLabel,
}: DataGridPaginationBarInternalProps) {
  return (
    <div className="aksel-data-grid__pagination-wrapper" data-align={align}>
      <div className="aksel-data-grid__pagination">
        <DataGridPaginationRowsInternal />
        <DataGridPaginationPagesInternal navLabel={navLabel} />
      </div>
    </div>
  );
}

export { DataGridPaginationBarInternal };
