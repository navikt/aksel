/**
 * Custom createContext to consolidate context-implementation across the system
 * Inspired by:
 * - https://github.com/radix-ui/primitives/blob/main/packages/react/context/src/createContext.tsx
 * - https://github.com/chakra-ui/chakra-ui/blob/5ec0be610b5a69afba01a9c22365155c1b519136/packages/hooks/context/src/index.ts
 */
import React, {
  createContext as createReactContext,
  forwardRef,
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

  /**
   * We use forwardRef to allow `ref` to be used as a regular context value
   * @see https://reactjs.org/docs/forwarding-refs.html#forwarding-refs-to-dom-components
   */
  const Provider = forwardRef<unknown, ProviderProps<T>>(
    ({ children, ...context }, ref) => {
      // Only re-memoize when prop values change

      // biome-ignore lint/correctness/useExhaustiveDependencies: Object.values(context) includes all dependencies.
      const value = React.useMemo(() => context, Object.values(context)) as T; // eslint-disable-line react-hooks/exhaustive-deps

      return (
        <Context.Provider value={ref ? { ...value, ref } : value}>
          {children}
        </Context.Provider>
      );
    },
  );

  function useContext<S extends boolean = true>(
    strict: S = true as S,
  ): Context<S, T> {
    const context = useReactContext(Context);

    if (!context && strict) {
      const error = new Error(
        errorMessage ?? getErrorMessage(hookName, providerName),
      );
      error.name = "ContextError";
      Error.captureStackTrace?.(error, useContext);
      throw error;
    }

    return context as Context<S, T>;
  }

  Context.displayName = name;

  return [Provider, useContext] as const;
}

type Context<S, T> = S extends true ? T : T | undefined;
