import React, { forwardRef } from "react";
import { cl } from "../../utils/helpers";

interface DropdownMenuGroupedListHeadingProps extends React.HTMLAttributes<HTMLDetailsElement> {
  /**
   * Heading
   */
  children: React.ReactNode;
}

const DropdownMenuGroupedListHeading = forwardRef<
  HTMLDetailsElement,
  DropdownMenuGroupedListHeadingProps
>(({ className, ...rest }, ref) => {
  return (
    <dt
      {...rest}
      ref={ref}
      className={cl(
        "aksel-dropdown__list-heading",
        "aksel-heading",
        "aksel-heading--xsmall",
        className,
      )}
    />
  );
});

export { DropdownMenuGroupedListHeading };
export type { DropdownMenuGroupedListHeadingProps };
