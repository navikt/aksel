import { createContext, useContext } from "react";
import { PeriodType } from "../Period";

interface TimelineContextProps {
  startDate: Date;
  endDate: Date;
  periods: PeriodType[];
}

export const TimelineContext = createContext<TimelineContextProps>({
  startDate: new Date(),
  endDate: new Date(),
  periods: [],
});

export const useTimelineContext = () => {
  const context = useContext(TimelineContext);

  if (!context) {
    console.warn("useTimelineContext must be used with TimelineContext");
  }

  return context;
};
