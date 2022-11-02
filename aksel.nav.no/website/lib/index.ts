export * from "./sanity/queries";
export * from "./sanity/santiy";
export * from "./types/types";
export * from "./auth/auth";
export type { default as SanityT } from "./types/schema";

export function isDevelopment(): boolean {
  return process.env.NODE_ENV === "development";
}
