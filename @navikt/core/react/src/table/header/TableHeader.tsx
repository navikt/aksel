import React, { forwardRef } from "react";
import { cl } from "../../utils/helpers";

type HeaderProps = React.HTMLAttributes<HTMLTableSectionElement>;

const TableHeader = forwardRef<HTMLTableSectionElement, HeaderProps>(
  ({ className, ...rest }, ref) => {
    return (
      <thead
        {...rest}
        ref={ref}
        className={cl("aksel-table__header", className)}
      />
    );
  },
);

export { TableHeader };
export type { HeaderProps };
