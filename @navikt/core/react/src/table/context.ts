import { createContext } from "react";
import type { SortState } from "./types";

export interface TableContextProps {
  onSortChange?: (sortKey: string) => void;
  sort?: SortState;
}

export const TableContext = createContext<TableContextProps | null>(null);
