import { createCurrentUserHook } from "next-sanity";
import { config } from "./config";

export const useCurrentUser = createCurrentUserHook(config);
