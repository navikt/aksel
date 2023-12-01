import { createContext } from "react";
import { FileItem } from "./Item";

export type ItemContextProps = {
  file: FileItem;
  locale: "nb" | "nn" | "en";
  onRetry: ((file: FileItem) => void) | undefined;
  onDelete: ((file: FileItem) => void) | undefined;
  isLoading: boolean | undefined;
  error: string | undefined;
};

export const ItemContext = createContext<ItemContextProps | null>(null);
