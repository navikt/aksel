import React, { forwardRef } from "react";
import { cl } from "../../../utils/helpers";
import { useDataTableContext } from "../root/DataTableRoot.context";

interface DataTableTdProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  /**
   * Sets a max-width on the content wrapper div inside the cell.
   * This is only needed when using `layout="auto"` together with
   * `truncateContent` on `<DataTable>` and you want the cell to be truncated.
   */
  contentMaxWidth?: number | `${number}${string}`;
  /**
   * TODO: Consider a prop like this instead of contentMaxWidth to use together with layout=auto.
   * Maybe even with layout=auto as a way to override truncateContent on single cells?
   * Need to work on the name though. Or maybe have two separate props?
   */
  //textWrap?: boolean | number | `${number}${string}`;
  /**
   * Content alignment inside cell
   * @default "left"
   */
  textAlign?: "left" | "center" | "right";
  /**
   * Temp hack to solve overflow and alignment
   */
  UNSAFE_isSelection?: boolean;
}

const DataTableTd = forwardRef<HTMLTableCellElement, DataTableTdProps>(
  (
    {
      className,
      children,
      contentMaxWidth,
      textAlign = "left",
      UNSAFE_isSelection,
      ...rest
    },
    forwardedRef,
  ) => {
    const { withKeyboardNav } = useDataTableContext();

    return (
      <td
        {...rest}
        ref={forwardedRef}
        className={cl("aksel-data-table__td", className, {
          "aksel-data-table--UNSAFE_isSelection": UNSAFE_isSelection,
        })}
        tabIndex={withKeyboardNav ? -1 : undefined}
        data-align={textAlign}
      >
        <div style={{ maxWidth: contentMaxWidth }}>{children}</div>
      </td>
    );
  },
);

export { DataTableTd };
export type { DataTableTdProps };
