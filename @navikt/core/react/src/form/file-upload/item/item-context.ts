import { createContext } from "react";
import { FileItem } from "./props";

export type ItemContextProps = {
  file: FileItem;
  locale: "nb" | "nn" | "en";
  onRetry: (() => void) | undefined;
  onDelete: (() => void) | undefined;
  isLoading: boolean | undefined;
  error: string | undefined;
  href: string | undefined;
  onClick: (() => void) | undefined;
};

export const ItemContext = createContext<ItemContextProps | null>(null);
