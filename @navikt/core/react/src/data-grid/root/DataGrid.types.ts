type DataGridSettings = {
  /**
   * Controls vertical cell padding.
   * @default "standard"
   */
  rowDensity?: "tight" | "standard" | "loose";
  /**
   * Zebra striped table
   * @default false
   */
  zebraStripes?: boolean;
  /**
   * Adds vertical borders between columns.
   * @default true
   */
  columnDividers?: boolean;
  /**
   * Truncate content in cells and show ellipsis for overflowed text.
   *
   * **NB:** When using this together with `layout="auto"`,
   * you have to manually set a `maxWidth` on columns that should be truncated.
   * @default false if layout="auto", else true
   */
  truncateContent?: boolean;
  /**
   * Sticky columns that remain visible when horizontally scrolling the table.
   *
   * You can specify 1 sticky column on the left and 1 on the right.
   */
  stickyColumns?: {
    start?: 1;
    end?: 1;
  };
  /**
   * Adjusts font-size
   * @default "medium"
   */
  textSize?: "small" | "medium";
  /**
   * Optional configuration for column order and visibility.
   *
   * If provided, only columns listed here are rendered, and the array order
   * determines the rendered column order.
   *
   * Set `visible: false` to hide a column without removing it from the list.
   * Each `id` must be unique and match a column `id` in the `columns` prop.
   */
  columnDisplay?: { id: string; visible: boolean | "always" }[];
};

type DataGridPaginationOptions = {
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
} & (
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

export type { DataGridPaginationOptions, DataGridSettings };
