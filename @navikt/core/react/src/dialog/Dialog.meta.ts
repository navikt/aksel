import type { ComponentMetadata } from "../utils/types/metadata";
import {
  Dialog,
  DialogBody,
  DialogCloseTrigger,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "./index";

const metadata: ComponentMetadata = {
  name: "Dialog",
  components: {
    Dialog,
    "Dialog.Trigger": DialogTrigger,
    "Dialog.Popup": DialogPopup,
    "Dialog.CloseTrigger": DialogCloseTrigger,
    "Dialog.Header": DialogHeader,
    "Dialog.Title": DialogTitle,
    "Dialog.Description": DialogDescription,
    "Dialog.Body": DialogBody,
    "Dialog.Footer": DialogFooter,
  },
  keywords: ["dialog", "modal", "popup", "overlay", "window"],
  related: ["Modal"],
};

export { metadata };
