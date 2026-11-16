type DataGridPaginationSharedOptions = {
  /** Controlled page. Zero-indexed (first page is 0). */
  page?: number;
  /**
   * Initial zero-indexed page when `page` is uncontrolled.
   * @default 0
   */
  defaultPage?: number;
  /** Called with the requested zero-indexed page. */
  onPageChange?: (page: number) => void;
  /** Controlled number of rows per page. */
  pageSize?: number;
  /**
   * Initial page size when `pageSize` is uncontrolled.
   * @default pageSizeOptions[0]
   */
  defaultPageSize?: number;
  /**
   * Called when the page size changes.
   * A page-size change also returns to the first page, firing `onPageChange(0)` unless already on it.
   */
  onPageSizeChange?: (pageSize: number) => void;
  /**
   * Page-size options.
   * @default [10, 25, 50, 100]
   */
  pageSizeOptions?: number[];
  /**
   * Whether users can change the page size.
   * When `false`, the row summary is shown as plain text and `pageSizeOptions` is ignored.
   * @default true
   */
  allowPageSizeChange?: boolean;
};

/** Server mode needs exactly one of `totalRows` or `hasNextPage`. */
type DataGridPaginationServerTotal =
  | {
      /** Count of top-level rows across all pages. */
      totalRows: number;
      hasNextPage?: never;
    }
  | {
      /** Whether a page exists after the current one. Use when the total is unknown. */
      hasNextPage: boolean;
      totalRows?: never;
    };

type DataGridPaginationConfig = DataGridPaginationSharedOptions & {
  /**
   * Whether completed page and page-size changes are announced.
   * In server mode, set `isLoading` on DataGrid while fetching, otherwise the announcement uses the previous page's rows.
   * @default true
   */
  announcePageChanges?: boolean;
} & (
    | {
        /**
         * Client mode: DataGrid receives all rows and slices the current page.
         * @default "client"
         */
        mode?: "client";
        totalRows?: never;
        hasNextPage?: never;
      }
    | ({
        /**
         * Server mode: DataGrid receives only the current page's rows.
         * Set `isLoading` on DataGrid from the page request until the new rows arrive,
         * otherwise the row summary and page-change announcement use the previous page's rows.
         */
        mode: "server";
      } & DataGridPaginationServerTotal)
  );

/** Internal row counts used to resolve the current page range. */
type DataGridPaginationRows =
  | {
      /** Client mode: count of all top-level rows. DataGrid slices the page. */
      mode: "client";
      rowCount: number;
      pageRowCount?: never;
      totalRows?: never;
      hasNextPage?: never;
    }
  | ({
      /** Server mode: count of top-level rows on the consumer-sliced page. */
      mode: "server";
      pageRowCount: number;
      rowCount?: never;
    } & DataGridPaginationServerTotal);

export type {
  DataGridPaginationConfig,
  DataGridPaginationRows,
  DataGridPaginationSharedOptions,
};
