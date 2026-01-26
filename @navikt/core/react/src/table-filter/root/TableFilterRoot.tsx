import React from "react";
import TableFilterItem from "../item/TableFilterItem";

interface TableFilterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface TableFilterRootComponent
  extends React.ForwardRefExoticComponent<
    TableFilterProps & React.RefAttributes<HTMLDivElement>
  > {
  /**
   * @see 🏷️ {@link TableFilterItem} // TODO doesnt work
   * @example
   * ```tsx
   * <TableFilter>
   *   <TableFilter.Item />
   *   <TableFilter.Item />
   *   <TableFilter.Item />
   * </TableFilter>
   * ```
   */
  Item: typeof TableFilterItem;
}

const TableFilter = React.forwardRef<HTMLDivElement, TableFilterProps>(
  ({ children, ...rest }, forwardRef) => {
    return (
      <div ref={forwardRef} {...rest}>
        {children}
      </div>
    );
  },
) as TableFilterRootComponent;

TableFilter.Item = TableFilterItem;

export { TableFilter };
export default TableFilter;
export type { TableFilterProps };
