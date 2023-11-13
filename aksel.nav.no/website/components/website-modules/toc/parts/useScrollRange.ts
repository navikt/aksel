import { useClientLayoutEffect } from "@navikt/ds-react";
import throttle from "lodash/throttle";
import { useState } from "react";

export function useScrollRange() {
  const [scrollBlock, setScrollBlock] = useState({ start: 0, end: 0 });

  useClientLayoutEffect(() => {
    const ref = document.getElementById("toc-scroll-wrapper");
    if (!ref) {
      return;
    }
    if (ref.scrollHeight > ref.clientHeight) {
      setScrollBlock({ start: 0, end: ref.scrollHeight - ref.clientHeight });
    }

    const onScroll = (event) =>
      setScrollBlock({
        start: event.target.scrollTop,
        end: Math.floor(
          event.target.scrollHeight -
            event.target.scrollTop -
            event.target.clientHeight
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
