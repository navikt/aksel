type DataGridPaginationSharedOptions = {
  /** Controlled, zero-indexed page. */
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
  /** Called when the page size changes. */
  onPageSizeChange?: (pageSize: number) => void;
  /**
   * Page-size options.
   * @default [10, 25, 50, 100]
   */
  pageSizeOptions?: number[];
};

type DataGridPaginationOptions = DataGridPaginationSharedOptions &
  (
    | {
        /** Known count of top-level data records. */
        totalRows: number;
        hasNextPage?: never;
      }
    | {
        /** Whether another page exists when the total row count is unknown. */
        hasNextPage: boolean;
        totalRows?: never;
      }
  );

export type { DataGridPaginationOptions, DataGridPaginationSharedOptions };
