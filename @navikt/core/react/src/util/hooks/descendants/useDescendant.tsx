/**
 * https://github.com/chakra-ui/chakra-ui/tree/5ec0be610b5a69afba01a9c22365155c1b519136/packages/components/descendant
 */
import React, { useRef, useState } from "react";
import { createContext } from "../../create-context";
import { useClientLayoutEffect } from "../useClientLayoutEffect";
import { useMergeRefs } from "../useMergeRefs";
import { DescendantOptions, DescendantsManager } from "./descendant";
import { cast } from "./utils";

/**
 * Provides strongly typed versions of the context provider and hooks above.
 */
export function createDescendantContext<
  T extends HTMLElement = HTMLElement,
  K extends Record<string, any> = object,
>() {
  const [DescendantsContextProvider, useDescendantsContext] = createContext<
    ReturnType<typeof useDescendants>
  >({
    name: "DescendantsProvider",
    errorMessage:
      "useDescendantsContext must be used within DescendantsProvider",
  });

  const ContextProvider = cast<React.Provider<DescendantsManager<T, K>>>(
    (props) => (
      <DescendantsContextProvider {...props.value}>
        {props.children}
      </DescendantsContextProvider>
    ),
  );

  /**
   * @internal
   * This hook provides information to descendant component:
   * - Index compared to other descendants
   * - ref callback to register the descendant
   * - Its enabled index compared to other enabled descendants
   */
  function useDescendant(options?: DescendantOptions<K>) {
    const descendants = useDescendantsContext();
    const [index, setIndex] = useState(-1);
    const ref = useRef<T>(null);

    useClientLayoutEffect(() => {
      return () => {
        if (!ref.current) return;
        // eslint-disable-next-line react-hooks/exhaustive-deps
        descendants.unregister(ref.current);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useClientLayoutEffect(() => {
      if (!ref.current) return;
      const dataIndex = Number(ref.current.dataset.index);
      if (index !== dataIndex && !Number.isNaN(dataIndex)) {
        setIndex(dataIndex);
      }
    });

    const refCallback = options
      ? cast<React.RefCallback<T>>(descendants.register(options))
      : cast<React.RefCallback<T>>(descendants.register);

    const refs = useMergeRefs(refCallback, ref);

    return {
      descendants,
      index,
      enabledIndex: descendants.enabledIndexOf(ref.current),
      register: refs,
    };
  }

  /**
   * @internal
   * Initializing DescendantsManager
   */
  function useDescendants() {
    const descendants = useRef(new DescendantsManager<T, K>()).current;

    return descendants;
  }

  return [
    // context provider
    ContextProvider,
    // call this when you need to read from context
    useDescendantsContext,
    // descendants state information, to be called and passed to `ContextProvider`
    useDescendants,
    // descendant index information
    useDescendant,
  ] as const;
}
