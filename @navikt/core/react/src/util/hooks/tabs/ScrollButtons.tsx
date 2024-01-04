import cl from "clsx";
import React, { useEffect, useMemo, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@navikt/aksel-icons";
import debounce from "../../debounce";

interface ScrollButtonsProps {
  listRef: React.RefObject<HTMLDivElement>;
}

const ScrollButtons = ({ listRef }: ScrollButtonsProps) => {
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
            : { start: showStartScroll, end: showEndScroll }
        );
      }),
    [listRef]
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

  const showSteppers = displayScroll.end || displayScroll.start;

  if (!showSteppers) {
    return null;
  }

  return (
    <>
      <ScrollButton dir={-1} hidden={!displayScroll.start} listRef={listRef} />
      <ScrollButton dir={1} hidden={!displayScroll.end} listRef={listRef} />
    </>
  );
};

interface ScrollButtonProps {
  dir: 1 | -1;
  hidden: boolean;
  listRef: React.RefObject<HTMLDivElement>;
}

function ScrollButton({ dir, hidden, listRef }: ScrollButtonProps) {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className={cl("navds-tabs__scroll-button", {
        "navds-tabs__scroll-button--hidden": hidden,
      })}
      onClick={() => {
        if (!listRef.current) return;
        listRef.current.scrollLeft += dir * 100;
      }}
    >
      {dir === -1 ? (
        <ChevronLeftIcon title="scroll tilbake" />
      ) : (
        <ChevronRightIcon title="scroll neste" />
      )}
    </div>
  );
}

export default ScrollButtons;
