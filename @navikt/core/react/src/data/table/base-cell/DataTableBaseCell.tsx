import React, { forwardRef } from "react";
import { cl } from "../../../utils/helpers";
import { useDataTableContext } from "../root/DataTableRoot.context";

interface DataTableBaseCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  /**
   * Content alignment inside cell.
   *
   * Quantitative figures like amounts and percentages should be right‑aligned (but not phone numbers, postal codes etc.)
   * @default "left"
   */
  textAlign?: "left" | "center" | "right";
  /**
   * Internal cell type that controls padding, alignment, row-click prevention, and resize behavior.
   * - `"action"`: Centers content, removes cell padding, prevents row click, and disables column resize.
   *    Used for selection (checkbox/radio) and expansion (expand/collapse) cells.
   */
  cellType?: "action";
  /**
   * When true, clicking this cell will not trigger `onRowClick` on the row.
   * Useful for cells that contain their own interactive content or actions
   * that should be independent of row-level click handling.
   */
  preventRowClick?: boolean;
  /**
   * Sets a max-width on the content wrapper div inside the cell.
   * This is only needed when using `layout="auto"` together with
   * `truncateContent` on `<DataTable>` and you want the cell to be truncated.
   */
  contentMaxWidth?: number | `${number}${string}`; // TODO: Consider just `number | string` so that we can support CSS functions like var(), calc()
  /**
   * Makes the cell sticky.
   */
  isSticky?: "start" | "end" | false;
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
      cellType,
      preventRowClick,
      contentMaxWidth,
      isSticky,
      colSpan,
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
        data-cell-type={cellType || undefined}
        data-prevent-row-click={
          preventRowClick || cellType === "action" || undefined
        }
        data-sticky={isSticky || undefined}
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
