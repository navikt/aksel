import React, { forwardRef, version } from "react";
import { useDataGridContext } from "../../../data-grid/root/DataGridRoot.context";
import { cl } from "../../../utils/helpers";
import {
  DataTableLocationProvider,
  useDataTableContext,
} from "../root/DataTableRoot.context";

type DataTableTbodyProps = React.HTMLAttributes<HTMLTableSectionElement>;

const inertValue = parseInt(version.split(".")[0], 10) > 18 ? true : ""; // Support for inert was added in React 19

const DataTableTbody = forwardRef<HTMLTableSectionElement, DataTableTbodyProps>(
  ({ className, ...rest }, forwardedRef) => {
    const { isLoading } = useDataGridContext();
    const { loading } = useDataTableContext();
    return (
      <DataTableLocationProvider location="tbody">
        <tbody
          {...rest}
          ref={forwardedRef}
          className={cl("aksel-data-table__tbody", className)}
          // @ts-expect-error - inert is not yet recognized by React's type definitions, but we want to use it for better accessibility when showing the loading overlay.
          inert={
            isLoading && loading?.variant === "overlay" ? inertValue : false
          }
        />
      </DataTableLocationProvider>
    );
  },
);

export { DataTableTbody };
export type { DataTableTbodyProps };
