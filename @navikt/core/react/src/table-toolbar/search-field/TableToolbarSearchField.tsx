import React from "react";

type TableToolbarSearchFieldProps = React.HTMLAttributes<HTMLInputElement>;

const TableToolbarSearchField = React.forwardRef<
  HTMLInputElement,
  TableToolbarSearchFieldProps
>(({ className, ...props }, ref) => {
  return <input type="search" className={className} ref={ref} {...props} />;
});

export { TableToolbarSearchField };
export type { TableToolbarSearchFieldProps };
