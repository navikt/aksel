// https://github.com/chakra-ui/chakra-ui/tree/5ec0be610b5a69afba01a9c22365155c1b519136/packages/components/descendant
import { useRef, useState } from "react";
import { useClientLayoutEffect } from "../../useClientLayoutEffect";
import { createContext } from "../context/create-context";
import { mergeRefs } from "../useMergeRefs";
import { DescendantOptions, DescendantsManager } from "./descendant";
import { cast } from "./utils";

/**
 * @internal
 * Initializing DescendantsManager
 */
function useDescendants<
  T extends HTMLElement = HTMLElement,
  K extends Record<string, any> = object,
>() {
  const descendants = useRef(new DescendantsManager<T, K>()).current;
  useClientLayoutEffect(() => {
    return () => {
      descendants.destroy();
    };
  });

  return descendants;
}

const [DescendantsContextProvider, useDescendantsContext] = createContext<
  ReturnType<typeof useDescendants>
>({
  name: "DescendantsProvider",
  errorMessage: "useDescendantsContext must be used within DescendantsProvider",
});

/**
 * @internal
 * This hook provides information to descendant component:
 * - Index compared to other descendants
 * - ref callback to register the descendant
 * - Its enabled index compared to other enabled descendants
 */
function useDescendant<
  T extends HTMLElement = HTMLElement,
  K extends Record<string, any> = object,
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

/**
 * Provides strongly typed versions of the context provider and hooks above.
 */
export function createDescendantContext<
  T extends HTMLElement = HTMLElement,
  K extends Record<string, any> = object,
>() {
  const ContextProvider = cast<React.Provider<DescendantsManager<T, K>>>(
    DescendantsContextProvider,
  );

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
