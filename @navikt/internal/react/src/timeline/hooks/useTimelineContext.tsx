import { createContext, useContext } from "react";

interface TimelineContextProps {
  startDate: Date;
  endDate: Date;
}

export const TimelineContext = createContext<TimelineContextProps>({
  startDate: new Date(),
  endDate: new Date(),
});

export const useTimelineContext = () => {
  const context = useContext(TimelineContext);

  if (!context) {
    console.warn("useTimelineContext must be used with TimelineContext");
  }

  return context;
};
