import React, { forwardRef } from "react";
import Checkbox from "../../../form/checkbox/Checkbox";
import { cl } from "../../../utils/helpers";
import { useDataTableContext } from "../root/DataTableRoot.context";
import { DataTableTd } from "../td/DataTableTd";
import { useDataTableThead } from "../thead/DataTableThead.context";

type DataTableTrProps = React.HTMLAttributes<HTMLTableRowElement> & {
  selected?: boolean;
  /**
   * Used for selection.
   */
  value?: string;
};

const DataTableTr = forwardRef<HTMLTableRowElement, DataTableTrProps>(
  ({ className, children, selected = false, value, ...rest }, forwardedRef) => {
    const { layout, selectionMode } = useDataTableContext();

    const renderFillerCell = layout === "fixed" && children;

    return (
      <tr
        {...rest}
        ref={forwardedRef}
        className={cl("aksel-data-table__tr", className, {
          "aksel-data-table__tr--selected": selected,
        })}
      >
        {selectionMode !== "none" && <SelectionCell value={value} />}
        {children}
        {renderFillerCell && (
          /* TODO: Consider chaning between th and td based on context */
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

type SelectionCellProps = {
  value?: string;
};

function SelectionCell({ value }: SelectionCellProps) {
  const { handleSelectionChange, selectedKeys } = useDataTableContext();
  const isInThead = useDataTableThead();

  if (!value && !isInThead) {
    throw new Error("Value is required for selection cells");
  }

  const handleChange = () => {
    isInThead
      ? handleSelectionChange("all")
      : handleSelectionChange({ value: value! });
  };

  const checkedState = () => {
    if (isInThead) {
      return false;
    }
    if (selectedKeys === "all") {
      return true;
    }
    return selectedKeys.includes(value!);
  };

  return (
    <DataTableTd align="center" width="60px">
      <Checkbox hideLabel onChange={handleChange} checked={checkedState()}>
        {" "}
      </Checkbox>
    </DataTableTd>
  );
}

export { DataTableTr };
export type { DataTableTrProps };
