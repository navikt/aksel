import { createContext, useContext } from "react";
import { consoleWarning } from "../../utils/helpers/consoleWarning";

interface TimelineContextProps {
  startDate: Date;
  endDate: Date;
  direction: "left" | "right";
  setStart: (d: Date) => void;
  setEndInclusive: (d: Date) => void;
}

const TimelineContext = createContext<TimelineContextProps>({
  startDate: new Date(),
  endDate: new Date(),
  direction: "left",
  setStart: () => null,
  setEndInclusive: () => null,
});

const useTimelineContext = () => {
  const context = useContext(TimelineContext);

  if (!context) {
    consoleWarning(
      "<Timeline />: useTimelineContext must be used with TimelineContext",
    );
  }

  return context;
};

export { TimelineContext, useTimelineContext };
