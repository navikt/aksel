import React from "react";

const maybeReactUseDeferredValue: undefined | ((string: string) => string) = (
  React as any
)[
  "useDeferredValue" + "" // Workaround for https://github.com/webpack/webpack/issues/14814
];

export const useDeferredValue = (value: string): string =>
  maybeReactUseDeferredValue !== undefined
    ? maybeReactUseDeferredValue(value)
    : value;
