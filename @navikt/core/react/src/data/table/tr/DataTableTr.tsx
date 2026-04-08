import React, { forwardRef } from "react";
import { CheckboxInput } from "../../../form/checkbox/checkbox-input/CheckboxInput";
import { RadioInput } from "../../../form/radio/radio-input/RadioInput";
import { Label } from "../../../typography";
import { useId } from "../../../utils-external";
import { cl } from "../../../utils/helpers";
import {
  useDataTableContext,
  useDataTableLocation,
} from "../root/DataTableRoot.context";
import { DataTableTd } from "../td/DataTableTd";
import { DataTableTh } from "../th/DataTableTh";

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
        className={cl("aksel-data-table__tr", className, {
          "aksel-data-table__tr--selected": selected,
        })}
      >
        <RowSelectionCell rowId={rowId} />
        {children}
        {renderFillerCell && (
          /* TODO: Consider changing between th and td based on context */
          /* using div causes illegal dom structure */
          <td
            aria-hidden
            className="aksel-data-table__th aksel-data-table__filler-cell"
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
  const { selectionState, dataLength } = useDataTableContext();
  const { location } = useDataTableLocation();
  const inputId = useId();

  if (
    !selectionState ||
    selectionState.selectionMode === "none" ||
    dataLength === 0
  ) {
    return null;
  }

  if (selectionState.selectionMode === "multiple" && location === "thead") {
    return (
      <DataTableTh
        textAlign="center"
        width={SELECTION_CELL_WIDTH}
        UNSAFE_isSelection
      >
        <Label htmlFor={inputId} visuallyHidden>
          Velg alle rader
        </Label>
        <CheckboxInput
          {...selectionState.getTheadCheckboxProps()}
          id={inputId}
          compact
        />
      </DataTableTh>
    );
  }

  if (selectionState.selectionMode === "single" && location === "thead") {
    return (
      <DataTableTh
        width={SELECTION_CELL_WIDTH}
        UNSAFE_isSelection
        data-block-keyboard-nav
      />
    );
  }

  if (!rowId) {
    return null;
  }

  if (selectionState.selectionMode === "multiple" && location === "tbody") {
    return (
      <DataTableTd
        align="center"
        width={SELECTION_CELL_WIDTH}
        UNSAFE_isSelection
      >
        <Label htmlFor={inputId} visuallyHidden>
          Velg rad
        </Label>
        <CheckboxInput
          {...selectionState.getRowCheckboxProps(rowId)}
          id={inputId}
          compact
        />
      </DataTableTd>
    );
  }

  if (selectionState.selectionMode === "single" && location === "tbody") {
    return (
      <DataTableTd width={SELECTION_CELL_WIDTH} UNSAFE_isSelection>
        <Label htmlFor={inputId} visuallyHidden>
          Velg rad
        </Label>
        <RadioInput {...selectionState.getRowRadioProps(rowId)} id={inputId} />
      </DataTableTd>
    );
  }

  return null;
}

export { DataTableTr };
export type { DataTableTrProps };
