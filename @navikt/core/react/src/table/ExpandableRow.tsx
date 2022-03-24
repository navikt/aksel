import React, { forwardRef, useState } from "react";
import cl from "classnames";
import Row, { RowProps } from "./Row";
import DataCell from "./DataCell";
import { Expand, ExpandFilled } from "@navikt/ds-icons";
import { useId } from "..";

interface ExpandableRowProps extends RowProps {
  content: React.ReactNode;
}

export interface ExpandableRowType
  extends React.ForwardRefExoticComponent<
    ExpandableRowProps & React.RefAttributes<HTMLTableRowElement>
  > {}

const ExpandableRow: ExpandableRowType = forwardRef(
  ({ className, children, content, ...rest }, ref) => {
    const [open, setOpen] = useState(false);
    const id = useId();

    return (
      <>
        <Row {...rest} className={cl(className)}>
          <DataCell
            className={cl("navds-table__expandable-cell", {
              "navds-table__expandable-cell--open": open,
            })}
          >
            <button
              className="navds-table__expandable-button"
              aria-controls={`expandable-${id}`}
              aria-expanded={open}
              aria-label="Vis mer"
              onClick={() => setOpen((open) => !open)}
            >
              <Expand
                className={cl("navds-table__expandable-icon", {
                  "navds-table__expandable-icon--open": open,
                })}
              />
              <ExpandFilled
                className={cl("navds-table__expandable-icon--filled", {
                  "navds-table__expandable-icon--open": open,
                })}
              />
            </button>
          </DataCell>
          {children}
        </Row>
        <tr
          className={cl("navds-table__expandable-row", {
            "navds-table__expandable-row--open": open,
          })}
          aria-hidden={!open}
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
