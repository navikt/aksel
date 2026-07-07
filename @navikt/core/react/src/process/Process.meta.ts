import type { ComponentMetadata } from "../utils/types/metadata";
import { Process, ProcessEvent } from "./index";

const metadata: ComponentMetadata = {
  name: "Process",
  components: {
    Process,
    "Process.Event": ProcessEvent,
  },
  keywords: ["process", "prosess", "timeline", "steps", "flow"],
};

export { metadata };
