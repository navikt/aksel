import React, { forwardRef } from "react";
import { Select, type SelectProps } from "../../../form/select";
import { cl } from "../../../utils/helpers";
import { useI18n } from "../../../utils/i18n/i18n.hooks";
import { useDataGridPaginationContext } from "../root/DataGridPaginationRoot.context";

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
 * <DataGridPagination data={pageRows} totalRows={150}>
 *   <DataGridPagination.PageSize />
 * </DataGridPagination>
 * ```
 */
const DataGridPaginationPageSize = forwardRef<
  HTMLSelectElement,
  DataGridPaginationPageSizeProps
>(({ className, style, ...rest }, forwardedRef) => {
  const { pageSize, pageSizeOptions, setPageSize } =
    useDataGridPaginationContext(
      true,
      "[Aksel] DataGridPagination.PageSize must be used within <DataGridPagination />",
    );
  const translate = useI18n("DataGrid");
  const options = pageSizeOptions.includes(pageSize)
    ? pageSizeOptions
    : [...pageSizeOptions, pageSize];

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
