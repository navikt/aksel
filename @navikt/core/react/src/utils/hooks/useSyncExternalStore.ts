import React from "react";
import {
  type UseSyncExternalStore,
  useSyncExternalStoreShim,
} from "./useSyncExternalStoreShim";

const maybeReactUseSyncExternalStore: UseSyncExternalStore | undefined = (
  React as any
)["useSyncExternalStore" + ""]; // Workaround for https://github.com/webpack/webpack/issues/14814

const useSyncExternalStore: UseSyncExternalStore =
  maybeReactUseSyncExternalStore ?? useSyncExternalStoreShim;

export { useSyncExternalStore };
