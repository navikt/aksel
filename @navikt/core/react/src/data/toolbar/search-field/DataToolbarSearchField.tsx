import React from "react";
import { Search, type SearchProps } from "../../../form/search";

type DataToolbarSearchFieldProps = Omit<
  React.HTMLAttributes<HTMLInputElement>,
  "data-color" | "size" | "type"
> &
  Pick<SearchProps, "label" | "onChange">;

const DataToolbarSearchField = React.forwardRef<
  HTMLInputElement,
  DataToolbarSearchFieldProps
>(({ className, ...props }, ref) => {
  return (
    <Search
      className={className}
      ref={ref}
      {...props}
      variant="simple"
      size="small"
      htmlSize="12"
      placeholder="Quick filter"
    />
  );
});

export { DataToolbarSearchField };
export default DataToolbarSearchField;
export type { DataToolbarSearchFieldProps };
