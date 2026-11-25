const DEFAULT_PAGE_SIZE = 10;

function sanitizePage(page: number): number {
  return Number.isFinite(page) ? Math.max(1, Math.floor(page)) : 1;
}

function sanitizePageSize(pageSize: number): number {
  const floored = Math.floor(pageSize);
  return Number.isFinite(floored) && floored >= 1 ? floored : DEFAULT_PAGE_SIZE;
}

/**
 * Slices a data array for the current 1-based page.
 *
 * Pure utility for client-side pagination. For server-side pagination
 * where data is already sliced, pass the page rows directly to `DataGrid`.
 *
 * @param data - Full data array
 * @param page - Current page number (1-based)
 * @param pageSize - Number of rows per page; floored to a positive integer, values < 1 or non-finite fall back to 10
 * @returns Slice of data for the current page
 *
 * @example
 * ```tsx
 * const [page, setPage] = useState(1);
 * const pageSize = 10;
 * const pageRows = useMemo(() => paginateData(rows, page, pageSize), [rows, page, pageSize]);
 * ```
 */
function paginateData<T>(
  data: readonly T[],
  page: number,
  pageSize: number,
): T[] {
  const size = sanitizePageSize(pageSize);
  const currentPage = sanitizePage(page);
  const start = (currentPage - 1) * size;
  return data.slice(start, start + size);
}

export { DEFAULT_PAGE_SIZE, paginateData, sanitizePage, sanitizePageSize };
