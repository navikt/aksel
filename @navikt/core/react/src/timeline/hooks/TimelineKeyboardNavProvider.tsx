import React, { useCallback } from "react";
import { createStrictContext } from "../../utils/helpers";

type TimelineKeyboardNavStableContextType = {
  updateActiveRow: (element: HTMLElement | null) => void;
  handleRowKeyDown: (event: React.KeyboardEvent<HTMLElement>) => void;
  handlePinKeyDown: (event: React.KeyboardEvent<Element>) => void;
};

type TimelineKeyboardNavActiveRowContextType = {
  activeRow: HTMLElement | null;
};

const {
  Provider: TimelineKeyboardNavStableContextProvider,
  useContext: useTimelineKeyboardContext,
} = createStrictContext<TimelineKeyboardNavStableContextType>({
  name: "TimelineKeyboardNavStableContext",
  errorMessage:
    "useTimelineKeyboardContext must be used within a TimelineKeyboardNavProvider",
});

const {
  Provider: TimelineKeyboardNavActiveRowContextProvider,
  useContext: useTimelineKeyboardActiveRow,
} = createStrictContext<TimelineKeyboardNavActiveRowContextType>({
  name: "TimelineKeyboardNavActiveRowContext",
  errorMessage:
    "useTimelineKeyboardActiveRow must be used within a TimelineKeyboardNavProvider",
});

type TimelineKeyboardNavProviderProps = {
  children: React.ReactNode;
  timelineElement: HTMLDivElement | null;
};

function TimelineKeyboardNavProvider(props: TimelineKeyboardNavProviderProps) {
  const { timelineElement } = props;

  const [activeRow, setActiveRow] = React.useState<HTMLElement | null>(null);
  const activeRowRef = React.useRef<HTMLElement | null>(null);
  const timelineElementRef = React.useRef<HTMLDivElement | null>(null);
  timelineElementRef.current = timelineElement;

  const updateActiveRow = React.useCallback((element: HTMLElement | null) => {
    activeRowRef.current = element;
    setActiveRow(element);
  }, []);

  const handleRowKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      const currentActiveRow = activeRowRef.current;
      if (!currentActiveRow) {
        return;
      }

      /* Skip interaction of focus is inside popover */
      if (document.activeElement?.closest("[data-timeline-popover]")) {
        return;
      }

      const { key } = event;

      if (key === "ArrowDown" || key === "ArrowUp") {
        event.preventDefault();
        const rows = currentActiveRow.parentElement?.querySelectorAll(
          "[data-timeline-row]",
        );
        const firstPin = currentActiveRow.parentElement?.querySelector(
          "[data-timeline-pin]",
        );

        if (!rows || rows.length === 0) {
          return;
        }

        const currentIndex = Array.from(rows).indexOf(currentActiveRow);
        if (currentIndex === -1) {
          return;
        }

        const atBoundary = currentIndex === 0 && key === "ArrowUp";

        if (atBoundary && firstPin) {
          (firstPin as HTMLElement | null)?.focus();
          return;
        }

        /* Next index need to take into account looping */
        const nextIndex =
          key === "ArrowDown" ? currentIndex + 1 : currentIndex - 1;

        if (nextIndex < 0 || nextIndex >= rows.length) {
          return;
        }

        const nextRow = rows[nextIndex];
        const periods = nextRow?.querySelectorAll("[data-timeline-period]");

        if (periods?.length > 0) {
          (periods[0] as HTMLElement).focus();
        } else if (nextRow) {
          (nextRow as HTMLElement).focus();
        }
        return;
      }

      if (key === "ArrowRight" || key === "ArrowLeft") {
        event.preventDefault();
        const periods = currentActiveRow.querySelectorAll(
          "[data-timeline-period]",
        );
        if (periods.length === 0) {
          return;
        }

        const currentIndex = Array.from(periods).indexOf(
          document.activeElement as HTMLElement,
        );
        if (currentIndex === -1) {
          return;
        }

        const nextIndex =
          key === "ArrowRight" ? currentIndex + 1 : currentIndex - 1;

        if (nextIndex < 0 || nextIndex >= periods.length) {
          return;
        }

        (periods[nextIndex] as HTMLElement).focus();
      }
    },
    [],
  );

  const handlePinKeyDown = useCallback(
    (event: React.KeyboardEvent<Element>) => {
      const timelineEl = timelineElementRef.current;
      if (!timelineEl) {
        return;
      }

      /* Skip interaction of focus is inside popover */
      if (document.activeElement?.closest("[data-timeline-popover]")) {
        return;
      }

      const { key } = event;

      if (key === "ArrowDown") {
        event.preventDefault();
        const rows = timelineEl.querySelectorAll("[data-timeline-row]");
        if (rows.length === 0) {
          return;
        }
        const rowToFocus = rows[0] as HTMLElement | null;

        if (rowToFocus) {
          const periods = rowToFocus?.querySelectorAll(
            "[data-timeline-period]",
          );

          if (periods?.length > 0) {
            (periods[0] as HTMLElement).focus();
          } else if (rowToFocus) {
            (rowToFocus as HTMLElement).focus();
          }
        }
      }

      if (key === "ArrowRight" || key === "ArrowLeft") {
        event.preventDefault();
        const pins = timelineEl.querySelectorAll("[data-timeline-pin]");
        if (pins.length === 0) {
          return;
        }

        const currentIndex = Array.from(pins).indexOf(
          document.activeElement as HTMLElement,
        );
        if (currentIndex === -1) {
          return;
        }

        const nextIndex =
          key === "ArrowRight" ? currentIndex + 1 : currentIndex - 1;

        if (nextIndex < 0 || nextIndex >= pins.length) {
          return;
        }

        (pins[nextIndex] as HTMLElement).focus();
      }
    },
    [],
  );

  return (
    <TimelineKeyboardNavStableContextProvider
      updateActiveRow={updateActiveRow}
      handleRowKeyDown={handleRowKeyDown}
      handlePinKeyDown={handlePinKeyDown}
    >
      <TimelineKeyboardNavActiveRowContextProvider activeRow={activeRow}>
        {props.children}
      </TimelineKeyboardNavActiveRowContextProvider>
    </TimelineKeyboardNavStableContextProvider>
  );
}

export {
  TimelineKeyboardNavProvider,
  useTimelineKeyboardContext,
  useTimelineKeyboardActiveRow,
};
