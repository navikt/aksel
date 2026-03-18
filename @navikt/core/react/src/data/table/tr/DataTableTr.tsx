import React, { forwardRef } from "react";
import Checkbox from "../../../form/checkbox/Checkbox";
import { useClientLayoutEffect } from "../../../utils-external";
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
    const { layout, selectionMode, register, unRegister } =
      useDataTableContext();

    const renderFillerCell = layout === "fixed" && children;

    useClientLayoutEffect(() => {
      if (!value || selectionMode === "none") {
        return;
      }

      register(value);

      return () => {
        unRegister(value);
      };
    }, [register, selectionMode, unRegister, value]);

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
  const { handleSelectionChange, selectedKeys, disabledKeys, values } =
    useDataTableContext();
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
      const allKeys = Array.from(values);

      if (selectedKeys === "all") {
        return true;
      }

      if (selectedKeys.every((id) => allKeys.includes(id))) {
        return true;
      }

      if (selectedKeys.length === 0) {
        return false;
      }
      return "indeterminate";
    }

    const isDisabled = disabledKeys?.includes(value!);

    if (isDisabled) {
      return false;
    }

    if (selectedKeys === "all") {
      return true;
    }

    return selectedKeys.includes(value!);
  };

  const checked = checkedState();

  return (
    <DataTableTd align="center" width="60px">
      <Checkbox
        hideLabel
        onChange={handleChange}
        checked={checked === "indeterminate" ? false : checked}
        indeterminate={checked === "indeterminate"}
        disabled={disabledKeys?.includes(value!)}
      >
        {" "}
      </Checkbox>
    </DataTableTd>
  );
}

export { DataTableTr };
export type { DataTableTrProps };
