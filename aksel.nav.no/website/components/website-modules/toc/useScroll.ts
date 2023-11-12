import { useClientLayoutEffect } from "@navikt/ds-react";
import throttle from "lodash/throttle";
import { useState } from "react";

export function useScroll(ref: HTMLElement | null, enabled: boolean) {
  const [scrollBlock, setScrollBlock] = useState({ start: 0, end: 0 });

  useClientLayoutEffect(() => {
    if (!ref || !enabled) {
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
  }, [ref, enabled]);

  return scrollBlock;
}
