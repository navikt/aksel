import React, { forwardRef } from "react";
import { cl } from "../../utils/helpers";

type BodyProps = React.HTMLAttributes<HTMLTableSectionElement>;

const TableBody = forwardRef<HTMLTableSectionElement, BodyProps>(
  ({ className, ...rest }, ref) => {
    return (
      <tbody
        {...rest}
        ref={ref}
        className={cl("aksel-table__body", className)}
      />
    );
  },
);

export { TableBody };
export type { BodyProps };
