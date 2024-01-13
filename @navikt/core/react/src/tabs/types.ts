import { HTMLAttributes } from "react";

export interface TabsContextProps {
  size: "medium" | "small";
  loop: boolean;
  iconPosition: "left" | "top";
  id: string;
  selectionFollowsFocus?: boolean;
}

export interface TabsProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "dir"> {
  children: React.ReactNode;
  /**
   * Changes padding and font-size
   * @default "medium"
   */
  size?: "medium" | "small";
  /**
   * onChange callback for selected Tab
   */
  onChange?: (value: string) => void;
  /**
   * Controlled selected value
   */
  value?: string;
  /**
   * If not controlled, a default-value needs to be set
   */
  defaultValue?: string;
  /**
   * Automatically activates tab on focus/navigation
   * @default false
   */
  selectionFollowsFocus?: boolean;
  /**
   * Loops back to start when navigating past last item
   * @default false
   */
  loop?: boolean;
  /**
   * Icon position in Tab
   * @default "left"
   */
  iconPosition?: "left" | "top";
}
