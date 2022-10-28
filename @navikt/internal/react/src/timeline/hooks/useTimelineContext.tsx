import { createContext, useContext } from "react";

interface TimelineContextProps {
  startDate: Date;
  endDate: Date;
  direction: string;
}

export const TimelineContext = createContext<TimelineContextProps>({
  startDate: new Date(),
  endDate: new Date(),
  direction: "left",
});

export const useTimelineContext = () => {
  const context = useContext(TimelineContext);

  if (!context) {
    console.warn("useTimelineContext must be used with TimelineContext");
  }

  return context;
};
