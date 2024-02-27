import { createContext, useContext } from "react";

export const SanityDataContext = createContext<{
  id?: string;
  validUser: boolean;
} | null>(null);

export function useSanityData() {
  const ctx = useContext(SanityDataContext);
  if (!ctx) {
    console.error(
      "useSanityData has to be used inside SanityDataContext.provider",
    );
  }
  return ctx;
}
