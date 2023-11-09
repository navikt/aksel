import { createContext, useContext } from "react";

export const SanityDocIdContext = createContext<{ id?: string }>(null);

export function useSanityDocId() {
  const ctx = useContext(SanityDocIdContext);
  if (!ctx) {
    console.error(
      "useSanityDocId has to be used inside SanityDocIdContext.provider"
    );
  }
  return ctx;
}
