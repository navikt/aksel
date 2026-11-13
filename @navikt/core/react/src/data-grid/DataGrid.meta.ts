import type { ComponentMetadata } from "../utils/types/metadata";
import { DataGrid, DataGridPreferences, DataGridTable } from "./index";

const metadata: ComponentMetadata = {
  name: "DataGrid",
  components: {
    DataGrid,
    "DataGrid.Table": DataGridTable,
    "DataGrid.Preferences": DataGridPreferences,
    "DataGrid.Pagination": DataGrid.Pagination,
    "DataGrid.PaginationRows": DataGrid.PaginationRows,
    "DataGrid.PaginationPages": DataGrid.PaginationPages,
  },
  keywords: ["data grid", "datagrid", "table", "tabell", "grid"],
  related: ["Table"],
};

export { metadata };
