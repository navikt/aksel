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
   * Temp hack to solve overflow and alignment
   */
  UNSAFE_isSelection?: boolean;
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

/**
 * TODO:
 * - Need a "type" or something that centers content instead of relying on isSelection prop.
 * - Need a separate prop do disabled resizing instead of relying on isSelection prop.
 */
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
      UNSAFE_isSelection,
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
        data-selectable={UNSAFE_isSelection}
        data-prevent-row-click={
          preventRowClick || UNSAFE_isSelection || undefined
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
