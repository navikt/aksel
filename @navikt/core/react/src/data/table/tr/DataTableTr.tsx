import React, { forwardRef } from "react";
import { CheckboxInput } from "../../../form/checkbox/checkbox-input/CheckboxInput";
import { RadioInput } from "../../../form/radio/radio-input/RadioInput";
import { cl } from "../../../utils/helpers";
import {
  useDataTableContext,
  useDataTableLocation,
} from "../root/DataTableRoot.context";
import { DataTableTd } from "../td/DataTableTd";
import { DataTableTh } from "../th/DataTableTh";

type DataTableTrProps = React.HTMLAttributes<HTMLTableRowElement> & {
  selected?: boolean;
  /**
   * Unique identifier for the row, used for selection..
   */
  rowId?: string | number;
};

const DataTableTr = forwardRef<HTMLTableRowElement, DataTableTrProps>(
  ({ className, children, selected = false, rowId, ...rest }, forwardedRef) => {
    const { layout } = useDataTableContext();

    const renderFillerCell = layout === "fixed" && children;

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
 */
function RowSelectionCell({ rowId }: { rowId?: string | number }) {
  const { selectionState } = useDataTableContext();
  const { location } = useDataTableLocation();

  if (!selectionState || selectionState.selectionMode === "none") {
    return null;
  }

  if (selectionState.selectionMode === "multiple" && location === "thead") {
    return (
      <DataTableTh textAlign="center" width="50px" UNSAFE_isSelection>
        <CheckboxInput {...selectionState.getTheadCheckboxProps()} compact />
      </DataTableTh>
    );
  }

  if (selectionState.selectionMode === "single" && location === "thead") {
    return (
      <DataTableTh width="50px" UNSAFE_isSelection data-block-keyboard-nav />
    );
  }

  if (!rowId) {
    return null;
  }

  if (selectionState.selectionMode === "multiple" && location === "tbody") {
    return (
      <DataTableTd align="center" width="50px" UNSAFE_isSelection>
        <CheckboxInput {...selectionState.getRowCheckboxProps(rowId)} compact />
      </DataTableTd>
    );
  }

  if (selectionState.selectionMode === "single" && location === "tbody") {
    return (
      <DataTableTd width="50px" UNSAFE_isSelection>
        <RadioInput {...selectionState.getRowRadioProps(rowId)} />
      </DataTableTd>
    );
  }

  return null;
}

export { DataTableTr };
export type { DataTableTrProps };
