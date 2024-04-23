/* https://github.com/radix-ui/primitives/blob/main/packages/react/compose-refs/src/composeRefs.tsx */
import React from "react";

type PossibleRef<T> = React.LegacyRef<T> | undefined;

// https://github.com/gregberge/react-merge-refs
/**
 * Use `useMergeRefs`
 * @internal
 */
export function mergeRefs<T>(refs: PossibleRef<T>[]): React.RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref !== null && ref !== undefined) {
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    });
  };
}

/**
 * Merges refs within useCallback
 * @internal
 * @param ...refs: React.Ref<T> | undefined
 * @returns React.useCallback(mergeRefs(refs), refs)
 */
export function useMergeRefs<T>(...refs: PossibleRef<T>[]) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useCallback(mergeRefs(refs), refs);
}
