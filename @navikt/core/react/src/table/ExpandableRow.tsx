import React, { forwardRef } from "react";
import { ChevronDownIcon } from "@navikt/aksel-icons";
import { useId } from "../utils-external";
import { cl, composeEventHandlers } from "../utils/helpers";
import { useControllableState } from "../utils/hooks";
import { useI18n } from "../utils/i18n/i18n.hooks";
import AnimateHeight from "./AnimateHeight";
import DataCell from "./DataCell";
import Row, { RowProps } from "./Row";
import { isElementInteractiveTarget } from "./Table.utils";

export interface ExpandableRowProps
  extends Omit<RowProps, "content" | "onRowClick"> {
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
   * Using this prop removes automatic control of open-state
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
  /**
   * Optional left, right-gutter for content
   * @default Same as `togglePlacement`
   */
  contentGutter?: "left" | "right" | "none";
}

export type ExpandableRowType = React.ForwardRefExoticComponent<
  ExpandableRowProps & React.RefAttributes<HTMLTableRowElement>
>;

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
      contentGutter,
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
    const translate = useI18n("global");

    const id = useId();

    const expansionHandler = (event: React.MouseEvent<HTMLElement>) => {
      _setOpen((oldOpen) => !oldOpen);
      event.stopPropagation();
    };

    const handleRowClick = (event: React.MouseEvent<HTMLTableRowElement>) => {
      expandOnRowClick &&
        !expansionDisabled &&
        !isElementInteractiveTarget(event.target as HTMLElement) &&
        expansionHandler(event);
    };

    return (
      <>
        <Row
          {...rest}
          ref={ref}
          className={cl("aksel-table__expandable-row", className, {
            "aksel-table__expandable-row--open": _open,
            "aksel-table__expandable-row--expansion-disabled":
              expansionDisabled,
            "aksel-table__expandable-row--clickable": expandOnRowClick,
          })}
          onClick={composeEventHandlers(onClick, handleRowClick)}
        >
          {togglePlacement === "right" && children}
          <DataCell
            className={cl("aksel-table__toggle-expand-cell", {
              "aksel-table__toggle-expand-cell--open": _open,
            })}
            onClick={!expansionDisabled ? expansionHandler : () => null}
          >
            {!expansionDisabled && (
              <button
                className="aksel-table__toggle-expand-button"
                type="button"
                aria-controls={id}
                aria-expanded={_open}
                onClick={expansionHandler}
              >
                <ChevronDownIcon
                  className="aksel-table__expandable-icon"
                  title={_open ? translate("showLess") : translate("showMore")}
                />
              </button>
            )}
          </DataCell>
          {togglePlacement === "left" && children}
        </Row>
        <tr
          data-state={_open ? "open" : "closed"}
          className="aksel-table__expanded-row"
          aria-hidden={!_open}
          id={id}
        >
          <td colSpan={colSpan} className="aksel-table__expanded-row-cell">
            <AnimateHeight
              className="aksel-table__expanded-row-collapse"
              innerClassName={`aksel-table__expanded-row-content aksel-table__expanded-row-content--gutter-${
                contentGutter ?? togglePlacement
              }`}
              height={_open ? "auto" : 0}
              duration={150}
              easing="cubic-bezier(0.39,0.57,0.56,1)"
            >
              {content}
            </AnimateHeight>
          </td>
        </tr>
      </>
    );
  },
);

export default ExpandableRow;
