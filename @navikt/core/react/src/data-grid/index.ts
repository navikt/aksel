"use client";
export { DataGrid } from "./root/DataGridRoot";
export { DataGridTable } from "../data/table/root/DataGridTableRoot";
export { DataGridPreferences } from "../data-grid-preferences";
// TODO: Review whether `paginateData` should also be exported outside the `"use client"` boundary for React Server Components.
export { paginateData, useDataGridPagination } from "./plugins/pagination";
export type { UseDataGridPaginationConfig } from "./plugins/pagination";
export type {
  DataGridPlugin,
  DataGridPlugins,
} from "./plugins/dataGridPlugins";
