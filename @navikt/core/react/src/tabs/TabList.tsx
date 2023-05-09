import { ChevronLeftIcon, ChevronRightIcon } from "@navikt/aksel-icons";
import { TabsList } from "@radix-ui/react-tabs";
import cl from "clsx";
import React, {
  forwardRef,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { debounce, mergeRefs } from "..";
import { TabsContext } from "./Tabs";

export interface TabListProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * <Tabs.Tab /> elements
   */
  children: React.ReactNode;
}

export type TabListType = React.ForwardRefExoticComponent<
  TabListProps & React.RefAttributes<HTMLDivElement>
>;

export const TabList = forwardRef<HTMLDivElement, TabListProps>(
  ({ className, ...rest }, ref) => {
    const context = useContext(TabsContext);
    const listRef = useRef<HTMLDivElement | null>(null);
    const mergedRef = useMemo(() => mergeRefs([listRef, ref]), [ref]);
    const [displayScroll, setDisplayScroll] = useState({
      start: false,
      end: false,
    });

    const updateScrollButtonState = useMemo(
      () =>
        debounce(() => {
          if (!listRef?.current) return;
          const { scrollWidth, clientWidth } = listRef.current;
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
          loop={context?.loop}
          className={cl("navds-tabs__tablist", className)}
        />
        {showSteppers && <ScrollButton dir={1} hidden={!displayScroll.end} />}
      </div>
    );
  }
) as TabListType;

export default TabList;
