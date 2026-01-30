import React from "react";

type DataFilterItemProps = React.HTMLAttributes<HTMLDivElement>;

const DataFilterItem = React.forwardRef<HTMLDivElement, DataFilterItemProps>(
  ({ className, ...props }, ref) => {
    return <div className={className} ref={ref} {...props} />;
  },
);

export { DataFilterItem };
export type { DataFilterItemProps };
