import { useCallback, useEffect, useMemo, useRef } from "react";
import { debounce } from "../../../utils-external";
import { useTimeout } from "../../../utils/hooks";
import { useI18n } from "../../../utils/i18n/i18n.hooks";
import type {
  ComboboxGroupData,
  ComboboxOptionData,
} from "../root/ComboboxRoot";

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

function useHitsAnnouncer(
  deferredFilterString: string,
  liveRegionRef: React.RefObject<HTMLDivElement | null>,
) {
  const translate = useI18n("Combobox2");
  const oldFilterStringRef = useRef(deferredFilterString);
  const timeout = useTimeout();

  const announce = useCallback(
    (message: string) => {
      if (!liveRegionRef.current) {
        return;
      }
      const target = liveRegionRef.current;
      // If the message is the same as the current text,
      // append a non-breaking space to force a re-announcement.
      target.textContent =
        message === target.textContent ? `${message} ` : message; // eslint-disable-line no-irregular-whitespace
      timeout.start(2000, () => {
        target.textContent = "";
      });
    },
    [liveRegionRef, timeout],
  );

  const announceHits = useMemo(() => {
    return debounce((count: number) => {
      return announce(
        count === 1 ? translate("oneHit") : translate("hitsCount", { count }),
      );
    }, 2000);
  }, [announce, translate]);

  const announceNoHits = useMemo(
    () => debounce(() => announce(translate("noHits")), 500),
    [announce, translate],
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
    // Announce number of hits when filter string changes.
    // We can't do this in a useEffect b.c. of how ComboboxList is structured. Consider refactoring.
    if (deferredFilterString === oldFilterStringRef.current) {
      return;
    }
    if (filteredOptions.length === 0) {
      announceHits.clear();
      announceNoHits();
    } else {
      const hits = getNumberOfOptions(filteredOptions);
      announceNoHits.clear();
      announceHits(hits);
    }
    oldFilterStringRef.current = deferredFilterString;
  };
}

export { useHitsAnnouncer };
