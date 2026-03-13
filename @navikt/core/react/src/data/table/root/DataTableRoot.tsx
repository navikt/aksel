import React, { forwardRef, useCallback, useRef, useState } from "react";
import { useClientLayoutEffect } from "../../../utils-external/hooks/useClientLayoutEffect";
import { cl } from "../../../utils/helpers";
import { useMergeRefs } from "../../../utils/hooks";
import {
  DataTableCaption,
  type DataTableCaptionProps,
} from "../caption/DataTableCaption";
import {
  DataTableTbody,
  type DataTableTbodyProps,
} from "../tbody/DataTableTbody";
import { DataTableTd, type DataTableTdProps } from "../td/DataTableTd";
import {
  DataTableTfoot,
  type DataTableTfootProps,
} from "../tfoot/DataTableTfoot";
import { DataTableTh, type DataTableThProps } from "../th/DataTableTh";
import {
  DataTableThead,
  type DataTableTheadProps,
} from "../thead/DataTableThead";
import { DataTableTr, type DataTableTrProps } from "../tr/DataTableTr";
import {
  type ColumnRegistration,
  DataTableContextProvider,
} from "./DataTableRoot.context";
import { useTableKeyboardNav } from "./useTableKeyboardNav";

interface DataTableProps extends React.HTMLAttributes<HTMLTableElement> {
  children: React.ReactNode;
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
}

interface DataTableRootComponent extends React.ForwardRefExoticComponent<
  DataTableProps & React.RefAttributes<HTMLTableElement>
> {
  /**
   * @see 🏷️ {@link DataTableCaptionProps}
   * @example
   * ```jsx
   * <DataTable>
   *   <DataTable.Caption>
   *     Lorem ipsum
   *   </DataTable.Caption
   * </DataTable>
   * ```
   */
  Caption: typeof DataTableCaption;
  /**
   * @see 🏷️ {@link DataTableTheadProps}
   * @example
   * ```jsx
   * <DataTable>
   *   <DataTable.Thead>
   *     ... TODO
   *   </DataTable.Thead>
   * </DataTable>
   * ```
   */
  Thead: typeof DataTableThead;
  /**
   * @see 🏷️ {@link DataTableTbodyProps}
   * @example
   * ```jsx
   * <DataTable>
   *   <DataTable.Tbody>
   *     ... TODO
   *   </DataTable.Tbody>
   * </DataTable>
   * ```
   */
  Tbody: typeof DataTableTbody;
  /**
   * @see 🏷️ {@link DataTableTrProps}
   * @example
   * ```jsx
   * <DataTable>
   *   <DataTable.Tr>
   *     ... TODO
   *   </DataTable.Tr
   * </DataTable>
   * ```
   */
  Tr: typeof DataTableTr;
  /**
   * @see 🏷️ {@link DataTableThProps}
   * @example
   * ```jsx
   * <DataTable>
   *   <DataTable.Thead>
   *     <DataTable.Th>Header 1</DataTable.Th>
   *     <DataTable.Th>Header 2</DataTable.Th>
   *   </DataTable.Thead>
   * </DataTable>
   * ```
   */
  Th: typeof DataTableTh;
  /**
   * @see 🏷️ {@link DataTableTdProps}
   * @example
   * ```jsx
   * <DataTable>
   *   <DataTable.Tbody>
   *     <DataTable.Td>
   *       Lorem ipsum
   *     </DataTable.Td>
   *     <DataTable.Td>
   *       Dolor sit amet
   *     </DataTable.Td>
   *   </DataTable.Tbody>
   * </DataTable>
   * ```
   */
  Td: typeof DataTableTd;
  /**
   * @see 🏷️ {@link DataTableTfootProps}
   * @example
   * ```jsx
   * <DataTable>
   *   <DataTable.Tfoot>
   *     ...
   *   </DataTable.Tfoot>
   * </DataTable>
   * ```
   */
  Tfoot: typeof DataTableTfoot;
}

/**
 * TODO Component description etc.
 *
 * **NB:** To get sticky headers, you have to set a height restriction on the table container. You can use VStack for this:
 * TODO example
 */
const DataTable = forwardRef<HTMLTableElement, DataTableProps>(
  (
    {
      className,
      rowDensity = "normal",
      withKeyboardNav = false,
      zebraStripes = false,
      truncateContent = true,
      shouldBlockNavigation,
      layout = "fixed",
      ...rest
    },
    forwardedRef,
  ) => {
    const [tableRef, setTableRef] = useState<HTMLTableElement | null>(null);
    const tableElRef = useRef<HTMLTableElement | null>(null);
    const mergedRef = useMergeRefs(
      forwardedRef,
      setTableRef,
      (el: HTMLTableElement | null) => {
        tableElRef.current = el;
      },
    );

    const { tabIndex } = useTableKeyboardNav(tableRef, {
      enabled: withKeyboardNav,
      shouldBlockNavigation,
    });

    const columnsRef = useRef(new Map<string, ColumnRegistration>());

    const resolveColumns = useCallback(() => {
      const tableEl = tableElRef.current;
      if (!tableEl || layout !== "fixed") return;

      const columns = columnsRef.current;
      if (columns.size === 0) return;

      const tableWidth = tableEl.offsetWidth;

      let fixedSum = 0;
      let totalFr = 0;

      for (const col of columns.values()) {
        if (col.type === "fixed") {
          fixedSum += col.fixedWidth;
        } else {
          totalFr += col.frValue;
        }
      }

      if (totalFr === 0) return;

      const remaining = Math.max(0, tableWidth - fixedSum);

      for (const col of columns.values()) {
        if (col.type === "fr") {
          const resolvedWidth = (col.frValue / totalFr) * remaining;
          const clamped = Math.min(
            Math.max(resolvedWidth, col.minWidth),
            col.maxWidth,
          );
          col.setResolvedWidth(clamped);
        }
      }
    }, [layout]);

    const registerColumn = useCallback(
      (id: string, config: ColumnRegistration) => {
        columnsRef.current.set(id, config);
        resolveColumns();
      },
      [resolveColumns],
    );

    const unregisterColumn = useCallback(
      (id: string) => {
        columnsRef.current.delete(id);
        resolveColumns();
      },
      [resolveColumns],
    );

    const notifyResize = useCallback(
      (id: string, newWidth: number) => {
        const col = columnsRef.current.get(id);
        if (col) {
          col.type = "fixed";
          col.fixedWidth = newWidth;
        }
        resolveColumns();
      },
      [resolveColumns],
    );

    useClientLayoutEffect(() => {
      resolveColumns();
    });

    return (
      <DataTableContextProvider
        layout={layout}
        registerColumn={registerColumn}
        unregisterColumn={unregisterColumn}
        notifyResize={notifyResize}
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
            />
          </div>
        </div>
      </DataTableContextProvider>
    );
  },
) as DataTableRootComponent;

DataTable.Caption = DataTableCaption;
DataTable.Thead = DataTableThead;
DataTable.Tbody = DataTableTbody;
DataTable.Th = DataTableTh;
DataTable.Tr = DataTableTr;
DataTable.Td = DataTableTd;
DataTable.Tfoot = DataTableTfoot;

export {
  DataTable,
  DataTableCaption,
  DataTableTbody,
  DataTableTd,
  DataTableTfoot,
  DataTableTh,
  DataTableThead,
  DataTableTr,
};
export default DataTable;
export type {
  DataTableCaptionProps,
  DataTableProps,
  DataTableTbodyProps,
  DataTableTdProps,
  DataTableTfootProps,
  DataTableTheadProps,
  DataTableThProps,
  DataTableTrProps,
};
