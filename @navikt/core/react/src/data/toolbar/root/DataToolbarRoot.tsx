import React from "react";
import { cl } from "../../../utils/helpers";
import {
  DataToolbarSearchField,
  type DataToolbarSearchFieldProps,
} from "../search-field/DataToolbarSearchField";
import DataToolbarToggleButton, {
  type DataToolbarToggleButtonProps,
} from "../toggle-button/DataToggleButton";

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
  /**
   * @see 🏷️ {@link DataToolbarToggleButtonProps}
   * @example
   * ```tsx
   * <DataToolbar>
   *   <DataToolbar.ToggleButton />
   * </DataToolbar>
   * ```
   */
  ToggleButton: typeof DataToolbarToggleButton;
}

const DataToolbar = React.forwardRef<HTMLDivElement, DataToolbarProps>(
  ({ children, className, ...rest }, forwardRef) => {
    return (
      <div
        ref={forwardRef}
        {...rest}
        className={cl("aksel-data-toolbar", className)}
        role="toolbar"
      >
        {children}
      </div>
    );
  },
) as DataToolbarRootComponent;

DataToolbar.SearchField = DataToolbarSearchField;
DataToolbar.ToggleButton = DataToolbarToggleButton;

export { DataToolbar, DataToolbarSearchField, DataToolbarToggleButton };
export default DataToolbar;
export type {
  DataToolbarProps,
  DataToolbarSearchFieldProps,
  DataToolbarToggleButtonProps,
};
