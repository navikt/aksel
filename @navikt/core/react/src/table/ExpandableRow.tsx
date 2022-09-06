import { Expand, ExpandFilled } from "@navikt/ds-icons";
import cl from "clsx";
import React, { forwardRef, useState } from "react";
import { useId } from "..";
import AnimateHeight from "../util/AnimateHeight";
import DataCell from "./DataCell";
import Row, { RowProps } from "./Row";

export interface ExpandableRowProps extends RowProps {
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
   * Disable expansion
   * @default false
   */
  expansionDisabled?: boolean;
  /**
   * Expand and close by clicking <Row>
   * @default false
   */
  openOnRowClick?: boolean;
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
      openOnRowClick = false,
      ...rest
    },
    ref
  ) => {
    const [internalOpen, setInternalOpen] = useState<boolean>(defaultOpen);
    const id = useId();

    const isOpen = open ?? internalOpen;

    const handleOnClick = () => {
      onOpenChange?.(!isOpen);
      if (open === undefined) {
        setInternalOpen((open) => !open);
      }
    };

    return (
      <>
        <Row
          {...rest}
          ref={ref}
          onClick={() =>
            openOnRowClick && !getSelection?.()?.toString?.() && handleOnClick()
          }
          className={cl("navds-table__expandable-row", className, {
            "navds-table__expandable-row--open": isOpen,
            "navds-table__expandable-row--clickable-row": openOnRowClick,
          })}
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
                aria-controls={id}
                aria-expanded={isOpen}
                onClick={(e) => {
                  e.stopPropagation();
                  handleOnClick();
                }}
              >
                <Expand
                  className="navds-table__expandable-icon"
                  title={isOpen ? "Vis mindre" : "Vis mer"}
                />
                <ExpandFilled
                  className="navds-table__expandable-icon navds-table__expandable-icon--filled"
                  title={isOpen ? "Vis mindre" : "Vis mer"}
                />
              </button>
            )}
          </DataCell>
          {togglePlacement === "left" && children}
        </Row>
        <tr className="navds-table__expanded-row" aria-hidden={!isOpen} id={id}>
          <td colSpan={999} className="navds-table__expanded-row-cell">
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
