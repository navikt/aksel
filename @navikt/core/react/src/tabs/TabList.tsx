import { debounce } from "@material-ui/core";
import { Back, Next } from "@navikt/ds-icons";
import { TabsList } from "@radix-ui/react-tabs";
import cl from "classnames";
import React, { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import mergeRefs from "react-merge-refs";

export interface ListProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Tab elements
   */
  children: React.ReactNode;
  /**
   * Loops back to start when navigating past last item
   */
  loop?: boolean;
}

export type ListType = React.ForwardRefExoticComponent<
  ListProps & React.RefAttributes<HTMLDivElement>
>;

const List = forwardRef<HTMLDivElement, ListProps>(
  ({ className, ...rest }, ref) => {
    const listRef = useRef<HTMLDivElement | null>(null);
    const mergedRef = mergeRefs([listRef, ref]);
    const [displayScroll, setDisplayScroll] = useState({
      start: false,
      end: false,
    });

    const updateScrollButtonState = useMemo(
      () =>
        debounce(() => {
          if (!listRef?.current) return;
          const { scrollWidth, clientWidth } = listRef?.current;
          let showStartScroll;
          let showEndScroll;

          const scrollLeft = listRef?.current?.scrollLeft;
          // use 1 for the potential rounding error with browser zooms.
          showStartScroll = scrollLeft > 1;
          showEndScroll = scrollLeft < scrollWidth - clientWidth - 1;

          setDisplayScroll((displayScroll) =>
            showStartScroll === displayScroll.start &&
            showEndScroll === displayScroll.end
              ? displayScroll
              : { start: showStartScroll, end: showEndScroll }
          );
        }),
      []
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
        if (resizeObserver) {
          resizeObserver.disconnect();
        }
      };
    }, [updateScrollButtonState]);

    useEffect(() => {
      updateScrollButtonState();
    });

    useEffect(() => {
      return () => {
        updateScrollButtonState.clear();
      };
    }, [updateScrollButtonState]);

    const ScrollButton = ({
      dir,
      hidden,
    }: {
      dir: 1 | -1;
      hidden: boolean;
    }) => (
      <div
        className={cl("navds-tabs__scroll-button", {
          "navds-tabs__scroll-button--hidden": hidden,
        })}
        onClick={() => {
          if (!listRef.current) return;
          listRef.current.scrollLeft &&= listRef.current.scrollLeft + dir * 100;
        }}
      >
        {dir === -1 ? (
          <Back title="scroll tilbake" />
        ) : (
          <Next title="scroll neste" />
        )}
      </div>
    );

    const showSteppers = displayScroll.end || displayScroll.start;
    return (
      <div className="navds-tabs__tablist-wrapper">
        {showSteppers && (
          <ScrollButton dir={-1} hidden={!displayScroll.start} />
        )}
        <TabsList
          {...rest}
          ref={mergedRef}
          onScroll={updateScrollButtonState}
          className={cl("navds-tabs__tablist", className)}
        />
        {showSteppers && <ScrollButton dir={1} hidden={!displayScroll.end} />}
      </div>
    );
  }
) as ListType;

export default List;
