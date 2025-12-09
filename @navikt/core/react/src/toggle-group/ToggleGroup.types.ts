import { HTMLAttributes } from "react";
import type { AkselColor } from "../types";

export interface ToggleGroupProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "dir"> {
  /**
   * Toggles.Item elements.
   */
  children: React.ReactNode;
  /**
   * Changes padding and font-size.
   * @default "medium"
   */
  size?: "medium" | "small";
  /**
   * Controlled selected value.
   */
  value?: string;
  /**
   * If not controlled, a default-value needs to be set.
   */
  defaultValue?: string;
  /**
   * Callback for selected toggle.
   */
  onChange: (value: string) => void;
  /**
   * Label describing ToggleGroup.
   */
  label?: React.ReactNode;
  /**
   * @deprecated Use `data-color` prop instead.
   */
  variant?: "action" | "neutral";
  /**
   * Overrides inherited color.
   * @see 🏷️ {@link AkselColor}
   * @see [📝 Documentation](https://aksel.nav.no/grunnleggende/darkside/farger-darkside)
   */
  "data-color"?: AkselColor;
  /**
   * Stretch each button to fill avaliable space in container.
   * @default false
   */
  fill?: boolean;
}
