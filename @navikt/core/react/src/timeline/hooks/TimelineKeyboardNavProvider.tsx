import React from "react";
import { createStrictContext } from "../../utils/helpers";

type TimelineKeyboardNavContextType = {
  activeRow: HTMLElement | null;
  updateActiveRow: (element: HTMLElement | null) => void;
  handleRowKeyDown: (event: React.KeyboardEvent<HTMLElement>) => void;
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
};

function TimelineKeyboardNavProvider(props: TimelineKeyboardNavProviderProps) {
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
      const atBoundary =
        key === "ArrowDown"
          ? currentIndex === rows.length - 1
          : currentIndex === 0;

      if (atBoundary && firstPin) {
        (firstPin as HTMLElement | null)?.focus();
        return;
      }

      /* Next index need to take into account looping */
      const nextIndex =
        key === "ArrowDown"
          ? (currentIndex + 1) % rows.length
          : (currentIndex - 1 + rows.length) % rows.length;

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
      const periods = activeRow.querySelectorAll("[data-timeline-period]");
      if (periods.length === 0) {
        return;
      }

      const currentIndex = Array.from(periods).indexOf(
        document.activeElement as HTMLElement,
      );
      const nextIndex =
        key === "ArrowRight"
          ? (currentIndex + 1) % periods.length
          : (currentIndex - 1 + periods.length) % periods.length;

      (periods[nextIndex] as HTMLElement).focus();
    }
  };

  return (
    <TimelineKeyboardNavContextProvider
      updateActiveRow={updateActiveRow}
      handleRowKeyDown={handleRowKeyDown}
      activeRow={activeRow}
    >
      {props.children}
    </TimelineKeyboardNavContextProvider>
  );
}

export { TimelineKeyboardNavProvider, useTimelineKeyboardContext };
