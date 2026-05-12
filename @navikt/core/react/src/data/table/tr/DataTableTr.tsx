import React, { forwardRef } from "react";
import {
  ChevronDownUpIcon,
  ChevronUpDownIcon,
  MinusIcon,
  PlusIcon,
} from "@navikt/aksel-icons";
import { Button } from "../../../button";
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
import { useTableItemsContext } from "../hooks/useTableItems";
import {
  useDataTableContext,
  useDataTableLocation,
} from "../root/DataTableRoot.context";
import { DataTableTd } from "../td/DataTableTd";

const SELECTION_CELL_WIDTH = "50px";

type DataTableTrProps = React.HTMLAttributes<HTMLTableRowElement> & {
  selected?: boolean;
  /**
   * Unique identifier for the row, used for selection..
   */
  rowId?: string | number;
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
    const { layout, stickyHeader, selectionState, onRowClick } =
      useDataTableContext();
    const { location } = useDataTableLocation();
    const { itemDetails } = useTableItemsContext();

    const renderFillerCell = layout === "fixed" && children;

    const selected =
      selectionState.selection.isRowSelected(rowId ?? "") ?? selectedProp;

    const isSticky = location === "thead" && stickyHeader;

    const handleClick =
      location === "tbody" && rowId !== undefined
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

            const selection = window.getSelection();
            if (selection && selection.toString().length > 0) {
              return;
            }

            if (
              !selectionState.disableRowSelectionOnClick &&
              selectionState.selection.selectionMode !== "none"
            ) {
              const rowData = itemDetails.get(rowId)?.rowData;

              if (!rowData) {
                consoleWarning(
                  `No row data found for rowId ${rowId}. This may cause issues with selection if disableRowSelection is used.`,
                );
              }
              selectionState.selection.toggleSelection(rowId, rowData);
            }
            onRowClick?.(rowId, event);
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
        data-sticky={isSticky || undefined}
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

function RowExpansionCell({ rowId }: { rowId?: string | number }) {
  const { tableId, showLoadingSkeletons } = useDataTableContext();
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

  if (showLoadingSkeletons) {
    if (location === "thead") {
      return (
        <DataTableColumnHeader
          width={SELECTION_CELL_WIDTH}
          UNSAFE_isSelection
          data-block-keyboard-nav
          label=""
          /* isSticky={stickySelection && "start"} */
        />
      );
    }
    return (
      <DataTableBaseCell as="td">
        <Skeleton variant="text" />
      </DataTableBaseCell>
    );
  }

  if (location === "thead" && !showExpandAll) {
    return (
      <DataTableColumnHeader
        width={SELECTION_CELL_WIDTH}
        UNSAFE_isSelection
        data-block-keyboard-nav
        label=""
        /* isSticky={stickySelection && "start"} */
      />
    );
  }

  if (location === "thead") {
    return (
      <DataTableColumnHeader
        textAlign="center"
        width={SELECTION_CELL_WIDTH}
        UNSAFE_isSelection
        label=""
        /* isSticky={stickySelection && "start"} */
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
    return <DataTableTd UNSAFE_isSelection preventRowClick />;
  }

  return (
    <DataTableTd UNSAFE_isSelection preventRowClick>
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
function RowSelectionCell({ rowId }: { rowId?: string | number }) {
  const { selectionState, stickySelection, showLoadingSkeletons } =
    useDataTableContext();
  const { location } = useDataTableLocation();
  const { itemDetails } = useTableItemsContext();
  const inputId = useId();

  const { selection, renderSelection } = selectionState;

  if (selection.selectionMode === "none" || !renderSelection) {
    return null;
  }

  if (showLoadingSkeletons) {
    if (location === "thead") {
      return (
        <DataTableColumnHeader
          width={SELECTION_CELL_WIDTH}
          UNSAFE_isSelection
          label=""
          data-block-keyboard-nav
          isSticky={stickySelection && "start"}
        />
      );
    }

    return (
      <DataTableBaseCell as="td">
        <Skeleton variant="text" />
      </DataTableBaseCell>
    );
  }

  /* TODO: A11y support */
  if (selection.selectionMode === "multiple" && location === "thead") {
    const theadCheckboxProps = selection.getTheadCheckboxProps();

    let labelText = "Velg alle synlige rader";
    if (theadCheckboxProps.checked) {
      labelText = "Fjern alle synlige valgte rader";
    }

    return (
      <DataTableColumnHeader
        textAlign="center"
        width={SELECTION_CELL_WIDTH}
        UNSAFE_isSelection
        label=""
        isSticky={stickySelection && "start"}
      >
        <Label htmlFor={inputId} visuallyHidden>
          {labelText}
        </Label>
        <CheckboxInput {...theadCheckboxProps} id={inputId} compact />
      </DataTableColumnHeader>
    );
  }

  if (selection.selectionMode === "single" && location === "thead") {
    return (
      <DataTableColumnHeader
        width={SELECTION_CELL_WIDTH}
        UNSAFE_isSelection
        label=""
        data-block-keyboard-nav
        isSticky={stickySelection && "start"}
      />
    );
  }

  if (rowId == null) {
    return null;
  }

  if (selection.selectionMode === "multiple" && location === "tbody") {
    return (
      <DataTableTd UNSAFE_isSelection isSticky={stickySelection && "start"}>
        <CheckboxInput
          {...selection.getRowCheckboxProps(
            rowId,
            itemDetails.get(rowId)?.rowData,
          )}
          compact
        />
      </DataTableTd>
    );
  }

  if (selection.selectionMode === "single" && location === "tbody") {
    return (
      <DataTableTd UNSAFE_isSelection isSticky={stickySelection && "start"}>
        <RadioInput
          {...selection.getRowRadioProps(
            rowId,
            itemDetails.get(rowId)?.rowData,
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

export { DataTableTr };
export type { DataTableTrProps };
