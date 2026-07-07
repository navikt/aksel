import type { ComponentMetadata } from "../utils/types/metadata";
import { DataGrid, DataGridTable } from "./index";

const metadata: ComponentMetadata = {
  name: "DataGrid",
  components: {
    DataGrid,
    DataGridTable,
  },
  keywords: ["data grid", "datagrid", "table", "tabell", "grid"],
  related: ["Table", "DataGridPreferences"],
};

export { metadata };
