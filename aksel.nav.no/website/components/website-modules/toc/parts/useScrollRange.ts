import { useClientLayoutEffect } from "@navikt/ds-react";
import throttle from "lodash/throttle";
import { useState } from "react";

function getOpacity(n: number): string {
  return Math.min(Math.min(Math.max(n, 0), 100) / 100, 1).toFixed(1);
}

export function useScrollRangeOpacity() {
  const [scrollBlock, setScrollBlock] = useState({ start: "0", end: "0" });

  useClientLayoutEffect(() => {
    const ref = document.getElementById("toc-scroll-wrapper");
    if (!ref) {
      return;
    }
    if (ref.scrollHeight > ref.clientHeight) {
      setScrollBlock({
        start: "0",
        end: getOpacity(ref.scrollHeight - ref.clientHeight),
      });
    }

    const onScroll = (event) =>
      setScrollBlock({
        start: getOpacity(event.target.scrollTop),
        end: getOpacity(
          Math.floor(
            event.target.scrollHeight -
              event.target.scrollTop -
              event.target.clientHeight
          )
        ),
      });

    const func = throttle(onScroll, 50);

    ref.addEventListener("scroll", func);
    return () => {
      ref.removeEventListener("scroll", func);
    };
  }, []);

  return scrollBlock;
}
