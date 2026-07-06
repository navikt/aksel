import React, { forwardRef } from "react";
import { cl } from "../../../utils/helpers";
import DataToolbarButton, {
  type DataToolbarButtonProps,
} from "../button/DataToolbarButton";
import {
  DataToolbarSearchField,
  type DataToolbarSearchFieldProps,
} from "../search-field/DataToolbarSearchField";
import DataToolbarToggleButton, {
  type DataToolbarToggleButtonProps,
} from "../toggle-button/DataToolbarToggleButton";

interface DataToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: never;
  renderInput?: React.ReactNode;
  renderPreferences?: React.ReactNode;
  renderPagination?: React.ReactNode;
}

interface DataToolbarRootComponent extends React.ForwardRefExoticComponent<
  DataToolbarProps & React.RefAttributes<HTMLDivElement>
> {
  /**
   * @see 🏷️ {@link DataToolbarButtonProps}
   * @example
   * ```tsx
   * <DataToolbar>
   *   <DataToolbar.Button />
   * </DataToolbar>
   * ```
   */
  Button: typeof DataToolbarButton;
}

const DataToolbar = forwardRef<HTMLDivElement, DataToolbarProps>(
  (
    { className, renderInput, renderPreferences, renderPagination, ...rest },
    forwardedRef,
  ) => {
    return (
      <div
        ref={forwardedRef}
        {...rest}
        className={cl("aksel-data-toolbar", className)}
        role="toolbar"
      >
        {renderInput && (
          <div className="aksel-data-toolbar__input">{renderInput}</div>
        )}

        <div className="aksel-data-toolbar__actions">
          {renderPagination && (
            <div className="aksel-data-toolbar__pagination">
              {renderPagination}
            </div>
          )}
          {renderPreferences && (
            <div className="aksel-data-toolbar__preferences">
              {renderPreferences}
            </div>
          )}
        </div>
      </div>
    );
  },
) as DataToolbarRootComponent;

DataToolbar.Button = DataToolbarButton;

export {
  DataToolbar,
  DataToolbarButton,
  DataToolbarSearchField,
  DataToolbarToggleButton,
};
export default DataToolbar;
export type {
  DataToolbarButtonProps,
  DataToolbarProps,
  DataToolbarSearchFieldProps,
  DataToolbarToggleButtonProps,
};
