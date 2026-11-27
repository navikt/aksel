import React, { useEffect, useRef, useState } from "react";
import { useI18n } from "../../../../utils/i18n/i18n.hooks";
import {
  type PaginationAnnounceTarget,
  useDataGridPaginationContext,
} from "../context/DataGridPagination.context";
import { getPaginationSummary } from "../helpers/pagination-summary";

/**
 * Announces completed page and page-size changes requested by the pagination controls.
 */
function DataGridPaginationLiveRegionInternal({
  announceTargetRef,
  announceRequestId,
}: {
  announceTargetRef: React.MutableRefObject<PaginationAnnounceTarget | null>;
  announceRequestId: number;
}) {
  const { page, pageSize, from, to, totalRows, isLoading } =
    useDataGridPaginationContext();
  const translate = useI18n("DataGrid");
  const lastAnnouncedPage = useRef({ page, pageSize });
  const [announcement, setAnnouncement] = useState({ id: 0, text: "" });

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (
      lastAnnouncedPage.current.page === page &&
      lastAnnouncedPage.current.pageSize === pageSize
    ) {
      /* Clear rejected requests so a later external change does not falsely announce. */
      announceTargetRef.current = null;
      return;
    }

    lastAnnouncedPage.current = { page, pageSize };
    const target = announceTargetRef.current;
    announceTargetRef.current = null;
    if (
      !target ||
      target.pageSize !== pageSize ||
      (target.page !== undefined && target.page !== page)
    ) {
      return;
    }

    const summary = getPaginationSummary(translate, { from, to, totalRows });

    // Keep the completed message during loading and unrelated renders.
    setAnnouncement((prev) => ({ id: prev.id + 1, text: summary }));
  }, [
    isLoading,
    page,
    pageSize,
    from,
    to,
    totalRows,
    translate,
    announceTargetRef,
    announceRequestId,
  ]);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="aksel-sr-only"
    >
      {announcement.text && (
        <div key={announcement.id}>{announcement.text}</div>
      )}
    </div>
  );
}

export { DataGridPaginationLiveRegionInternal };
