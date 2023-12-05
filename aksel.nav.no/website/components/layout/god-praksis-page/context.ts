import { createContext, useContext } from "react";
import { GpFrontPageProps, GpTemaPageProps } from "./types";

export const GpPageContext = createContext<GpFrontPageProps | GpTemaPageProps>(
  null
);

export function useGpPageContext() {
  const ctx = useContext(GpPageContext);

  if (!ctx) {
    console.error(
      "Trying to use useGpPageContext outside GpPageContext.provider"
    );
  }
  return ctx;
}
