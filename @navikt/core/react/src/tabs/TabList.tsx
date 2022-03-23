import { debounce } from "@material-ui/core";
import { Back, Next } from "@navikt/ds-icons";
import { TabsList } from "@radix-ui/react-tabs";
import cl from "classnames";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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

    const updateScrollButtonState = useCallback(() => {
      if (!listRef?.current) return;
      const { scrollWidth, clientWidth } = listRef?.current;
      let showStartScroll;
      let showEndScroll;

      const scrollLeft = listRef?.current?.scrollLeft;
      // use 1 for the potential rounding error with browser zooms.
      showStartScroll = scrollLeft > 1;
      showEndScroll = scrollLeft < scrollWidth - clientWidth - 1;

      if (
        showStartScroll !== displayScroll.start ||
        showEndScroll !== displayScroll.end
      ) {
        setDisplayScroll({ start: showStartScroll, end: showEndScroll });
      }
    }, [displayScroll.end, displayScroll.start]);

    useEffect(() => {
      const handleResize = debounce(() => {
        updateScrollButtonState();
      });
      const win =
        (listRef.current && listRef.current.ownerDocument) ||
        document ||
        window;
      win.addEventListener("resize", handleResize);

      let resizeObserver;

      if (typeof ResizeObserver !== "undefined") {
        resizeObserver = new ResizeObserver(handleResize);
        resizeObserver.observe(listRef.current);
      }

      return () => {
        handleResize.clear();
        win.removeEventListener("resize", handleResize);
        if (resizeObserver) {
          resizeObserver.disconnect();
        }
      };
    }, [updateScrollButtonState]);

    useEffect(() => {
      updateScrollButtonState();
    });

    const handleTabsScroll = useMemo(
      () =>
        debounce(() => {
          updateScrollButtonState();
        }),
      [updateScrollButtonState]
    );

    useEffect(() => {
      return () => {
        handleTabsScroll.clear();
      };
    }, [handleTabsScroll]);

    const moveTabsScroll = (dir: 1 | -1) => {
      if (!listRef.current) return;

      const scroll = dir * 100;
      listRef.current.scrollLeft += scroll;
    };

    const ScrollButton = ({
      dir,
      disabled,
    }: {
      dir: 1 | -1;
      disabled: boolean;
    }) => (
      <div
        className={cl("navds-tabs__scroll-button", {
          "navds-tabs__scroll-button--disabled": disabled,
        })}
        onClick={() => moveTabsScroll(dir)}
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
          <ScrollButton dir={-1} disabled={!displayScroll.start} />
        )}
        <TabsList
          {...rest}
          ref={mergedRef}
          onScroll={handleTabsScroll}
          className={cl("navds-tabs__tablist", className)}
        />
        {showSteppers && <ScrollButton dir={1} disabled={!displayScroll.end} />}
      </div>
    );
  }
) as ListType;

export default List;
