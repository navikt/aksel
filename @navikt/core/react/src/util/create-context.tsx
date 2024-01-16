/**
 * Custom createContext to consolidate context-implementation across the system
 * Inspired by:
 * - https://github.com/radix-ui/primitives/blob/main/packages/react/context/src/createContext.tsx
 * - https://github.com/chakra-ui/chakra-ui/blob/5ec0be610b5a69afba01a9c22365155c1b519136/packages/hooks/context/src/index.ts
 */
import React, {
  createContext as createReactContext,
  useContext as useReactContext,
} from "react";

export interface CreateContextOptions<T> {
  hookName?: string;
  providerName?: string;
  errorMessage?: string;
  name?: string;
  defaultValue?: T;
}

type ProviderProps<T> = T & { children: React.ReactNode };

export type CreateContextReturn<T> = [
  (contextValues: ProviderProps<T>) => React.JSX.Element,
  () => T,
];

function getErrorMessage(hook: string, provider: string) {
  return `${hook} returned \`undefined\`. Seems you forgot to wrap component within ${provider}`;
}

export function createContext<T>(options: CreateContextOptions<T> = {}) {
  const {
    name,
    hookName = "useContext",
    providerName = "Provider",
    errorMessage,
    defaultValue,
  } = options;

  const Context = createReactContext<T | undefined>(defaultValue);

  function Provider({ children, ...context }: ProviderProps<T>) {
    // Only re-memoize when prop values change
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const value = React.useMemo(() => context, Object.values(context)) as T;
    return <Context.Provider value={value}>{children}</Context.Provider>;
  }

  function useContext() {
    const context = useReactContext(Context);

    if (!context) {
      const error = new Error(
        errorMessage ?? getErrorMessage(hookName, providerName),
      );
      error.name = "ContextError";
      Error.captureStackTrace?.(error, useContext);
      throw error;
    }

    return context;
  }

  Context.displayName = name;

  return [Provider, useContext] as CreateContextReturn<T>;
}
