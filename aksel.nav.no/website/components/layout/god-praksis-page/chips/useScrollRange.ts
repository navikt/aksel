import throttle from "lodash/throttle";
import { useRouter } from "next/router";
import { useState } from "react";
import { useClientLayoutEffect } from "@navikt/ds-react";

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
    setScrollInline({
      start: false,
      end: ref.scrollWidth - ref.clientWidth - ref.scrollLeft > 0,
    });

    const onScroll = () => {
      setScrollInline({
        start: ref.scrollLeft > 0,
        end: ref.scrollWidth - ref.clientWidth - ref.scrollLeft > 0,
      });
    };

    const func = throttle(onScroll, 50);

    ref.addEventListener("scroll", func);
    return () => {
      ref.removeEventListener("scroll", func);
    };
  }, [router.asPath]);

  return scrollInline;
}
