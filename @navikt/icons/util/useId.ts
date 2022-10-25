//https://github.com/mui/material-ui/blob/master/packages/mui-utils/src/useId.ts
import { useEffect, useState } from "react";

let globalId = 0;
function useGlobalId(idOverride?: string): string | undefined {
  const [defaultId, setDefaultId] = useState(idOverride);
  const id = idOverride || defaultId;
  useEffect(() => {
    if (defaultId == null) {
      // Fallback to this default id when possible.
      // Use the incrementing value for client-side rendering only.
      // We can't use it server-side.
      // If you want to use random values please consider the Birthday Problem: https://en.wikipedia.org/wiki/Birthday_problem
      globalId += 1;
      setDefaultId(`aksel-icon-${globalId}`);
    }
  }, [defaultId]);
  return id;
}
/**
 *
 * @example <div id={useId()} />
 * @param idOverride
 * @returns {string}
 */
export function useId(idOverride?: string): string | undefined {
  // eslint-disable-next-line react-hooks/rules-of-hooks -- `useId` is invariant at runtime.
  return useGlobalId(idOverride);
}
