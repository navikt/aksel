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
      console.info({ key, activeRow });
      // Find next element with `data-timeline-row` attribute
      const rows =
        activeRow.parentElement?.querySelectorAll(`[data-timeline-row]`);

      const firstPin = activeRow.parentElement?.querySelector(
        "[data-timeline-pin]",
      );

      if (!rows || rows.length === 0) {
        return;
      }

      const currentIndex = Array.from(rows).indexOf(activeRow);
      let nextIndex: number;

      if (key === "ArrowDown") {
        /* If index is the last one, we want to focus first pin */
        if (currentIndex === rows.length - 1) {
          if (firstPin) {
            (firstPin as HTMLElement).focus();
          }
          return;
        }
        nextIndex = (currentIndex + 1) % rows.length;
      } else {
        /* If row is the first one, we instead want to focus first pin */
        if (currentIndex === 0) {
          if (firstPin) {
            (firstPin as HTMLElement).focus();
          }
          return;
        }

        nextIndex = (currentIndex - 1 + rows.length) % rows.length;
      }

      const nextRow = rows[nextIndex] as HTMLElement;

      if (!nextRow) {
        return;
      }

      const periods = nextRow.querySelectorAll("[data-timeline-period]");
      if (periods.length > 0) {
        (periods[0] as HTMLElement).focus();
      } else {
        nextRow.focus();
      }
    }

    if (key === "ArrowRight" || key === "ArrowLeft") {
      const periods = activeRow.querySelectorAll("[data-timeline-period]");
      if (periods.length === 0) {
        return;
      }

      const focusedElement = document.activeElement as HTMLElement;
      const currentIndex = Array.from(periods).indexOf(focusedElement);
      let nextIndex: number;

      if (key === "ArrowRight") {
        nextIndex = (currentIndex + 1) % periods.length;
      } else {
        nextIndex = (currentIndex - 1 + periods.length) % periods.length;
      }

      const nextPeriod = periods[nextIndex] as HTMLElement;

      if (!nextPeriod) {
        return;
      }

      nextPeriod.focus();
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
