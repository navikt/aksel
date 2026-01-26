import React from "react";
import { TableToolbarSearchField } from "../search-field/TableToolbarSearchField";

interface ToolbarRootProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface TableToolbarRootComponent
  extends React.ForwardRefExoticComponent<
    ToolbarRootProps & React.RefAttributes<HTMLDivElement>
  > {
  /**
   * @see 🏷️ {@link TableToolbarSearchFieldProps} // TODO doesnt work
   * @example
   * ```tsx
   * <TableToolbar>
   *   <TableToolbar.SearchField />
   * </TableToolbar>
   * ```
   */
  SearchField: typeof TableToolbarSearchField;
}

const TableToolbar = React.forwardRef<HTMLDivElement, ToolbarRootProps>(
  ({ children, ...rest }, forwardRef) => {
    return (
      <div ref={forwardRef} {...rest}>
        {children}
      </div>
    );
  },
) as TableToolbarRootComponent;

export { TableToolbar };
export default TableToolbar;
export type { ToolbarRootProps };
