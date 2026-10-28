import React, { forwardRef, useMemo } from "react";
import { Select, type SelectProps } from "../../../form/select";
import { cl } from "../../../utils/helpers";
import { useI18n } from "../../../utils/i18n/i18n.hooks";
import { useDataGridRootPaginationContext } from "../../root/DataGridRoot.context";

type DataGridPaginationPageSizeProps = Omit<
  SelectProps,
  "children" | "label" | "value" | "onChange"
>;

/**
 * Lets users choose how many rows to display per page.
 *
 * @see 🏷️ {@link DataGridPaginationPageSizeProps}
 *
 * @example
 * ```jsx
 * <DataGrid columns={columns} data={rows} pagination={{}}>
 *   <DataGrid.Pagination>
 *     <DataGrid.Pagination.PageSize />
 *   </DataGrid.Pagination>
 * </DataGrid>
 * ```
 */
const DataGridPaginationPageSize = forwardRef<
  HTMLSelectElement,
  DataGridPaginationPageSizeProps
>(({ className, style, ...rest }, forwardedRef) => {
  const { pageSize, pageSizeOptions, setPageSize } =
    useDataGridRootPaginationContext(
      true,
      "[Aksel] DataGrid.Pagination.PageSize must be used within <DataGrid pagination={...}>",
    );
  const translate = useI18n("DataGrid");
  const options = useMemo(
    () =>
      pageSizeOptions.includes(pageSize)
        ? pageSizeOptions
        : [...pageSizeOptions, pageSize],
    [pageSize, pageSizeOptions],
  );

  return (
    <Select
      {...rest}
      ref={forwardedRef}
      className={cl("aksel-data-grid__pagination-page-size", className)}
      label={translate("Pagination.pageSize")}
      size="small"
      style={{ width: "auto", ...style }}
      value={pageSize}
      onChange={(event) => setPageSize(Number(event.currentTarget.value))}
    >
      {options.map((size) => (
        <option key={size} value={size}>
          {size}
        </option>
      ))}
    </Select>
  );
});

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace DataGridPaginationPageSize {
  export type Props = DataGridPaginationPageSizeProps;
}

export { DataGridPaginationPageSize };
export type { DataGridPaginationPageSizeProps };
