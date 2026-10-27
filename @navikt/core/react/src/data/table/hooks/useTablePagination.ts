import { useMemo } from "react";
import {
  useDataGridContext,
  useDataGridRootPaginationContext,
} from "../../../data-grid/root/DataGridRoot.context";
import { consoleWarning } from "../../../utils/helpers/consoleWarning";

function useTablePagination({ hasSubRows }: { hasSubRows: boolean }) {
  const { data, getRowId, selection } = useDataGridContext();
  const pagination = useDataGridRootPaginationContext(false);
  const clientPagination =
    pagination?.mode === "client" ? pagination : undefined;
  const startIndex = clientPagination?.startIndex;
  const endIndex = clientPagination?.endIndex;

  const items = useMemo(
    () => (startIndex === undefined ? data : data.slice(startIndex, endIndex)),
    [data, startIndex, endIndex],
  );

  const hasSelection = selection !== undefined && selection.mode !== "none";

  if (
    process.env.NODE_ENV !== "production" &&
    clientPagination !== undefined &&
    !getRowId &&
    (hasSelection || hasSubRows)
  ) {
    consoleWarning(
      "DataGrid.Table: Provide `getRowId` when using client pagination with selection or subRows. Index-based fallback ids can change after sorting, filtering, or deleting rows.",
    );
  }

  return { items, indexOffset: startIndex };
}

export { useTablePagination };
