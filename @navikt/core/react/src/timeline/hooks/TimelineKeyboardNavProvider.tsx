import React, { useCallback, useRef } from "react";
import { Slot } from "../../utils/components/slot/Slot";
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
  children: React.ReactElement;
};

function TimelineKeyboardNavProvider({
  children,
}: TimelineKeyboardNavProviderProps) {
  const [activeRow, setActiveRow] = React.useState<HTMLElement | null>(null);
  const activeRowRef = React.useRef<HTMLElement | null>(null);

  const timelineElementRef = useRef<HTMLTableElement>(null);

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

      /* Skip interaction if focus is inside popover */
      if (document.activeElement?.closest("[data-timeline-popover]")) {
        return;
      }

      const { key } = event;

      if (key === "ArrowDown" || key === "ArrowUp") {
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
          focusElement(firstPin, event);
          return;
        }

        const nextIndex =
          key === "ArrowDown" ? currentIndex + 1 : currentIndex - 1;

        /* We want to avoid looping */
        if (nextIndex < 0 || nextIndex >= rows.length) {
          return;
        }

        const nextRow = rows[nextIndex];
        const periods = nextRow?.querySelectorAll("[data-timeline-period]");

        if (periods?.length > 0) {
          focusElement(periods[0], event);
        } else if (nextRow) {
          focusElement(nextRow, event);
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
          /* If just the row has focus, we want to focus either the first or last period inside based on key */
          focusElement(
            periods[key === "ArrowRight" ? 0 : periods.length - 1],
            event,
          );
          return;
        }

        const nextIndex =
          key === "ArrowRight" ? currentIndex + 1 : currentIndex - 1;

        /* We want to avoid looping */
        if (nextIndex < 0 || nextIndex >= periods.length) {
          return;
        }

        focusElement(periods[nextIndex], event);
      }
    },
    [],
  );

  const handlePinKeyDown = useCallback(
    (event: React.KeyboardEvent<Element>) => {
      const timelineElement = timelineElementRef.current;
      if (!timelineElement) {
        return;
      }

      /* Skip interaction if focus is inside popover */
      if (document.activeElement?.closest("[data-timeline-popover]")) {
        return;
      }

      const { key } = event;

      if (key === "ArrowDown") {
        const rows = timelineElement.querySelectorAll("[data-timeline-row]");
        if (rows.length === 0) {
          return;
        }
        const rowToFocus = rows[0] as HTMLElement | null;

        if (rowToFocus) {
          const periods = rowToFocus?.querySelectorAll(
            "[data-timeline-period]",
          );

          if (periods?.length > 0) {
            focusElement(periods[0], event);
          } else if (rowToFocus) {
            focusElement(rowToFocus, event);
          }
        }
      }

      if (key === "ArrowRight" || key === "ArrowLeft") {
        event.preventDefault();
        const pins = timelineElement.querySelectorAll("[data-timeline-pin]");
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

        /* We want to avoid looping */
        if (nextIndex < 0 || nextIndex >= pins.length) {
          return;
        }

        focusElement(pins[nextIndex], event);
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
        <Slot ref={timelineElementRef}>{children}</Slot>
      </TimelineKeyboardNavActiveRowContextProvider>
    </TimelineKeyboardNavStableContextProvider>
  );
}

/**
 * Focuses the given element and prevents default behavior of the event if focus is called.
 */
function focusElement(
  element: HTMLElement | Element | null,
  event: React.KeyboardEvent<HTMLElement | Element>,
) {
  if (!element) {
    return;
  }

  event.preventDefault();

  (element as HTMLElement).focus();
}

export {
  TimelineKeyboardNavProvider,
  useTimelineKeyboardContext,
  useTimelineKeyboardActiveRow,
};
