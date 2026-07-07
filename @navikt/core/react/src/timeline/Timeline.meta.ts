import type { ComponentMetadata } from "../utils/types/metadata";
import {
  Timeline,
  TimelinePeriod,
  TimelinePin,
  TimelineRow,
  TimelineZoomButton,
} from "./index";
import { Zoom } from "./zoom";

const metadata: ComponentMetadata = {
  name: "Timeline",
  components: {
    Timeline,
    "Timeline.Row": TimelineRow,
    "Timeline.Period": TimelinePeriod,
    "Timeline.Pin": TimelinePin,
    "Timeline.Zoom": Zoom,
    "Timeline.ZoomButton": TimelineZoomButton,
  },
  keywords: ["timeline", "tidslinje", "gantt", "schedule", "periods"],
};

export { metadata };
