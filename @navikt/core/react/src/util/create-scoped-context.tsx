import React from "react";

type Scope<C = any> = { [scopeName: string]: React.Context<C>[] } | undefined;
type ScopeHook = (scope: Scope) => { [__scopeProp: string]: Scope };
interface CreateScope {
  scopeName: string;
  (): ScopeHook;
}

/**
 * Create a scoped context. This scopes the context for a specific component tree.
 * This is useful when you have multiple instances of the same context API in the same component, but want to keep them separate.
 * Example scenario:
 * - You have a component that renders a list of items, and each item registers on the `descendant`-context.
 * - You use a different component using the `descendant`-context within the item component.
 * - Without scoping, the descendant context would be shared between all items.
 *
 * @param scopeName Name of the scope
 * @param createContextScopeDeps Array of scoped contexts to compose with
 */
function createContextScope(
  scopeName: string,
  createContextScopeDeps: CreateScope[] = [],
) {
  let defaultContexts: any[] = [];

  /**
   * @param rootComponentName Name of the root component (used for error messages)
   * @param defaultContext default context-value
   * @returns [Provider, useContext]
   */
  function createScopedContext<ContextValueType extends object | null>(
    rootComponentName: string,
    defaultContext?: ContextValueType,
  ) {
    const BaseContext = React.createContext<ContextValueType | undefined>(
      defaultContext,
    );
    const index = defaultContexts.length;
    defaultContexts = [...defaultContexts, defaultContext];

    function Provider(
      props: ContextValueType & {
        scope: Scope<ContextValueType>;
        children: React.ReactNode;
      },
    ) {
      const { scope, children, ...context } = props;
      const Context = scope?.[scopeName][index] || BaseContext;
      // Only re-memoize when prop values change
      const value = React.useMemo(
        () => context,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        Object.values(context),
      ) as ContextValueType;
      return <Context.Provider value={value}>{children}</Context.Provider>;
    }

    function useContext(
      consumerName: string,
      scope: Scope<ContextValueType | undefined>,
    ) {
      const Context = scope?.[scopeName][index] || BaseContext;
      const context = React.useContext(Context);
      if (context) return context;
      if (defaultContext !== undefined) return defaultContext;
      // if a defaultContext wasn't specified, it's a required context.
      throw new Error(
        `\`${consumerName}\` must be used within \`${rootComponentName}\``,
      );
    }

    Provider.displayName = rootComponentName + "Provider";
    return [Provider, useContext] as const;
  }

  /* -----------------------------------------------------------------------------------------------
   * createScope
   * ---------------------------------------------------------------------------------------------*/

  const createScope: CreateScope = () => {
    const scopeContexts = defaultContexts.map((defaultContext) => {
      return React.createContext(defaultContext);
    });
    return function useScope(scope: Scope) {
      const contexts = scope?.[scopeName] || scopeContexts;
      return React.useMemo(
        () => ({
          [`__scope${scopeName}`]: { ...scope, [scopeName]: contexts },
        }),
        [scope, contexts],
      );
    };
  };

  createScope.scopeName = scopeName;
  return [
    createScopedContext,
    composeContextScopes(createScope, ...createContextScopeDeps),
  ] as const;
}

/**
 * Compose multiple scopes into a single scope.
 */
function composeContextScopes(...scopes: CreateScope[]) {
  const baseScope = scopes[0];
  if (scopes.length === 1) return baseScope;

  const createScope: CreateScope = () => {
    const scopeHooks = scopes.map((_createScope) => ({
      useScope: _createScope(),
      scopeName: _createScope.scopeName,
    }));

    return function useComposedScopes(overrideScopes) {
      const nextScopes = scopeHooks.reduce(
        (_nextScopes, { useScope, scopeName }) => {
          // We are calling a hook inside a callback which React warns against to avoid inconsistent
          // renders, however, scoping doesn't have render side effects so we ignore the rule.
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const scopeProps = useScope(overrideScopes);
          const currentScope = scopeProps[`__scope${scopeName}`];
          return { ..._nextScopes, ...currentScope };
        },
        {},
      );

      return React.useMemo(
        () => ({ [`__scope${baseScope.scopeName}`]: nextScopes }),
        [nextScopes],
      );
    };
  };

  createScope.scopeName = baseScope.scopeName;
  return createScope;
}

export { createContextScope, type CreateScope, type Scope };
