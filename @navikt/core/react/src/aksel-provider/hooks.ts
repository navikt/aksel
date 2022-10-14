import { useContext } from "react";
import { AkselProviderContext } from "./AkselProvider";

export function useSizeManager<
  T extends "medium" | "small" | "xsmall" | undefined
>(size: T): "medium" | "small" | NonNullable<T> {
  const ctx = useContext(AkselProviderContext);

  return size ?? ctx?.size ?? "medium";
}
