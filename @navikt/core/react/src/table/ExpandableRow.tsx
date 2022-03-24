import React, { forwardRef, useState } from "react";
import cl from "classnames";
import Row, { RowProps } from "./Row";
import DataCell from "./DataCell";
import { Expand, ExpandFilled } from "@navikt/ds-icons";
import { useId } from "..";

interface ExpandableRowProps extends RowProps {
  /**
   */
  content: React.ReactNode;
  /**
   * @default "left"
   */
  togglePlacement?: "left" | "right";
  /**
   * Opens component if 'true', closes if 'false'
   * Using this props removes automatic control of open-state
   */
  open?: boolean;
  /**
   * Defaults to opened state
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
    const id = useId();

    const isOpen = open ?? internalOpen;

    const Toggle = () => (
      <DataCell
        className={cl("navds-table__expandable-cell", {
          "navds-table__expandable-cell--open": isOpen,
        })}
      >
        <button
          className="navds-table__expandable-button"
          aria-controls={`expandable-${id}`}
          aria-expanded={isOpen}
          aria-label="Vis mer"
          onClick={() => {
            onOpenChange?.(!isOpen);
            if (open === undefined) {
              setInternalOpen((open) => !open);
            }
          }}
        >
          <Expand
            className={cl("navds-table__expandable-icon", {
              "navds-table__expandable-icon--open": isOpen,
            })}
          />
          <ExpandFilled
            className={cl("navds-table__expandable-icon--filled", {
              "navds-table__expandable-icon--open": isOpen,
            })}
          />
        </button>
      </DataCell>
    );

    return (
      <>
        <Row {...rest} ref={ref} className={cl(className)}>
          {togglePlacement === "left" && <Toggle />}
          {children}
          {togglePlacement === "right" && <Toggle />}
        </Row>
        <tr
          className={cl("navds-table__expandable-row", {
            "navds-table__expandable-row--open": isOpen,
          })}
          aria-hidden={!isOpen}
          id={`expandable-${id}`}
        >
          <td colSpan={999}>
            <div className={cl("navds-table__expandable-row-content")}>
              {content}
            </div>
          </td>
        </tr>
      </>
    );
  }
);

export default ExpandableRow;
