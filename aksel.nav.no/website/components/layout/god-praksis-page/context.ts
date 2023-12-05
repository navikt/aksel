import { createContext, useContext } from "react";
import { GpFrontPageProps, GpTemaPageProps } from "./types";

type GpPageContextProps =
  | (GpFrontPageProps & { type: "frontpage" })
  | (GpTemaPageProps & { type: "tema-page" });

export const GpPageContext = createContext<GpPageContextProps>(null);

export function useGpPageContext() {
  const ctx = useContext(GpPageContext);

  if (!ctx) {
    console.error(
      "Trying to use useGpPageContext outside GpPageContext.provider"
    );
  }
  return ctx;
}
