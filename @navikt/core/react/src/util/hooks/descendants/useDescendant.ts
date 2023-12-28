// https://github.com/chakra-ui/chakra-ui/tree/5ec0be610b5a69afba01a9c22365155c1b519136/packages/components/descendant
import { useRef, useState } from "react";
import mergeRefs from "../../mergeRefs";
import { useClientLayoutEffect } from "../../useClientLayoutEffect";
import { createContext } from "../context/create-context";
import { DescendantOptions, DescendantsManager } from "./descendant";
import { cast } from "./utils";

/**
 * @internal
 * React hook that initializes the DescendantsManager
 */
function useDescendants<
  T extends HTMLElement = HTMLElement,
  K extends Record<string, any> = object
>() {
  const descendants = useRef(new DescendantsManager<T, K>());
  useClientLayoutEffect(() => {
    return () => descendants.current.destroy();
  });
  return descendants.current;
}

export interface UseDescendantsReturn
  extends ReturnType<typeof useDescendants> {}

/* -------------------------------------------------------------------------------------------------
 * Descendants context to be used in component-land.
  - Mount the `DescendantsContextProvider` at the root of the component
  - Call `useDescendantsContext` anywhere you need access to the descendants information

  NB:  I recommend using `createDescendantContext` below
 * -----------------------------------------------------------------------------------------------*/

const [DescendantsContextProvider, useDescendantsContext] =
  createContext<UseDescendantsReturn>({
    name: "DescendantsProvider",
    errorMessage:
      "useDescendantsContext must be used within DescendantsProvider",
  });

/**
 * @internal
 * This hook provides information a descendant such as:
 * - Its index compared to other descendants
 * - ref callback to register the descendant
 * - Its enabled index compared to other enabled descendants
 */
function useDescendant<
  T extends HTMLElement = HTMLElement,
  K extends Record<string, any> = object
>(options?: DescendantOptions<K>) {
  const descendants = useDescendantsContext();
  const [index, setIndex] = useState(-1);
  const ref = useRef<T>(null);

  useClientLayoutEffect(() => {
    return () => {
      if (!ref.current) return;
      descendants.unregister(ref.current);
    };
  }, []);

  useClientLayoutEffect(() => {
    if (!ref.current) return;
    const dataIndex = Number(ref.current.dataset["index"]);
    if (index != dataIndex && !Number.isNaN(dataIndex)) {
      setIndex(dataIndex);
    }
  });

  const refCallback = options
    ? cast<React.RefCallback<T>>(descendants.register(options))
    : cast<React.RefCallback<T>>(descendants.register);

  return {
    descendants,
    index,
    enabledIndex: descendants.enabledIndexOf(ref.current),
    register: mergeRefs([refCallback, ref]),
  };
}

/* -------------------------------------------------------------------------------------------------
 * Function that provides strongly typed versions of the context provider and hooks above.
   To be used in component-land
 * -----------------------------------------------------------------------------------------------*/

export function createDescendantContext<
  T extends HTMLElement = HTMLElement,
  K extends Record<string, any> = object
>() {
  type ContextProviderType = React.Provider<DescendantsManager<T, K>>;
  const ContextProvider = cast<ContextProviderType>(DescendantsContextProvider);

  const _useDescendantsContext = () =>
    cast<DescendantsManager<T, K>>(useDescendantsContext());

  const _useDescendant = (options?: DescendantOptions<K>) =>
    useDescendant<T, K>(options);

  const _useDescendants = () => useDescendants<T, K>();

  return [
    // context provider
    ContextProvider,
    // call this when you need to read from context
    _useDescendantsContext,
    // descendants state information, to be called and passed to `ContextProvider`
    _useDescendants,
    // descendant index information
    _useDescendant,
  ] as const;
}
