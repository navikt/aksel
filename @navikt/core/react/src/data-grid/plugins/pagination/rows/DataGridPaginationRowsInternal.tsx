import React, { useMemo } from "react";
import { CheckmarkHeavyIcon, ChevronDownIcon } from "@navikt/aksel-icons";
import { ActionMenu } from "../../../../action-menu";
import { Button } from "../../../../button";
import { BodyShort } from "../../../../typography";
import { useI18n } from "../../../../utils/i18n/i18n.hooks";
import { useDataGridPaginationContext } from "../context/DataGridPagination.context";
import { getPaginationSummary } from "../helpers/pagination-summary";

/**
 * Shows which rows are displayed (e.g. "Fra 1 til 10 av 245") and lets users choose how many rows to display per page.
 * Renders plain text when `allowPageSizeChange` is `false`.
 */
function DataGridPaginationRowsInternal() {
  const {
    pageSize,
    pageSizeOptions,
    allowPageSizeChange,
    setPageSize,
    from,
    to,
    totalRows,
  } = useDataGridPaginationContext();
  const translate = useI18n("DataGrid");

  const text = getPaginationSummary(translate, { from, to, totalRows });

  const options = useMemo(
    () =>
      pageSizeOptions.includes(pageSize)
        ? pageSizeOptions
        : [...pageSizeOptions, pageSize],
    [pageSize, pageSizeOptions],
  );

  if (!allowPageSizeChange) {
    return (
      <BodyShort size="small" as="span">
        {text}
      </BodyShort>
    );
  }

  return (
    <ActionMenu>
      <ActionMenu.Trigger>
        <Button
          className="aksel-data-grid__pagination-rows"
          variant="tertiary"
          data-color="neutral"
          size="small"
          icon={<ChevronDownIcon aria-hidden />}
          iconPosition="right"
          /* Starts with the visible summary (label in name) and adds what the button does */
          aria-label={translate("Pagination.pageSizeTrigger", {
            summary: text,
            size: pageSize,
          })}
        >
          {text}
        </Button>
      </ActionMenu.Trigger>
      <ActionMenu.Content>
        {options.map((size) => (
          <ActionMenu.Item
            key={size}
            onSelect={() => setPageSize(size)}
            role="menuitemradio"
            aria-checked={pageSize === size}
            icon={
              pageSize === size ? <CheckmarkHeavyIcon aria-hidden /> : <></>
            }
          >
            {translate("Pagination.pageSizeOption", { size })}
          </ActionMenu.Item>
        ))}
      </ActionMenu.Content>
    </ActionMenu>
  );
}

export { DataGridPaginationRowsInternal };
