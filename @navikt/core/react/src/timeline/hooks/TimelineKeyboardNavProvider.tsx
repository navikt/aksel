import React from "react";
import { createStrictContext } from "../../utils/helpers";

type TimelineKeyboardNavContextType = {
  activeRow: HTMLElement | null;
  updateActiveRow: (element: HTMLElement | null) => void;
  handleRowKeyDown: (event: React.KeyboardEvent<HTMLElement>) => void;
  handlePinKeyDown: (event: React.KeyboardEvent<Element>) => void;
};

const {
  Provider: TimelineKeyboardNavContextProvider,
  useContext: useTimelineKeyboardContext,
} = createStrictContext<TimelineKeyboardNavContextType>({
  name: "TimelineKeyboardNavContext",
  errorMessage:
    "useTimelineKeyboardNavContext must be used within a TimelineKeyboardNavProvider",
});

type TimelineKeyboardNavProviderProps = {
  children: React.ReactNode;
  timelineElement: HTMLDivElement | null;
};

function TimelineKeyboardNavProvider(props: TimelineKeyboardNavProviderProps) {
  const { timelineElement } = props;

  const [activeRow, setActiveRow] = React.useState<HTMLElement | null>(null);

  const updateActiveRow = (element: HTMLElement | null) => {
    setActiveRow(element);
  };

  const handleRowKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (!activeRow) {
      return;
    }

    const { key } = event;

    if (key === "ArrowDown" || key === "ArrowUp") {
      event.preventDefault();
      const rows = activeRow.parentElement?.querySelectorAll(
        "[data-timeline-row]",
      );
      const firstPin = activeRow.parentElement?.querySelector(
        "[data-timeline-pin]",
      );

      if (!rows || rows.length === 0) {
        return;
      }

      const currentIndex = Array.from(rows).indexOf(activeRow);
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
      const periods = activeRow.querySelectorAll("[data-timeline-period]");
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
  };

  const handlePinKeyDown = (event: React.KeyboardEvent<Element>) => {
    if (!timelineElement) {
      return;
    }

    const { key } = event;

    if (key === "ArrowDown") {
      event.preventDefault();
      const rows = timelineElement.querySelectorAll("[data-timeline-row]");
      if (rows.length === 0) {
        return;
      }
      const rowToFocus = rows[0] as HTMLElement | null;

      if (rowToFocus) {
        const periods = rowToFocus?.querySelectorAll("[data-timeline-period]");

        if (periods?.length > 0) {
          (periods[0] as HTMLElement).focus();
        } else if (rowToFocus) {
          (rowToFocus as HTMLElement).focus();
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

      if (nextIndex < 0 || nextIndex >= pins.length) {
        return;
      }

      (pins[nextIndex] as HTMLElement).focus();
    }
  };

  return (
    <TimelineKeyboardNavContextProvider
      updateActiveRow={updateActiveRow}
      handleRowKeyDown={handleRowKeyDown}
      activeRow={activeRow}
      handlePinKeyDown={handlePinKeyDown}
    >
      {props.children}
    </TimelineKeyboardNavContextProvider>
  );
}

export { TimelineKeyboardNavProvider, useTimelineKeyboardContext };
