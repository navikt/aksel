import { HTMLAttributes } from "react";

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
   * Changes design and interaction-visuals.
   * @default "action"
   */
  variant?: "action" | "neutral";
  /**
   * Stretch each button to fill avaliable space in container.
   * @default false
   */
  fill?: boolean;
}
