import type { ComponentMetadata } from "../utils/types/metadata";
import {
  LocalAlert,
  LocalAlertCloseButton,
  LocalAlertContent,
  LocalAlertHeader,
  LocalAlertTitle,
} from "./index";

const metadata: ComponentMetadata = {
  name: "LocalAlert",
  components: {
    LocalAlert,
    "LocalAlert.Header": LocalAlertHeader,
    "LocalAlert.Title": LocalAlertTitle,
    "LocalAlert.Content": LocalAlertContent,
    "LocalAlert.CloseButton": LocalAlertCloseButton,
  },
  keywords: ["local alert", "varsel", "inline", "notification", "alert"],
  related: ["Alert", "GlobalAlert"],
};

export { metadata };
