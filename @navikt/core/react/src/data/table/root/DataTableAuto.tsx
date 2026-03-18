import React, { forwardRef, useState } from "react";
import { cl } from "../../../utils/helpers";
import { useControllableState, useMergeRefs } from "../../../utils/hooks";
import { DataTableTbody } from "../tbody/DataTableTbody";
import { DataTableTd } from "../td/DataTableTd";
import { DataTableTh } from "../th/DataTableTh";
import { DataTableThead } from "../thead/DataTableThead";
import { DataTableTr } from "../tr/DataTableTr";
import type { ColumnDefinitions } from "./DataTable.types";
import {
  DataTableContextProvider,
  type SelectionProps,
} from "./DataTableRoot.context";
import { useTableKeyboardNav } from "./useTableKeyboardNav";
import { useTableSelection } from "./useTableSelection";

interface DataTableProps<T>
  extends React.HTMLAttributes<HTMLTableElement>, SelectionProps {
  children?: never;
  /**
   * Controls vertical cell padding.
   * @default "normal"
   */
  rowDensity?: "condensed" | "normal" | "spacious";
  /**
   * Zebra striped table
   * @default false
   */
  zebraStripes?: boolean;
  /**
   * Truncate content in cells and show ellipsis for overflowed text.
   *
   * **NB:** When using `layout="auto"`, you have to manually set a `maxWidth` on columns that should be truncated.
   * @default true
   */
  truncateContent?: boolean; // TODO: Consider making this default false when layout=auto, and maybe disallow it but add a wrap prop on the td-comp.
  /**
   * Enables keyboard navigation for table rows and cells.
   * @default false
   */
  withKeyboardNav?: boolean;
  /**
   * Custom callback to determine if navigation should be blocked.
   * Called before default blocking logic.
   * Requires `withKeyboardNav` to be `true`.
   */
  shouldBlockNavigation?: (event: KeyboardEvent) => boolean;
  /**
   * Controls table layout.
   *
   * ### fixed
   * Gives you full control of column widths. This is required for resizable columns.
   *
   * ### auto
   * Makes the columns resize automatically based on the content.
   * The table will take up at least 100% of available width.
   *
   * **NB:** When using this with `truncateContent`, you have to manually
   * set a `contentMaxWidth` on cells that should be truncated.
   * @default "fixed"
   */
  layout?: "fixed" | "auto";
  /**
   *
   */
  columnDefinitions: ColumnDefinitions<T>;
  data: T[];
}

function DataTableAutoInner<T>(
  {
    className,
    rowDensity = "normal",
    withKeyboardNav = false,
    zebraStripes = false,
    truncateContent = true,
    shouldBlockNavigation,
    layout = "fixed",
    selectionMode = "none",
    selectedKeys: selectedKeysProp,
    defaultSelectedKeys,
    onSelectionChange,
    disabledKeys = [],
    data,
    columnDefinitions,
    ...rest
  }: DataTableProps<T>,
  forwardedRef: React.ForwardedRef<HTMLTableElement>,
) {
  const [tableRef, setTableRef] = useState<HTMLTableElement | null>(null);
  const mergedRef = useMergeRefs(forwardedRef, setTableRef);

  const { tabIndex } = useTableKeyboardNav(tableRef, {
    enabled: withKeyboardNav,
    shouldBlockNavigation,
  });

  const { register, unRegister, values } = useTableSelection();

  const [selectedKeys, setSelectedKeys] = useControllableState({
    value: selectedKeysProp,
    defaultValue: defaultSelectedKeys ?? [],
    onChange: onSelectionChange,
  });

  const handleSelectionChange = (key: { value: string } | "all") => {
    console.info({ key });
    setSelectedKeys([]);
  };

  console.info(data, columnDefinitions);

  return (
    <DataTableContextProvider
      layout={layout}
      withKeyboardNav={withKeyboardNav}
      selectionMode={selectionMode}
      selectedKeys={selectedKeys}
      disabledKeys={disabledKeys}
      handleSelectionChange={handleSelectionChange}
      register={register}
      unRegister={unRegister}
      values={values}
    >
      <div className="aksel-data-table__border-wrapper">
        <div className="aksel-data-table__scroll-wrapper">
          <table
            {...rest}
            ref={mergedRef}
            className={cl("aksel-data-table", className)}
            data-zebra-stripes={zebraStripes}
            data-truncate-content={truncateContent}
            data-density={rowDensity}
            data-layout={layout}
            tabIndex={tabIndex}
          >
            <DataTableThead>
              <DataTableTr>
                {columnDefinitions.map((colDef, colDefIndex) => {
                  return (
                    <DataTableTh
                      maxWidth="400px"
                      minWidth="100px"
                      defaultWidth="100%"
                      textAlign="left"
                      key={colDef.id || colDefIndex}
                    >
                      {colDef.header}
                    </DataTableTh>
                  );
                })}
              </DataTableTr>
            </DataTableThead>
            <DataTableTbody>
              {data.map((rowData, rowIndex) => {
                return (
                  <DataTableTr
                    key={
                      rowIndex /* TODO: Should be more flexible to allow user to define the key? */
                    }
                  >
                    {columnDefinitions.map((colDef, colDefIndex) => {
                      return (
                        <DataTableTd
                          textAlign="left"
                          key={colDef.id || colDefIndex}
                        >
                          {colDef.cell(rowData)}
                        </DataTableTd>
                      );
                    })}
                  </DataTableTr>
                );
              })}
            </DataTableTbody>
          </table>
        </div>
      </div>
    </DataTableContextProvider>
  );
}

const DataTableAuto = forwardRef(DataTableAutoInner) as <T>(
  props: DataTableProps<T> & React.RefAttributes<HTMLTableElement>,
) => React.ReactElement | null;

export { DataTableAuto };
export type { DataTableProps };
export default DataTableAuto;
