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
    const { layout } = useDataTableContext();
    const { selectionState } = useDataTableContext();

    const renderFillerCell = layout === "fixed" && children;

    const selected = selectionState?.isRowSelected(rowId ?? "") ?? selectedProp;

    return (
      <tr
        {...rest}
        ref={forwardedRef}
        className={cl("aksel-data-table__tr", className)}
        data-selected={selected}
      >
        <RowSelectionCell rowId={rowId} />
        {children}
        {renderFillerCell && (
          /* Using div causes illegal dom structure */
          <td
            aria-hidden
            className="aksel-data-table__cell"
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
  const { selectionState, dataLength, stickySelection } = useDataTableContext();
  const { location } = useDataTableLocation();
  const inputId = useId();

  if (
    !selectionState ||
    selectionState.selectionMode === "none" ||
    dataLength === 0
  ) {
    return null;
  }

  /* TODO: A11y support */
  if (selectionState.selectionMode === "multiple" && location === "thead") {
    const theadCheckboxProps = selectionState.getTheadCheckboxProps();

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

  if (selectionState.selectionMode === "single" && location === "thead") {
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

  if (selectionState.selectionMode === "multiple" && location === "tbody") {
    return (
      <DataTableTd UNSAFE_isSelection isSticky={stickySelection && "start"}>
        <CheckboxInput {...selectionState.getRowCheckboxProps(rowId)} compact />
      </DataTableTd>
    );
  }

  if (selectionState.selectionMode === "single" && location === "tbody") {
    return (
      <DataTableTd UNSAFE_isSelection isSticky={stickySelection && "start"}>
        <RadioInput {...selectionState.getRowRadioProps(rowId)} />
      </DataTableTd>
    );
  }

  return null;
}

export { DataTableTr };
export type { DataTableTrProps };
