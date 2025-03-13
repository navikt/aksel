import throttle from "lodash/throttle";
import { useRouter } from "next/router";
import { useState } from "react";
import { useClientLayoutEffect } from "@navikt/ds-react";

function getOpacity(n: number): string {
  return Math.min(Math.min(Math.max(n, 0), 100) / 100, 1).toFixed(1);
}

function useScrollRangeOpacity() {
  const [scrollBlock, setScrollBlock] = useState({ start: "0", end: "0" });
  const router = useRouter();

  useClientLayoutEffect(() => {
    const ref = document.getElementById("toc-scroll-wrapper");
    if (!ref) {
      return;
    }
    setScrollBlock({
      start: "0",
      end: getOpacity(ref.scrollHeight - ref.clientHeight),
    });

    const onScroll = (event) =>
      setScrollBlock({
        start: getOpacity(event.target.scrollTop),
        end: getOpacity(
          Math.floor(
            event.target.scrollHeight -
              event.target.scrollTop -
              event.target.clientHeight,
          ),
        ),
      });

    const func = throttle(onScroll, 50);

    ref.addEventListener("scroll", func);
    return () => {
      ref.removeEventListener("scroll", func);
    };
  }, [router.asPath]);

  return scrollBlock;
}

export { useScrollRangeOpacity };
