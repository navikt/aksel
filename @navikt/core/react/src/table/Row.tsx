import React, { forwardRef } from "react";
import { composeEventHandlers } from "../util/composeEventHandlers";
import { cl } from "../utils/helpers";
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
   *
   * **Warning:** This will not be accessible by keyboard! Provide an alternative way to select the row, e.g. a checkbox or a button.
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
        className={cl("aksel-table__row", className, {
          "aksel-table__row--selected": selected,
          "aksel-table__row--shade-on-hover": shadeOnHover,
        })}
        onClick={composeEventHandlers(onClick, handleRowClick)}
        data-interactive={!!onRowClick}
      />
    );
  },
);

export default Row;
