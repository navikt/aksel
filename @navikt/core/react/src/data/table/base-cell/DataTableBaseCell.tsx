import React, { forwardRef } from "react";
import { cl } from "../../../utils/helpers";
import { useDataTableContext } from "../root/DataTableRoot.context";

interface DataTableBaseCellProps extends Omit<
  React.TdHTMLAttributes<HTMLTableCellElement>,
  "width"
> {
  /**
   * Text alignment inside cell.
   *
   * Quantitative figures like amounts and percentages should be right‑aligned (but not phone numbers, postal codes etc.)
   * @default "left"
   */
  align?: "left" | "center" | "right";
  /**
   * Internal cell type that controls padding, alignment, row-click prevention, and resize behavior.
   * - `"action"`: Centers content, removes cell padding, prevents row click, and disables column resize.
   *    Used for selection (checkbox/radio) and expansion (expand/collapse) cells.
   */
  cellType?: "action";
  /**
   * When true, clicking this cell will not trigger `onRowAction` on the row.
   * Useful for cells that contain their own interactive content or actions
   * that should be independent of row-level click handling.
   */
  preventRowClick?: boolean;
  /**
   * Sets a max-width on the content wrapper div inside the cell.
   * This is only needed when using `layout="auto"` together with
   * `truncateContent` on `<DataGrid.Table>` and you want the cell to be truncated.
   */
  contentMaxWidth?: number | string;
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
    /**
     * Content to render before the main cell content.
     *
     * **WARNING: Adding content here that takes up space will probably break auto-resizing!**
     */
    beforeContent?: React.ReactNode;
  }
>(
  (
    {
      className,
      children,
      as: Component,
      beforeContent,
      align = "left",
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
        data-align={align}
        data-cell-type={cellType || undefined}
        data-prevent-row-click={
          preventRowClick || cellType === "action" || undefined
        }
        data-sticky={isSticky || undefined}
        colSpan={colSpan}
        rowSpan={rowSpan}
      >
        {beforeContent}
        <div
          className="aksel-data-table__cell-content"
          style={{ maxWidth: contentMaxWidth }}
        >
          {children}
        </div>
      </Component>
    );
  },
);

export { DataTableBaseCell };
export type { DataTableBaseCellProps };
