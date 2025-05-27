import { AkselColors } from "./colors";

declare global {
  namespace React {
    interface HTMLAttributes {
      "data-color"?: AkselColors | (string & {});
    }
  }
}
