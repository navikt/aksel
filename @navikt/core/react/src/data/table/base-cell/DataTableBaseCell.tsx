import React, { forwardRef } from "react";
import { cl } from "../../../utils/helpers";
import { useDataTableContext } from "../root/DataTableRoot.context";

interface DataTableBaseCellProps extends React.HTMLAttributes<HTMLTableCellElement> {
  /**
   * Content alignment inside cell
   * @default "left"
   */
  textAlign?: "left" | "center" | "right";
  /**
   * TODO: Shouldnt be needed to declare these here... But getting type-errors if not
   */
  colSpan?: number;
  /**
   * Cell type
   */
  as: "th" | "td";
  /**
   * Temp hack to solve overflow and alignment
   */
  UNSAFE_isSelection?: boolean;
}

const DataTableBaseCell = forwardRef<
  HTMLTableCellElement,
  DataTableBaseCellProps
>(
  (
    {
      className,
      children,
      as: Component,
      textAlign = "left",
      colSpan,
      UNSAFE_isSelection,
      ...rest
    },
    forwardedRef,
  ) => {
    const { withKeyboardNav } = useDataTableContext();

    return (
      <Component
        {...rest}
        ref={forwardedRef}
        className={cl("aksel-data-table__cell", className)}
        tabIndex={withKeyboardNav ? -1 : undefined}
        data-align={textAlign}
        data-selectable={UNSAFE_isSelection}
        colSpan={colSpan}
      >
        <div>{children}</div>
      </Component>
    );
  },
);

export { DataTableBaseCell };
export type { DataTableBaseCellProps };
