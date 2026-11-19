import React, { useEffect, useRef, useState } from "react";
import { useI18n } from "../../../utils/i18n/i18n.hooks";
import { getPaginationSummary } from "../helpers/pagination-summary";
import { useDataGridPaginationContext } from "../root/DataGridPaginationRoot.context";
import type { PaginationAnnounceTarget } from "../root/useDataGridPagination";

/**
 * Announces completed page and page-size changes requested by the pagination controls.
 */
function DataGridPaginationLiveRegionInternal({
  announceTargetRef,
}: {
  announceTargetRef: React.MutableRefObject<PaginationAnnounceTarget | null>;
}) {
  const { page, pageCount, pageSize, from, to, totalRows, isLoading } =
    useDataGridPaginationContext();
  const translate = useI18n("DataGrid");
  const lastAnnouncedPage = useRef({ page, pageSize });
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    if (
      isLoading ||
      (lastAnnouncedPage.current.page === page &&
        lastAnnouncedPage.current.pageSize === pageSize)
    ) {
      return;
    }

    lastAnnouncedPage.current = { page, pageSize };
    const target = announceTargetRef.current;
    announceTargetRef.current = null;
    if (target?.page !== page || target.pageSize !== pageSize) {
      return;
    }

    const summary = getPaginationSummary(translate, { from, to, totalRows });

    // Keep the completed message during loading and unrelated renders.
    setAnnouncement(summary);
  }, [
    isLoading,
    page,
    pageCount,
    pageSize,
    from,
    to,
    totalRows,
    translate,
    announceTargetRef,
  ]);

  return (
    <div aria-live="polite" aria-atomic="true" className="aksel-sr-only">
      {announcement}
    </div>
  );
}

export { DataGridPaginationLiveRegionInternal };
