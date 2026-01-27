import React, { forwardRef } from "react";
import { cl } from "../../utils/helpers";

type DataTableTbodyProps = React.HTMLAttributes<HTMLTableSectionElement>;

const DataTableTbody = forwardRef<HTMLTableSectionElement, DataTableTbodyProps>(
  ({ className, ...rest }, forwardedRef) => {
    return (
      <tbody
        {...rest}
        ref={forwardedRef}
        className={cl("aksel-data-table__tbody", className)}
      />
    );
  },
);

export { DataTableTbody };
export type { DataTableTbodyProps };
