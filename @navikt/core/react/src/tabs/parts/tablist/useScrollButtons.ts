import { useEffect, useMemo, useState } from "react";
import { debounce } from "../../../util";

export function useScrollButtons(listRef: React.RefObject<HTMLDivElement>) {
  const [displayScroll, setDisplayScroll] = useState({
    start: false,
    end: false,
  });

  const updateScrollButtonState = useMemo(
    () =>
      debounce(() => {
        if (!listRef?.current) return;
        const { scrollWidth, clientWidth } = listRef.current;
        const scrollLeft = listRef.current.scrollLeft;
        // use 1 for the potential rounding error with browser zooms.
        const showStartScroll = scrollLeft > 1;
        const showEndScroll = scrollLeft < scrollWidth - clientWidth - 1;

        setDisplayScroll((oldDisplayScroll) =>
          showStartScroll === oldDisplayScroll.start &&
          showEndScroll === oldDisplayScroll.end
            ? oldDisplayScroll
            : { start: showStartScroll, end: showEndScroll },
        );
      }),
    [listRef],
  );

  useEffect(() => {
    const handleResize = () => updateScrollButtonState();
    const win = listRef.current?.ownerDocument ?? document ?? window;
    win.addEventListener("resize", handleResize);

    let resizeObserver;

    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(listRef.current);
    }

    return () => {
      win.removeEventListener("resize", handleResize);
      resizeObserver && resizeObserver.disconnect();
      updateScrollButtonState.clear();
    };
  }, [listRef, updateScrollButtonState]);

  useEffect(() => {
    updateScrollButtonState();
  });

  return {
    update: updateScrollButtonState,
    start: displayScroll.start,
    end: displayScroll.end,
    show: displayScroll.end || displayScroll.start,
    scrollLeft: () => {
      if (listRef.current) {
        listRef.current.scrollLeft -= 100;
      }
    },
    scrollRight: () => {
      if (listRef.current) {
        listRef.current.scrollLeft += 100;
      }
    },
  };
}
