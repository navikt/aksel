import type { ComponentMetadata } from "../utils/types/metadata";
import { DataGrid, DataGridPreferences, DataGridTable } from "./index";

const metadata: ComponentMetadata = {
  name: "DataGrid",
  components: {
    DataGrid,
    "DataGrid.Table": DataGridTable,
    "DataGrid.Preferences": DataGridPreferences,
  },
  keywords: ["data grid", "datagrid", "table", "tabell", "grid"],
  related: ["Table"],
};

export { metadata };
