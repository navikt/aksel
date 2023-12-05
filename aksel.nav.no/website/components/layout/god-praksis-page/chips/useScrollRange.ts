import throttle from "lodash/throttle";
import { useRouter } from "next/router";
import { useState } from "react";
import { useClientLayoutEffect } from "@navikt/ds-react";

function getOpacity(n: number): string {
  return Math.min(Math.min(Math.max(n, 0), 100) / 100, 1).toFixed(1);
}

export function useScrollRangeOpacity(id: string) {
  const [scrollInline, setScrollInline] = useState({ start: "0", end: "0" });
  const router = useRouter();

  useClientLayoutEffect(() => {
    console.log(id);
    const ref = document.getElementById(id);
    console.count("before");
    if (!ref) {
      return;
    }
    console.count("after");
    setScrollInline({
      start: "0",
      end: getOpacity(ref.scrollWidth - ref.clientWidth - ref.scrollLeft),
    });

    const onScroll = () =>
      setScrollInline({
        start: getOpacity(ref.scrollLeft),
        end: getOpacity(
          Math.floor(ref.scrollWidth - ref.clientWidth - ref.scrollLeft)
        ),
      });

    const func = throttle(onScroll, 50);

    ref.addEventListener("scroll", func);
    return () => {
      ref.removeEventListener("scroll", func);
    };
  }, [router.asPath]);

  return scrollInline;
}
