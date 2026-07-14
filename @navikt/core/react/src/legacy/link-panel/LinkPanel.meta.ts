import type { ComponentMetadata } from "../../utils/types/metadata";
import { LinkPanel, LinkPanelDescription, LinkPanelTitle } from "./index";

const metadata: ComponentMetadata = {
  name: "LinkPanel",
  components: {
    LinkPanel,
    "LinkPanel.Title": LinkPanelTitle,
    "LinkPanel.Description": LinkPanelDescription,
  },
  keywords: ["link panel", "lenkepanel", "panel", "navigation", "kort"],
  related: ["LinkCard"],
};

export { metadata };
