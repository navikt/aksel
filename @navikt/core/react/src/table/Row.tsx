import React, { forwardRef } from "react";
import { useRenameCSS } from "../theme/Theme";
import { composeEventHandlers } from "../util/composeEventHandlers";

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
   * Click handler for row.
   */
  onRowSelect?: (event: React.MouseEvent<HTMLTableRowElement>) => void;
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
      onRowSelect,
      ...rest
    },
    ref,
  ) => {
    const { cn } = useRenameCSS();

    const handleRowClick = (event: React.MouseEvent<HTMLTableRowElement>) => {
      if (!onRowSelect) {
        return;
      }
      if (isInteractiveTarget(event.target as HTMLElement)) {
        return;
      }
      event.stopPropagation();
      onRowSelect(event);
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

function isInteractiveTarget(elm: HTMLElement) {
  if (elm.nodeName === "TD" || elm.nodeName === "TH" || !elm.parentElement) {
    return false;
  }
  if (
    ["BUTTON", "DETAILS", "LABEL", "SELECT", "TEXTAREA", "INPUT", "A"].includes(
      elm.nodeName,
    )
  ) {
    return true;
  }

  return isInteractiveTarget(elm.parentElement);
}

export default Row;
