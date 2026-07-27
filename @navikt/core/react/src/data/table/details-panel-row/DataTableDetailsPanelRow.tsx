import React from "react";
import {
  getDataTableDetailsPanelId,
  useDataTableDetailsPanel,
} from "../hooks/useTableDetailsPanel";
import { useDataTableContext } from "../root/DataTableRoot.context";

function DataTableDetailsPanelRow<T>({
  rowId,
  rowData,
}: {
  rowId: string;
  rowData: T;
}) {
  const { tableId, totalColSpan } = useDataTableContext();
  const {
    enableDetailsPanel,
    isExpanded,
    getDetailsPanelContent,
    getDetailsPanelHeight,
  } = useDataTableDetailsPanel();

  if (!enableDetailsPanel) {
    return null;
  }

  if (!isExpanded(rowId)) {
    return null;
  }

  const content = getDetailsPanelContent?.(rowData);
  const expansionId = getDataTableDetailsPanelId(tableId, rowId);

  if (!content) {
    return null;
  }

  const panelHeight = getDetailsPanelHeight?.(rowData);

  const style: React.CSSProperties = panelHeight
    ? { height: panelHeight, overflow: "auto" }
    : { height: "auto" };

  return (
    <tr className="aksel-data-table__details-panel-row">
      <td
        id={expansionId}
        colSpan={totalColSpan}
        className="aksel-data-table__details-panel-row-cell"
      >
        <div style={style}>{content}</div>
      </td>
    </tr>
  );
}

export { DataTableDetailsPanelRow };
