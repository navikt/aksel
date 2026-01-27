import React from "react";

type TableFilterItemProps = React.HTMLAttributes<HTMLDivElement>;

const TableFilterItem = React.forwardRef<HTMLDivElement, TableFilterItemProps>(
  ({ className, ...props }, ref) => {
    return <div className={className} ref={ref} {...props} />;
  },
);

export { TableFilterItem };
export default TableFilterItem;
export type { TableFilterItemProps };
