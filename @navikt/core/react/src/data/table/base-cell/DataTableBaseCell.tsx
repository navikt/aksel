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
  rowSpan?: number;
  /**
   * Temp hack to solve overflow and alignment
   */
  UNSAFE_isSelection?: boolean;
  /**
   * Sets a max-width on the content wrapper div inside the cell.
   * This is only needed when using `layout="auto"` together with
   * `truncateContent` on `<DataTable>` and you want the cell to be truncated.
   */
  contentMaxWidth?: number | `${number}${string}`;
}

const DataTableBaseCell = forwardRef<
  HTMLTableCellElement,
  DataTableBaseCellProps & {
    /**
     * Cell type
     */
    as: "th" | "td";
  }
>(
  (
    {
      className,
      children,
      as: Component,
      textAlign = "left",
      colSpan,
      UNSAFE_isSelection,
      contentMaxWidth,
      rowSpan,
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
        rowSpan={rowSpan}
      >
        <div style={{ maxWidth: contentMaxWidth }}>{children}</div>
      </Component>
    );
  },
);

export { DataTableBaseCell };
export type { DataTableBaseCellProps };
