import { useContext } from "react";
import { AppProviderContext } from "./AppProvider";

export function useSizeManager<
  T extends "medium" | "small" | "xsmall" | undefined
>(size: T): "medium" | "small" | NonNullable<T> {
  const ctx = useContext(AppProviderContext);

  return size ?? ctx?.size ?? "medium";
}
