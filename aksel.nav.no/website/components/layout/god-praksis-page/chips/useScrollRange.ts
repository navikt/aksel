import throttle from "lodash/throttle";
import { useRouter } from "next/router";
import { useState } from "react";
import { useClientLayoutEffect } from "@navikt/ds-react";

/**
 * TODO: Add resizeObserver here?
 * - Will user actually resize app? If not, ignore
 */
export function useScrollRangeOpacity(id: string) {
  const [scrollInline, setScrollInline] = useState({
    start: false,
    end: false,
  });
  const router = useRouter();

  useClientLayoutEffect(() => {
    const ref = document.getElementById(id);
    if (!ref) {
      return;
    }

    const onScroll = () => {
      setScrollInline({
        start: ref.scrollLeft > 1,
        end: ref.scrollLeft < ref.scrollWidth - ref.clientWidth - 1,
      });
    };

    const func = throttle(onScroll, 50);

    onScroll();
    ref.addEventListener("scroll", func);
    return () => {
      ref.removeEventListener("scroll", func);
    };
  }, [router.asPath]);

  return scrollInline;
}
