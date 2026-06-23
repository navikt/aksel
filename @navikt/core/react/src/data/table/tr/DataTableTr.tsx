import React, { forwardRef } from "react";
import {
  ChevronDownUpIcon,
  ChevronUpDownIcon,
  MinusIcon,
  PlusIcon,
} from "@navikt/aksel-icons";
import { Button } from "../../../button";
import { useDataGridContext } from "../../../data-grid/root/DataGridRoot.context";
import { CheckboxInput } from "../../../form/checkbox/checkbox-input/CheckboxInput";
import { RadioInput } from "../../../form/radio/radio-input/RadioInput";
import { Skeleton } from "../../../skeleton";
import { Label } from "../../../typography";
import { useId } from "../../../utils-external";
import { cl, composeEventHandlers } from "../../../utils/helpers";
import { consoleWarning } from "../../../utils/helpers/consoleWarning";
import { DataTableBaseCell } from "../base-cell/DataTableBaseCell";
import { DataTableColumnHeader } from "../column-header/DataTableColumnHeader";
import {
  getDataTableDetailsPanelId,
  useDataTableDetailsPanel,
} from "../hooks/useTableDetailsPanel";
import type { TableRowEntryId } from "../root/DataGridTable.types";
import {
  useDataTableContext,
  useDataTableLocation,
} from "../root/DataTableRoot.context";
import { DataTableTd } from "../td/DataTableTd";

const ACTION_CELL_WIDTH = 50;

const ACTION_CELL_CSS_WIDTH = `${ACTION_CELL_WIDTH}px`;

type DataTableTrProps = React.HTMLAttributes<HTMLTableRowElement> & {
  selected?: boolean;
  /**
   * Unique identifier for the row, used for selection.
   */
  rowId?: TableRowEntryId;
};

const DataTableTr = forwardRef<HTMLTableRowElement, DataTableTrProps>(
  (
    {
      className,
      children,
      selected: selectedProp = false,
      rowId,
      onClick,
      ...rest
    },
    forwardedRef,
  ) => {
    const { layout, selectionState, onRowAction, tableItems } =
      useDataTableContext();
    const { location } = useDataTableLocation();

    const renderFillerCell = layout === "fixed" && children;

    const selected =
      selectionState.selection.isRowSelected(rowId ?? "") ?? selectedProp;

    const handleClick =
      location === "tbody" &&
      rowId !== undefined &&
      ((selectionState.selectionTrigger === "row" &&
        selectionState.selection.mode !== "none") ||
        onRowAction)
        ? (event: React.MouseEvent<HTMLTableRowElement>) => {
            if (
              rowId === undefined ||
              isInteractiveTarget(event.target) ||
              (event.target as HTMLElement | null)?.closest(
                "[data-prevent-row-click]",
              )
            ) {
              return;
            }

            if (onRowAction) {
              const rowData = tableItems.itemDetails.get(rowId)?.rowData;

              if (rowData) {
                onRowAction({
                  row: rowData,
                  id: rowId,
                  event,
                });
              } else {
                consoleWarning(
                  `DataGrid.Table: Unable to find row data for rowId ${rowId} when calling onRowAction.`,
                );
              }
            }

            if (event.defaultPrevented) {
              return;
            }

            const selection = window.getSelection();
            if (selection && selection.toString().length > 0) {
              return;
            }

            if (
              selectionState.selectionTrigger === "row" &&
              selectionState.selection.mode !== "none"
            ) {
              const rowData = tableItems.itemDetails.get(rowId)?.rowData;

              if (!rowData) {
                consoleWarning(
                  `DataGrid.Table: No row data found for rowId ${rowId}. This may cause issues with selection if enableRowSelection is used.`,
                );
              }
              selectionState.selection.toggleSelection(rowId, rowData);
            }
          }
        : undefined;

    return (
      <tr
        {...rest}
        // Avoid setting onClick if not needed, since this causes NVDA to announce the row as clickable.
        onClick={
          (onClick || handleClick) && composeEventHandlers(onClick, handleClick)
        }
        ref={forwardedRef}
        className={cl("aksel-data-table__tr", className)}
        data-selected={selected}
      >
        <RowExpansionCell rowId={rowId} />
        <RowSelectionCell rowId={rowId} />
        {children}
        {renderFillerCell && (
          /* Using div causes illegal dom structure */
          <td
            aria-hidden
            className="aksel-data-table__cell aksel-data-table__filler-cell"
            data-block-keyboard-nav
          />
        )}
      </tr>
    );
  },
);

function RowExpansionCell({ rowId }: { rowId?: TableRowEntryId }) {
  const { isLoading } = useDataGridContext();
  const { tableId, loading, stickyStart } = useDataTableContext();
  const stickyExpansion = stickyStart.expansion;

  const expansionHeaderId = useId();

  const { location } = useDataTableLocation();

  const {
    isExpanded,
    isDetailsPanelExpandable,
    toggleExpansion,
    enableDetailsPanel,
    isAllExpanded,
    toggleAll,
    showExpandAll,
  } = useDataTableDetailsPanel();

  if (!enableDetailsPanel) {
    return null;
  }

  if (isLoading && loading?.variant === "skeleton") {
    if (location === "thead") {
      return (
        <DataTableColumnHeader
          id={expansionHeaderId}
          width={{ value: ACTION_CELL_CSS_WIDTH }}
          cellType="action"
          data-block-keyboard-nav
          label=""
          isSticky={stickyExpansion && "start"}
          style={stickyExpansion ? { left: 0 } : undefined}
        />
      );
    }
    return (
      <DataTableBaseCell
        as="td"
        isSticky={stickyExpansion && "start"}
        style={stickyExpansion ? { left: 0 } : undefined}
      >
        <Skeleton variant="text" />
      </DataTableBaseCell>
    );
  }

  if (location === "thead" && !showExpandAll) {
    return (
      <DataTableColumnHeader
        id={expansionHeaderId}
        width={{ value: ACTION_CELL_CSS_WIDTH }}
        cellType="action"
        data-block-keyboard-nav
        label=""
        isSticky={stickyExpansion && "start"}
        style={stickyExpansion ? { left: 0 } : undefined}
      />
    );
  }

  if (location === "thead") {
    return (
      <DataTableColumnHeader
        id={expansionHeaderId}
        align="center"
        width={{ value: ACTION_CELL_CSS_WIDTH }}
        cellType="action"
        label=""
        isSticky={stickyExpansion && "start"}
        style={stickyExpansion ? { left: 0 } : undefined}
      >
        <Button
          variant="tertiary"
          data-color="neutral"
          size="xsmall"
          onClick={toggleAll}
          aria-expanded={isAllExpanded}
          aria-label={isAllExpanded ? "Skjul alle rader" : "Vis alle rader"}
          icon={
            isAllExpanded ? (
              <ChevronDownUpIcon aria-hidden />
            ) : (
              <ChevronUpDownIcon aria-hidden />
            )
          }
        />
      </DataTableColumnHeader>
    );
  }

  if (!rowId) {
    return null;
  }

  const isRowExpanded = isExpanded(rowId);
  const canExpandRow = isDetailsPanelExpandable(rowId);
  const expansionId = getDataTableDetailsPanelId(tableId, rowId);

  if (!canExpandRow) {
    return (
      <DataTableTd
        cellType="action"
        preventRowClick
        isSticky={stickyExpansion && "start"}
        style={stickyExpansion ? { left: 0 } : undefined}
      />
    );
  }

  return (
    <DataTableTd
      cellType="action"
      preventRowClick
      isSticky={stickyExpansion && "start"}
      style={stickyExpansion ? { left: 0 } : undefined}
    >
      <Button
        variant="tertiary"
        data-color="neutral"
        size="xsmall"
        onClick={(e) => {
          e.stopPropagation();
          toggleExpansion(rowId);
        }}
        aria-expanded={isRowExpanded}
        aria-controls={expansionId}
        aria-label={isRowExpanded ? "Skjul detaljer" : "Vis detaljer"}
        icon={
          isRowExpanded ? <MinusIcon aria-hidden /> : <PlusIcon aria-hidden />
        }
      />
    </DataTableTd>
  );
}

/**
 * TODO: How do these cells handle multiple thead rows, or col/row-spans?
 * TODO: a11y for labels
 */
function RowSelectionCell({ rowId }: { rowId?: TableRowEntryId }) {
  const { isLoading } = useDataGridContext();
  const { selectionState, stickyStart, loading } = useDataTableContext();
  const stickySelection = stickyStart.selection;
  const stickySelectionOffset = stickyStart.selectionOffset;
  const { location } = useDataTableLocation();

  const { tableItems } = useDataTableContext();

  const inputId = useId();
  const selectionHeaderId = useId();

  const { selection, renderSelection } = selectionState;

  if (selection.mode === "none" || !renderSelection) {
    return null;
  }

  if (isLoading && loading?.variant === "skeleton") {
    if (location === "thead") {
      return (
        <DataTableColumnHeader
          id={selectionHeaderId}
          width={{ value: ACTION_CELL_CSS_WIDTH }}
          cellType="action"
          label=""
          data-block-keyboard-nav
          isSticky={stickySelection && "start"}
          style={stickySelection ? { left: stickySelectionOffset } : undefined}
        />
      );
    }

    return (
      <DataTableBaseCell
        as="td"
        isSticky={stickySelection && "start"}
        style={stickySelection ? { left: stickySelectionOffset } : undefined}
      >
        <Skeleton variant="text" />
      </DataTableBaseCell>
    );
  }

  /* TODO: A11y support */
  if (selection.mode === "multiple" && location === "thead") {
    const theadCheckboxProps = selection.getTheadCheckboxProps();

    let labelText = "Velg alle synlige rader";
    if (theadCheckboxProps.checked) {
      labelText = "Fjern alle synlige valgte rader";
    }

    return (
      <DataTableColumnHeader
        id={selectionHeaderId}
        align="center"
        width={{ value: ACTION_CELL_CSS_WIDTH }}
        cellType="action"
        label=""
        isSticky={stickySelection && "start"}
        style={stickySelection ? { left: stickySelectionOffset } : undefined}
      >
        <Label htmlFor={inputId} visuallyHidden>
          {labelText}
        </Label>
        <CheckboxInput {...theadCheckboxProps} id={inputId} compact />
      </DataTableColumnHeader>
    );
  }

  if (selection.mode === "single" && location === "thead") {
    return (
      <DataTableColumnHeader
        id={selectionHeaderId}
        width={{ value: ACTION_CELL_CSS_WIDTH }}
        cellType="action"
        label=""
        data-block-keyboard-nav
        isSticky={stickySelection && "start"}
        style={stickySelection ? { left: stickySelectionOffset } : undefined}
      />
    );
  }

  if (rowId == null) {
    return null;
  }

  if (selection.mode === "multiple" && location === "tbody") {
    return (
      <DataTableTd
        cellType="action"
        isSticky={stickySelection && "start"}
        style={stickySelection ? { left: stickySelectionOffset } : undefined}
      >
        <CheckboxInput
          {...selection.getRowCheckboxProps(
            rowId,
            tableItems.itemDetails.get(rowId)?.rowData,
          )}
          compact
        />
      </DataTableTd>
    );
  }

  if (selection.mode === "single" && location === "tbody") {
    return (
      <DataTableTd
        cellType="action"
        isSticky={stickySelection && "start"}
        style={stickySelection ? { left: stickySelectionOffset } : undefined}
      >
        <RadioInput
          {...selection.getRowRadioProps(
            rowId,
            tableItems.itemDetails.get(rowId)?.rowData,
          )}
        />
      </DataTableTd>
    );
  }

  return null;
}

/* Utils */
function isInteractiveTarget(target: EventTarget | null): boolean {
  return !!(target as HTMLElement | null)?.closest(
    "a, button, input, select, textarea",
  );
}

export { DataTableTr, ACTION_CELL_WIDTH };
export type { DataTableTrProps };
