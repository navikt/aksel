import { createContext } from "react";
import type { SortState } from "../Table.types";

interface TableContextProps {
  onSortChange?: (sortKey: string) => void;
  sort?: SortState;
}

const TableContext = createContext<TableContextProps | null>(null);

export { TableContext };
export type { TableContextProps };
