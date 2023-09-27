import cl from "clsx";
import React, { forwardRef, useState } from "react";
import { useId } from "..";
import AnimateHeight from "../util/AnimateHeight";
import DataCell from "./DataCell";
import Row, { RowProps } from "./Row";
import { ChevronDownIcon } from "@navikt/aksel-icons";

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
      ...rest
    },
    ref
  ) => {
    const [internalOpen, setInternalOpen] = useState<boolean>(defaultOpen);
    const id = useId();
    const isOpen = open ?? internalOpen;

    const expansionHandler = (e) => {
      onOpenChange?.(!isOpen);
      if (open === undefined) {
        setInternalOpen((open) => !open);
      }
      e.stopPropagation();
    };

    const onRowClick = (e) => {
      if (e.target.nodeName === "TD" || e.target.nodeName === "TH") {
        expansionHandler(e);
      }
    };

    return (
      <>
        <Row
          {...rest}
          ref={ref}
          className={cl("navds-table__expandable-row", className, {
            "navds-table__expandable-row--open": isOpen,
            "navds-table__expandable-row--expansion-disabled":
              expansionDisabled,
            "navds-table__expandable-row--clickable": expandOnRowClick,
          })}
          onClick={(e) => {
            !expansionDisabled && expandOnRowClick && onRowClick(e);
            rest?.onClick?.(e);
          }}
        >
          {togglePlacement === "right" && children}
          <DataCell
            className={cl("navds-table__toggle-expand-cell", {
              "navds-table__toggle-expand-cell--open": isOpen,
            })}
          >
            {!expansionDisabled && (
              <button
                className="navds-table__toggle-expand-button"
                type="button"
                aria-controls={id}
                aria-expanded={isOpen}
                onClick={expansionHandler}
              >
                <ChevronDownIcon
                  className="navds-table__expandable-icon"
                  title={isOpen ? "Vis mindre" : "Vis mer"}
                />
              </button>
            )}
          </DataCell>
          {togglePlacement === "left" && children}
        </Row>
        <tr className="navds-table__expanded-row" aria-hidden={!isOpen} id={id}>
          <td colSpan={colSpan} className="navds-table__expanded-row-cell">
            <AnimateHeight
              className="navds-table__expanded-row-collapse"
              innerClassName="navds-table__expanded-row-content"
              height={isOpen ? "auto" : 0}
              duration={250}
            >
              {content}
            </AnimateHeight>
          </td>
        </tr>
      </>
    );
  }
);

export default ExpandableRow;
