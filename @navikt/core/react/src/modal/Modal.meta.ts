import type { ComponentMetadata } from "../utils/types/metadata";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "./index";

const metadata: ComponentMetadata = {
  name: "Modal",
  components: {
    Modal,
    "Modal.Header": ModalHeader,
    "Modal.Body": ModalBody,
    "Modal.Footer": ModalFooter,
  },
  keywords: ["modal", "dialog", "popup", "overlay", "window"],
  related: ["Dialog"],
};

export { metadata };
