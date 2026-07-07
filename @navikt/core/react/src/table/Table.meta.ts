import type { ComponentMetadata } from "../utils/types/metadata";
import {
  Table,
  TableBody,
  TableColumnHeader,
  TableDataCell,
  TableExpandableRow,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "./index";

const metadata: ComponentMetadata = {
  name: "Table",
  components: {
    Table,
    "Table.Header": TableHeader,
    "Table.Body": TableBody,
    "Table.Row": TableRow,
    "Table.ColumnHeader": TableColumnHeader,
    "Table.HeaderCell": TableHeaderCell,
    "Table.DataCell": TableDataCell,
    "Table.ExpandableRow": TableExpandableRow,
  },
  keywords: ["table", "tabell", "grid", "rows", "data"],
  related: ["DataGrid"],
};

export { metadata };
