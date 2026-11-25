type DataGridPaginationPosition = "below" | "above" | "both" | "none";

type DataGridPaginationAlign = "start" | "end";

/** Known total row count, or cursor-style unknown total via `hasNextPage`. */
type DataGridPaginationTotal =
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

type UseDataGridPaginationConfig = {
  /** Current page number (1-based; first page is 1). */
  page: number;
  /** Called with the requested 1-based page. */
  onPageChange: (page: number) => void;
  /**
   * Number of rows per page.
   * @default 10
   */
  pageSize?: number;
  /**
   * Called when the user selects a new page size.
   * Does not automatically call `onPageChange`; reset `page` to `1` here if needed.
   */
  onPageSizeChange?: (pageSize: number) => void;
  /**
   * Page-size options shown in the page-size menu.
   * @default [10, 25, 50, 100]
   */
  pageSizeOptions?: number[];
  /**
   * Whether users can change the page size.
   * The page-size menu is shown when `onPageSizeChange` is provided and this is not `false`.
   * @default true
   */
  allowPageSizeChange?: boolean;
  /**
   * Where to render the pagination bar relative to the table.
   * @default "below"
   */
  position?: DataGridPaginationPosition;
  /**
   * Horizontal alignment of the pagination bar within its container.
   * @default "end"
   */
  align?: DataGridPaginationAlign;
  /**
   * Accessible label for the pagination navigation landmark.
   * When `position` is `"both"`, each landmark is suffixed with its position so both remain distinct.
   */
  navLabel?: string;
  /**
   * Whether completed page and page-size changes are announced to screen readers.
   * When fetching asynchronously, set `isLoading` on `DataGrid` while loading so the announcement reflects the new rows.
   * @default true
   */
  announcePageChanges?: boolean;
} & DataGridPaginationTotal;

export type {
  DataGridPaginationAlign,
  DataGridPaginationPosition,
  DataGridPaginationTotal,
  UseDataGridPaginationConfig,
};
