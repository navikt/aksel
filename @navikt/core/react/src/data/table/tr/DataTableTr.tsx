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
import { cl } from "../../../utils/helpers";
import { DataTableBaseCell } from "../base-cell/DataTableBaseCell";
import { DataTableColumnHeader } from "../column-header/DataTableColumnHeader";
import { useDataTableExpansion } from "../hooks/useTableExpansion";
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
    { className, children, selected: selectedProp = false, rowId, ...rest },
    forwardedRef,
  ) => {
    const { layout, stickyHeader } = useDataTableContext();
    const { selectionState } = useDataTableContext();
    const { location } = useDataTableLocation();

    const renderFillerCell = layout === "fixed" && children;

    const selected =
      selectionState?.selection.isRowSelected(rowId ?? "") ?? selectedProp;

    const isSticky = location === "thead" && stickyHeader;

    return (
      <tr
        {...rest}
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
  const {
    isExpanded,
    toggleExpansion,
    enableExpansion,
    isAllExpanded,
    toggleAll,
    showExpandAll,
  } = useDataTableExpansion();
  const { tableId, showLoadingSkeletons } = useDataTableContext();
  const { location } = useDataTableLocation();

  if (!enableExpansion) {
    return null;
  }

  if (showLoadingSkeletons) {
    if (location === "thead") {
      return (
        <DataTableColumnHeader
          width={SELECTION_CELL_WIDTH}
          UNSAFE_isSelection
          data-block-keyboard-nav
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

  return (
    <DataTableTd UNSAFE_isSelection>
      <Button
        variant="tertiary"
        data-color="neutral"
        size="xsmall"
        onClick={(e) => {
          e.stopPropagation();
          toggleExpansion(rowId);
        }}
        aria-expanded={isRowExpanded}
        aria-controls={`${tableId}-expansion-${rowId}`}
        aria-label={isRowExpanded ? "Skjul detaljer" : "Vis detaljer"}
        icon={
          isRowExpanded ? <MinusIcon aria-hidden /> : <PlusIcon aria-hidden />
        }
      />
    </DataTableTd>
  );
}

/**
 * TODO: How do these cells handle multiple thead rows, or col/rowspans?
 * TODO: a11y for labels
 */
function RowSelectionCell({ rowId }: { rowId?: string | number }) {
  const { selectionState, stickySelection, showLoadingSkeletons } =
    useDataTableContext();
  const { location } = useDataTableLocation();
  const inputId = useId();

  if (!selectionState) {
    return null;
  }

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
        <CheckboxInput {...selection.getRowCheckboxProps(rowId)} compact />
      </DataTableTd>
    );
  }

  if (selection.selectionMode === "single" && location === "tbody") {
    return (
      <DataTableTd UNSAFE_isSelection isSticky={stickySelection && "start"}>
        <RadioInput {...selection.getRowRadioProps(rowId)} />
      </DataTableTd>
    );
  }

  return null;
}

export { DataTableTr };
export type { DataTableTrProps };
