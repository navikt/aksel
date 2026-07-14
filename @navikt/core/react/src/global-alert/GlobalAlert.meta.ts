import type { ComponentMetadata } from "../utils/types/metadata";
import {
  GlobalAlert,
  GlobalAlertCloseButton,
  GlobalAlertContent,
  GlobalAlertHeader,
  GlobalAlertTitle,
} from "./index";

const metadata: ComponentMetadata = {
  name: "GlobalAlert",
  components: {
    GlobalAlert,
    "GlobalAlert.Header": GlobalAlertHeader,
    "GlobalAlert.Title": GlobalAlertTitle,
    "GlobalAlert.Content": GlobalAlertContent,
    "GlobalAlert.CloseButton": GlobalAlertCloseButton,
  },
  keywords: ["global alert", "varsel", "banner", "notification", "alert"],
  related: ["Alert", "LocalAlert"],
};

export { metadata };
