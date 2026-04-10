import { HTMLAttributes } from "react";

export interface TabsProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange" | "dir"
> {
  children: React.ReactNode;
  /**
   * Changes padding and font-size.
   * @default "medium"
   */
  size?: "medium" | "small";
  /**
   * onChange callback for selected Tab.
   */
  onChange?: (value: string) => void;
  /**
   * Controlled selected value.
   */
  value?: string;
  /**
   * If not controlled, a default-value needs to be set.
   */
  defaultValue?: string;
  /**
   * Automatically activates tab on focus/navigation.
   * @default false
   */
  selectionFollowsFocus?: boolean;
  /**
   * Loops back to start when navigating past last item.
   * @default true
   */
  loop?: boolean;
  /**
   * Icon position in Tab.
   * @default "left"
   */
  iconPosition?: "left" | "top";
  /**
   * Stretches each tab to fill avaliable space in container.
   * @default false
   */
  fill?: boolean;
}
