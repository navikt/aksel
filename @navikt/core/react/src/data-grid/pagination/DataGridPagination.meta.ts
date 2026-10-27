import type { ComponentMetadata } from "../../utils/types/metadata";
import { DataGridPagination } from "./index";

const metadata: ComponentMetadata = {
  name: "DataGridPagination",
  components: {
    DataGridPagination,
    "DataGridPagination.Summary": DataGridPagination.Summary,
    "DataGridPagination.PageSize": DataGridPagination.PageSize,
    "DataGridPagination.Navigation": DataGridPagination.Navigation,
  },
  keywords: ["pagination", "paginering", "table", "data grid"],
  related: ["DataGrid"],
};

export { metadata };
