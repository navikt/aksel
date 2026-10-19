type PaginationRangeOptions<RowT> = {
  page: number;
  pageSize: number;
  data: RowT[];
} & (
  | {
      totalRows: number;
      hasNextPage?: never;
    }
  | {
      hasNextPage: boolean;
      totalRows?: never;
    }
);

type PaginationRange = {
  page: number;
  pageCount: number | undefined;
  from: number;
  to: number;
  canPrevious: boolean;
  canNext: boolean;
};

function getPaginationRange<RowT>({
  page,
  pageSize,
  data,
  totalRows,
  hasNextPage,
}: PaginationRangeOptions<RowT>): PaginationRange {
  const pageCount =
    totalRows === undefined
      ? undefined
      : Math.max(1, Math.ceil(totalRows / pageSize));
  const currentPage =
    pageCount === undefined
      ? Math.max(page, 0)
      : Math.min(Math.max(page, 0), pageCount - 1);
  const from = data.length === 0 ? 0 : currentPage * pageSize + 1;
  const to =
    data.length === 0
      ? 0
      : totalRows === undefined
        ? from + data.length - 1
        : Math.min(from + data.length - 1, totalRows);

  return {
    page: currentPage,
    pageCount,
    from,
    to,
    canPrevious: currentPage > 0,
    canNext:
      pageCount === undefined
        ? hasNextPage === true
        : currentPage < pageCount - 1,
  };
}

export { getPaginationRange };
