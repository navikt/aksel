import React, { forwardRef } from "react";
import { cl } from "../../utils/helpers";

type DataTableCaptionProps = React.HTMLAttributes<HTMLTableCaptionElement>;

const DataTableCaption = forwardRef<
  HTMLTableCaptionElement,
  DataTableCaptionProps
>(({ className, ...rest }, forwardedRef) => {
  return (
    <caption
      {...rest}
      ref={forwardedRef}
      className={cl("aksel-data-table__caption", className)}
    />
  );
});

export { DataTableCaption };
export type { DataTableCaptionProps };
