import React from "react";
import { ChevronDownIcon, ChevronRightIcon } from "@navikt/aksel-icons";
import { Button } from "../../../button";
import { type ItemDetail } from "../hooks/useTableItems";
import { useDataTableContext } from "../root/DataTableRoot.context";

function DataTableSubRowToggle({ details }: { details: ItemDetail<any> }) {
  const { tableItems } = useDataTableContext();

  const subRows = details.children;
  const hasSubRows = subRows && subRows.length > 0;
  const isRowExpanded = tableItems.isSubRowExpanded(details.id);

  return (
    <div className="aksel-data-table__nested-toggle">
      {hasSubRows && (
        <Button
          variant="tertiary"
          data-color="neutral"
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            tableItems.onExpandedRowIdsChange(details.id);
          }}
          aria-expanded={isRowExpanded}
          aria-label={isRowExpanded ? "Skjul under-rader" : "Vis under-rader"} // TODO translate
          icon={
            isRowExpanded ? (
              <ChevronDownIcon aria-hidden />
            ) : (
              <ChevronRightIcon aria-hidden />
            )
          }
        />
      )}
    </div>
  );
}

export { DataTableSubRowToggle };
