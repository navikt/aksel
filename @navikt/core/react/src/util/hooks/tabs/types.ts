import { HTMLAttributes } from "react";

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

export type UseTabsProps = Omit<
  TabsProps,
  "size" | "iconPosition" | "className" | "children"
>;

export interface TabListProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * <Tabs.Tab /> elements
   */
  children: React.ReactNode;
}

export interface UseTabListProps {
  children?: React.ReactNode;
  onKeyDown?: React.KeyboardEventHandler;
  ref?: React.Ref<any>;
}

export interface TabProps
  extends Omit<React.HTMLAttributes<HTMLButtonElement>, "children"> {
  /**
   * Tab label
   */
  label?: React.ReactNode;
  /**
   * Tab Icon
   */
  icon?: React.ReactNode;
  /**
   * Value for state-handling
   */
  value: string;
}

export interface UseTabOptions {
  /**
   * If `true`, the `Tab` won't be toggleable
   * @default false
   */
  disabled?: boolean;
}

export interface UseTabProps extends UseTabOptions {
  onClick?: React.MouseEventHandler;
  onFocus?: React.FocusEventHandler;
  value: string;
}

export interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Tab panel content
   */
  children: React.ReactNode;
  /**
   * Value for state-handling
   */
  value: string;
}
