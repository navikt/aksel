import { useEffect, useMemo, useRef } from "react";
import { debounce } from "../../../utils-external";
import type {
  ComboboxGroupData,
  ComboboxOptionData,
} from "../root/ComboboxRoot";
import { useAnnounce } from "./useAnnounce";

function getNumberOfOptions<T extends ComboboxOptionData>(
  options: (T | ComboboxGroupData<T>)[],
) {
  return options.reduce((count, optOrGroup) => {
    if ("options" in optOrGroup) {
      return count + optOrGroup.options.length;
    }
    return count + 1;
  }, 0);
}

function useHitsAnnouncer(deferredFilterString: string, filterString: string) {
  const shouldAnnounceRef = useRef(false);
  const announce = useAnnounce();
  const announceHits = useMemo(
    () => debounce((hits: number) => announce(`${hits} treff`), 2000),
    [announce],
  );
  const announceNoHits = useMemo(
    () => debounce(() => announce(`Ingen treff`), 500),
    [announce],
  );
  useEffect(
    () =>
      function cleanUp() {
        announceHits.clear();
        announceNoHits.clear();
      },
    [announceHits, announceNoHits],
  );

  return (
    filteredOptions: (
      ComboboxOptionData | ComboboxGroupData<ComboboxOptionData>
    )[],
  ) => {
    // The options are filtered based on deferredFilterString, so we need to wait for it to settle.
    if (deferredFilterString !== filterString) {
      shouldAnnounceRef.current = true;
    } else if (shouldAnnounceRef.current) {
      if (filteredOptions.length === 0) {
        announceHits.clear();
        announceNoHits();
      } else {
        const hits = getNumberOfOptions(filteredOptions);
        announceNoHits.clear();
        announceHits(hits);
      }
      shouldAnnounceRef.current = false;
    }
  };
}

export { useHitsAnnouncer };
