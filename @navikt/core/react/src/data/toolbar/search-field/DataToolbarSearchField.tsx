import React from "react";
import { Search, type SearchProps } from "../../../form/search";
import type { SearchNativeProps } from "../../../form/search/Search";

type DataToolbarSearchFieldProps = Omit<SearchNativeProps, "data-color"> &
  Pick<SearchProps, "label" | "onChange">; // TODO: Vurder om label skal hardkodes (bør jo samsvare med placeholder...)

const DataToolbarSearchField = React.forwardRef<
  HTMLInputElement,
  DataToolbarSearchFieldProps
>(({ className, ...props }, ref) => {
  // We need the wrapper because Search has width:100%
  return (
    <div>
      <Search
        className={className}
        ref={ref}
        {...props}
        variant="simple"
        size="small"
        htmlSize="12"
        placeholder="Hurtigfilter" // TODO: Oversett, og vurder om skal være overstyrbart
      />
    </div>
  );
});

export { DataToolbarSearchField };
export default DataToolbarSearchField;
export type { DataToolbarSearchFieldProps };
