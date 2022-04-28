import React, { forwardRef, useState } from "react";
import cl from "classnames";
import Row, { RowProps } from "./Row";
import DataCell from "./DataCell";
import { UnmountClosed } from "react-collapse";
import { Expand, ExpandFilled } from "@navikt/ds-icons";
import { useId } from "..";

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
   * Disable expansio
   * @default false
   */
  expansionDisabled?: boolean;
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
      ...rest
    },
    ref
  ) => {
    const [internalOpen, setInternalOpen] = useState<boolean>(defaultOpen);
    const id = `expandable-${useId()}`;

    const isOpen = open ?? internalOpen;

    return (
      <>
        <Row
          {...rest}
          ref={ref}
          className={cl("navds-table__expandable-row", className, {
            "navds-table__expandable-row--open": isOpen,
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
                onClick={() => {
                  onOpenChange?.(!isOpen);
                  if (open === undefined) {
                    setInternalOpen((open) => !open);
                  }
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
            <UnmountClosed
              isOpened={isOpen}
              theme={{
                collapse: "navds-table__expanded-row-collapse",
                content: "navds-table__expanded-row-content",
              }}
            >
              {content}
            </UnmountClosed>
          </td>
        </tr>
      </>
    );
  }
);

export default ExpandableRow;
