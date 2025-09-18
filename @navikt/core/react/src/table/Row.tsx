import React, { forwardRef } from "react";
import { useRenameCSS } from "../theme/Theme";
import { composeEventHandlers } from "../util/composeEventHandlers";
import { isElementInteractiveTarget } from "./Table.utils";

export interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  /**
   * Row is selected
   * @default false
   */
  selected?: boolean;
  /**
   * Shade the table row on hover.
   * @default true
   */
  shadeOnHover?: boolean;
  /**
   * Click handler for row. This differs from onClick by not being called
   * when clicking on interactive elements within the row (buttons, links, inputs etc).
   */
  onRowClick?: (event: React.MouseEvent<HTMLTableRowElement>) => void;
}

export type RowType = React.ForwardRefExoticComponent<
  RowProps & React.RefAttributes<HTMLTableRowElement>
>;

export const Row: RowType = forwardRef(
  (
    {
      className,
      selected = false,
      shadeOnHover = true,
      onClick,
      onRowClick,
      ...rest
    },
    ref,
  ) => {
    const { cn } = useRenameCSS();

    const handleRowClick = (event: React.MouseEvent<HTMLTableRowElement>) => {
      if (!onRowClick) {
        return;
      }
      if (isElementInteractiveTarget(event.target as HTMLElement)) {
        return;
      }
      onRowClick(event);
    };

    return (
      <tr
        {...rest}
        ref={ref}
        className={cn("navds-table__row", className, {
          "navds-table__row--selected": selected,
          "navds-table__row--shade-on-hover": shadeOnHover,
        })}
        onClick={composeEventHandlers(onClick, handleRowClick)}
      />
    );
  },
);

export default Row;
