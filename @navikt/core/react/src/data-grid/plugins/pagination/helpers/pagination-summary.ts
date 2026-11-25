import type { TFunction } from "../../../../utils/i18n/i18n.types";

/** Visible rows summary, e.g. "Fra 1 til 10 av 245". */
function getPaginationSummary(
  translate: TFunction<"DataGrid">,
  {
    from,
    to,
    totalRows,
  }: { from: number; to: number; totalRows: number | undefined },
) {
  if (to === 0) {
    return translate("Pagination.summaryEmpty");
  }
  if (totalRows === undefined) {
    return translate("Pagination.summaryUnknownTotal", { from, to });
  }
  return translate("Pagination.summary", { from, to, totalRows });
}

export { getPaginationSummary };
