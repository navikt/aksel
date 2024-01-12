import cl from "clsx";
import React, { forwardRef } from "react";
import { ChevronDownIcon } from "@navikt/aksel-icons";
import { composeEventHandlers } from "../util/composeEventHandlers";
import { useId } from "../util/hooks";
import { useControllableState } from "../util/hooks/useControllableState";
import AnimateHeight from "./AnimateHeight";
import DataCell from "./DataCell";
import Row, { RowProps } from "./Row";

export interface ExpandableRowProps extends Omit<RowProps, "content"> {
  /**
   * Content of the expanded row
   */
  content: React.ReactNode;
  /**
   * Placement of toggle button
   * @default "left"
   */
  togglePlacement?: "left" | "right";
  /**
   * Opens component if 'true', closes if 'false'
   * Using this props removes automatic control of open-state
   */
  open?: boolean;
  /**
   * Opened state default
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Change handler for open
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Disable expansion. shadeOnHover will not be visible.
   * @default false
   */
  expansionDisabled?: boolean;
  /**
   * Makes the whole row clickable
   * @default false
   */
  expandOnRowClick?: boolean;
  /**
   * The width of the expanded row's internal cell
   * @default 999
   */
  colSpan?: number;
}

export interface ExpandableRowType
  extends React.ForwardRefExoticComponent<
    ExpandableRowProps & React.RefAttributes<HTMLTableRowElement>
  > {}

export const ExpandableRow: ExpandableRowType = forwardRef(
  (
    {
      className,
      children,
      content,
      togglePlacement = "left",
      defaultOpen = false,
      open,
      onOpenChange,
      expansionDisabled = false,
      expandOnRowClick = false,
      colSpan = 999,
      onClick,
      ...rest
    },
    ref,
  ) => {
    const [_open, _setOpen] = useControllableState({
      defaultValue: defaultOpen,
      value: open,
      onChange: onOpenChange,
    });

    const id = useId();

    const expansionHandler = (e) => {
      _setOpen((x) => !x);
      e.stopPropagation();
    };

    const onRowClick = (e) =>
      !isInteractiveTarget(e.target) && expansionHandler(e);

    const handleRowClick = (
      e: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    ) => {
      !expansionDisabled && expandOnRowClick && onRowClick(e);
    };

    return (
      <>
        <Row
          {...rest}
          ref={ref}
          className={cl("navds-table__expandable-row", className, {
            "navds-table__expandable-row--open": _open,
            "navds-table__expandable-row--expansion-disabled":
              expansionDisabled,
            "navds-table__expandable-row--clickable": expandOnRowClick,
          })}
          onClick={composeEventHandlers(onClick, handleRowClick)}
        >
          {togglePlacement === "right" && children}
          <DataCell
            className={cl("navds-table__toggle-expand-cell", {
              "navds-table__toggle-expand-cell--open": _open,
            })}
          >
            {!expansionDisabled && (
              <button
                className="navds-table__toggle-expand-button"
                type="button"
                aria-controls={id}
                aria-expanded={_open}
                onClick={expansionHandler}
              >
                <ChevronDownIcon
                  className="navds-table__expandable-icon"
                  title={_open ? "Vis mindre" : "Vis mer"}
                />
              </button>
            )}
          </DataCell>
          {togglePlacement === "left" && children}
        </Row>
        <tr className="navds-table__expanded-row" aria-hidden={!_open} id={id}>
          <td colSpan={colSpan} className="navds-table__expanded-row-cell">
            <AnimateHeight
              className="navds-table__expanded-row-collapse"
              innerClassName="navds-table__expanded-row-content"
              height={_open ? "auto" : 0}
              duration={250}
            >
              {content}
            </AnimateHeight>
          </td>
        </tr>
      </>
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

export default ExpandableRow;
