import { createContext } from "react";
import { PagePropsContextT } from "@/lib";

export const PagePropsContext = createContext<PagePropsContextT>(null);

export const IdContext = createContext<{ id?: string }>(null);

export * from "./authprovider";
