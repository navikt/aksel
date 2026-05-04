/**
 * Custom createStrictContext to consolidate context-implementation across the system.
 * Unlike React's createContext, this throws an error by default when used outside a provider.
 *
 * Inspired by:
 * - https://github.com/radix-ui/primitives/blob/main/packages/react/context/src/createContext.tsx
 * - https://github.com/chakra-ui/chakra-ui/blob/5ec0be610b5a69afba01a9c22365155c1b519136/packages/hooks/context/src/index.ts
 */
import React, {
  createContext as createReactContext,
  useContext as useReactContext,
} from "react";

type ProviderProps<T> = T & { children: React.ReactNode; ref?: never };

function getErrorMessage(name: string) {
  return `Aksel: use${name}Context returned \`undefined\`. Seems you forgot to wrap component within ${name}Provider`;
}

/* -----------------------------------------------------------------------------
 * Overload signatures
 * -------------------------------------------------------------------------- */

/**
 * When defaultValue is provided, context is always defined.
 * The hook will always return T (no strict parameter needed).
 */
function createStrictContext<T>(options: {
  name: string;
  errorMessage?: string;
  defaultValue: T;
}): { Provider: React.FC<ProviderProps<T>>; useContext: () => T };

/**
 * When no defaultValue is provided, context may be undefined.
 * The hook accepts an optional `strict` parameter (default: true).
 * - strict=true (default): throws if undefined, returns T
 * - strict=false: returns T | undefined
 */
function createStrictContext<T>(options: {
  name: string;
  errorMessage?: string;
  defaultValue?: undefined;
}): {
  Provider: React.FC<ProviderProps<T>>;
  useContext: <S extends boolean = true>(
    strict?: S,
  ) => S extends true ? T : T | undefined;
};

/* -----------------------------------------------------------------------------
 * Implementation
 * -------------------------------------------------------------------------- */

function createStrictContext<T>(options: {
  name: string;
  errorMessage?: string;
  defaultValue?: T;
}) {
  const { name, defaultValue, errorMessage } = options;
  const hasDefault = "defaultValue" in options;

  const Context = createReactContext<T | undefined>(defaultValue);
  Context.displayName = name;

  function Provider({ children, ...context }: ProviderProps<T>) {
    // biome-ignore lint/correctness/useExhaustiveDependencies: Object.values(context) includes all dependencies.
    const value = React.useMemo(() => context, Object.values(context)) as T; // eslint-disable-line react-hooks/exhaustive-deps

    return <Context.Provider value={value}>{children}</Context.Provider>;
  }

  Provider.displayName = `${name}Provider`;

  function useContext(strict = true) {
    const context = useReactContext(Context);

    if (!hasDefault && !context && strict) {
      const error = new Error(errorMessage ?? getErrorMessage(name));
      error.name = "ContextError";
      Error.captureStackTrace?.(error, useContext);
      throw error;
    }

    return context;
  }

  return { Provider, useContext } as const;
}

export { createStrictContext };
