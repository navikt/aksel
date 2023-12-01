import { createContext } from "react";
import { FileItem } from "./props";

export type ItemContextProps = {
  file: FileItem;
  locale: "nb" | "nn" | "en";
  onRetry: ((file: FileItem) => void) | undefined;
  onDelete: ((file: FileItem) => void) | undefined;
  isLoading: boolean | undefined;
  error: string | undefined;
};

export const ItemContext = createContext<ItemContextProps | null>(null);
