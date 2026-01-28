import React from "react";

type DataToolbarSearchFieldProps = React.HTMLAttributes<HTMLInputElement>;

const DataToolbarSearchField = React.forwardRef<
  HTMLInputElement,
  DataToolbarSearchFieldProps
>(({ className, ...props }, ref) => {
  return <input type="search" className={className} ref={ref} {...props} />;
});

export { DataToolbarSearchField };
export default DataToolbarSearchField;
export type { DataToolbarSearchFieldProps };
