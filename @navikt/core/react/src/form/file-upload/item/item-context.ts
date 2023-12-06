import { MouseEvent, createContext } from "react";
import { FileItem } from "./types";

export type ItemContextProps = {
  file: FileItem;
  locale: "nb" | "nn" | "en";
  onRetry: ((event: MouseEvent<HTMLButtonElement>) => void) | undefined;
  onDelete: ((event: MouseEvent<HTMLButtonElement>) => void) | undefined;
  isLoading: boolean | undefined;
  error: string | undefined;
  href: string | undefined;
  onClick: ((event: MouseEvent<HTMLAnchorElement>) => void) | undefined;
};

export const ItemContext = createContext<ItemContextProps | null>(null);
