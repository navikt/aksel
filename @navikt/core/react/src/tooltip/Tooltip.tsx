import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import cl from "classnames";
import React, { forwardRef, HTMLAttributes } from "react";
import { Detail } from "..";

export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Element tooltip anchors to
   */
  children: React.ReactElement & React.RefAttributes<HTMLElement>;
  /**
   * Open state for contolled tooltip
   */
  open?: boolean;
  /**
   * Tells tooltip to start in open state
   * @note "open"-prop overwrites this
   */
  defaultOpen?: boolean;
  /**
   * Orientation for tooltip
   * @default "top"
   */
  side?: "top" | "right" | "bottom" | "left";
  /**
   *  Toggles rendering of arrow
   *  @default true
   */
  arrow?: boolean;
  /**
   * Distance from anchor to tooltip
   * @default 2
   */
  offset?: number;
  /**
   * Content shown in tooltip
   */
  content: string;
  /**
   * Adds a delay in milliseconds before opening tooltip
   * @default 150
   */
  delay?: number;
  /**
   * Callback for when Tooltip opens/closes
   */
  onOpenChange?: (state: boolean) => void;
  /**
   * Inverts style of tooltip
   * @default false
   */
  inverted?: boolean;
  /**
   * List of Keyboard-keys for shortcuts
   */
  keys?: string[];
}

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      children,
      className,
      arrow = true,
      side = "top",
      open,
      defaultOpen,
      offset = 2,
      content,
      delay = 150,
      onOpenChange,
      id,
      inverted = false,
      keys,
      ...rest
    },
    ref
  ) => (
    <TooltipPrimitive.Root
      delayDuration={delay}
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Content
        ref={ref}
        {...rest}
        sideOffset={offset}
        side={side}
        className={cl(
          "navds-tooltip",
          "navds-detail navds-detail--small",
          className,
          {
            "navds-tooltip--inverted": inverted,
          }
        )}
      >
        {content}
        {keys && (
          <span>
            {keys.map((key) => (
              <Detail
                size="small"
                as="kbd"
                key={key}
                className={cl("navds-tooltip__key", {
                  "navds-tooltip__key--inverted": inverted,
                })}
              >
                {key}
              </Detail>
            ))}
          </span>
        )}
        {arrow && (
          <TooltipPrimitive.Arrow
            offset={6}
            width={8}
            height={4}
            className="navds-tooltip__arrow"
          />
        )}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Root>
  )
);

export default Tooltip;
