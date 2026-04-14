import React, { forwardRef } from "react";
import { CheckboxInput } from "../../../form/checkbox/checkbox-input/CheckboxInput";
import { RadioInput } from "../../../form/radio/radio-input/RadioInput";
import { Label } from "../../../typography";
import { useId } from "../../../utils-external";
import { cl } from "../../../utils/helpers";
import { DataTableColumnHeader } from "../column-header/DataTableColumnHeader";
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

/**
 * TODO: How do these cells handle multiple thead rows, or col/rowspans?
 * TODO: a11y for labels
 */
function RowSelectionCell({ rowId }: { rowId?: string | number }) {
  const { selectionState, stickySelection } = useDataTableContext();
  const { location } = useDataTableLocation();
  const inputId = useId();

  if (!selectionState) {
    return null;
  }

  const { selection, renderSelection } = selectionState;

  if (selection.selectionMode === "none" || !renderSelection) {
    return null;
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
