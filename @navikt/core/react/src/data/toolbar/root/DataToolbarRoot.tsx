import React from "react";
import {
  DataToolbarSearchField,
  type DataToolbarSearchFieldProps,
} from "../search-field/DataToolbarSearchField";

interface DataToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface DataToolbarRootComponent extends React.ForwardRefExoticComponent<
  DataToolbarProps & React.RefAttributes<HTMLDivElement>
> {
  /**
   * @see 🏷️ {@link DataToolbarSearchFieldProps}
   * @example
   * ```tsx
   * <DataToolbar>
   *   <DataToolbar.SearchField />
   * </DataToolbar>
   * ```
   */
  SearchField: typeof DataToolbarSearchField;
}

const DataToolbar = React.forwardRef<HTMLDivElement, DataToolbarProps>(
  ({ children, ...rest }, forwardRef) => {
    return (
      <div ref={forwardRef} {...rest}>
        {children}
      </div>
    );
  },
) as DataToolbarRootComponent;

DataToolbar.SearchField = DataToolbarSearchField;

export { DataToolbar, DataToolbarSearchField };
export default DataToolbar;
export type { DataToolbarProps, DataToolbarSearchFieldProps };
