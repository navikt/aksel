import React, { forwardRef, useState } from "react";
import cl from "classnames";
import Row, { RowProps } from "./Row";
import DataCell from "./DataCell";
import { UnmountClosed } from "react-collapse";
import { Expand, ExpandFilled } from "@navikt/ds-icons";
import { useId } from "..";

interface ExpandableRowProps extends RowProps {
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
}

export interface ExpandableRowType
  extends React.ForwardRefExoticComponent<
    ExpandableRowProps & React.RefAttributes<HTMLTableRowElement>
  > {}

const ExpandableRow: ExpandableRowType = forwardRef(
  (
    {
      className,
      children,
      content,
      togglePlacement = "left",
      defaultOpen = false,
      open,
      onOpenChange,
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
          className={cl("navds-table__expandable-row", className)}
        >
          {togglePlacement === "left" && (
            <Toggle
              id={id}
              isOpen={isOpen}
              toggleOpen={() => {
                onOpenChange?.(!isOpen);
                if (open === undefined) {
                  setInternalOpen((open) => !open);
                }
              }}
            />
          )}
          {children}
          {togglePlacement === "right" && (
            <Toggle
              id={id}
              isOpen={isOpen}
              toggleOpen={() => {
                onOpenChange?.(!isOpen);
                if (open === undefined) {
                  setInternalOpen((open) => !open);
                }
              }}
            />
          )}
        </Row>
        <tr className="navds-table__expanded-row" aria-hidden={!isOpen} id={id}>
          <td colSpan={999}>
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

const Toggle = ({ id, isOpen, toggleOpen }) => (
  <DataCell
    className={cl("navds-table__toggle-expand-cell", {
      "navds-table__toggle-expand-cell--open": isOpen,
    })}
  >
    <button
      className="navds-table__toggle-expand-button"
      aria-controls={id}
      aria-expanded={isOpen}
      aria-label="Vis mer"
      onClick={toggleOpen}
    >
      <Expand className="navds-table__expandable-icon" />
      <ExpandFilled className="navds-table__expandable-icon navds-table__expandable-icon--filled" />
    </button>
  </DataCell>
);

export default ExpandableRow;
