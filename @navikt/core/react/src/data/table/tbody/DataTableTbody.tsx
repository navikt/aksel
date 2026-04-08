import React, { forwardRef } from "react";
import { cl } from "../../../utils/helpers";
import { DataTableLocationProvider } from "../root/DataTableRoot.context";

type DataTableTbodyProps = React.HTMLAttributes<HTMLTableSectionElement>;

const DataTableTbody = forwardRef<HTMLTableSectionElement, DataTableTbodyProps>(
  ({ className, ...rest }, forwardedRef) => {
    return (
      <DataTableLocationProvider location="tbody">
        <tbody
          {...rest}
          ref={forwardedRef}
          className={cl("aksel-data-table__tbody", className)}
        />
      </DataTableLocationProvider>
    );
  },
);

export { DataTableTbody };
export type { DataTableTbodyProps };
