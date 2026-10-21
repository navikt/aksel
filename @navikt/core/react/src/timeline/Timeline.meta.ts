import type { ComponentMetadata } from "../utils/types/metadata";
import {
  Timeline,
  TimelinePeriod,
  TimelinePin,
  TimelineRow,
  TimelineZoomButton,
} from "./index";

const metadata: ComponentMetadata = {
  name: "Timeline",
  components: {
    Timeline,
    "Timeline.Row": TimelineRow,
    "Timeline.Period": TimelinePeriod,
    "Timeline.Pin": TimelinePin,
    "Timeline.ZoomButton": TimelineZoomButton,
  },
  keywords: ["timeline", "tidslinje", "gantt", "schedule", "periods"],
};

export { metadata };
