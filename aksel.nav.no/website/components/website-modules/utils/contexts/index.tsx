import { createContext } from "react";
import { PagePropsContextT } from "@/lib";

export const PagePropsContext = createContext<PagePropsContextT>(null);

export * from "./authprovider";
export * from "./id-context";
