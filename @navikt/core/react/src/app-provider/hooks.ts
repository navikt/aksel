import { useContext } from "react";
import { AppProviderContext } from "./AppProvider";

export function useSizeManager({ size }: { size?: string }) {
  const ctx = useContext(AppProviderContext);

  return size ?? ctx?.size;
}
