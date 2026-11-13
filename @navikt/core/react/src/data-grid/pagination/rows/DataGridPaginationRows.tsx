import React, { forwardRef, useMemo } from "react";
import { CheckmarkHeavyIcon, ChevronDownIcon } from "@navikt/aksel-icons";
import { ActionMenu } from "../../../action-menu";
import { Button, type ButtonProps } from "../../../button";
import { cl } from "../../../utils/helpers/className";
import { useI18n } from "../../../utils/i18n/i18n.hooks";
import { useDataGridRootPaginationContext } from "../../root/DataGridRoot.context";

type DataGridPaginationRowsProps = Omit<
  ButtonProps,
  "children" | "size" | "variant" | "icon" | "iconPosition"
>;

/**
 * Shows which rows are displayed (e.g. "1–10 of 245") and lets users choose how many rows to display per page.
 *
 * @see 🏷️ {@link DataGridPaginationRowsProps}
 *
 * @example
 * ```jsx
 * <DataGrid columns={columns} data={rows} pagination={{}}>
 *   <DataGrid.Pagination>
 *     <DataGrid.PaginationRows />
 *   </DataGrid.Pagination>
 * </DataGrid>
 * ```
 */
const DataGridPaginationRows = forwardRef<
  HTMLButtonElement,
  DataGridPaginationRowsProps
>((restProps, forwardedRef) => {
  const { pageSize, pageSizeOptions, setPageSize, from, to, totalRows } =
    useDataGridRootPaginationContext(
      true,
      "[Aksel] DataGrid.PaginationRows must be used within <DataGrid pagination={...}>",
    );
  const translate = useI18n("DataGrid");

  let text: string;
  if (to === 0) {
    text = translate("Pagination.summaryEmpty");
  } else if (totalRows === undefined) {
    text = translate("Pagination.summaryUnknownTotal", { from, to });
  } else {
    text = translate("Pagination.summary", { from, to, totalRows });
  }

  const options = useMemo(
    () =>
      pageSizeOptions.includes(pageSize)
        ? pageSizeOptions
        : [...pageSizeOptions, pageSize],
    [pageSize, pageSizeOptions],
  );

  return (
    <ActionMenu>
      <ActionMenu.Trigger>
        <Button
          ref={forwardedRef}
          {...restProps}
          className={cl("data-grid-pagination-rows", restProps.className)}
          variant="tertiary"
          data-color="neutral"
          size="small"
          icon={<ChevronDownIcon aria-hidden />}
          iconPosition="right"
        >
          {text}
        </Button>
      </ActionMenu.Trigger>
      <ActionMenu.Content>
        {options.map((size) => (
          <ActionMenu.Item
            key={size}
            onSelect={() => setPageSize(size)}
            role="menuitemcheckbox"
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
});

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace DataGridPaginationRows {
  export type Props = DataGridPaginationRowsProps;
}

export { DataGridPaginationRows };
export type { DataGridPaginationRowsProps };
