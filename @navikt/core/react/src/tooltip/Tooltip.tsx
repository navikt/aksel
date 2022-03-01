import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import cl from "classnames";
import React, { forwardRef, HTMLAttributes } from "react";
import { Detail, useId } from "..";

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
   * Tooltip placement in relation to anchor
   * @default "center"
   */
  align?: "center" | "start" | "end";
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
   * Keyboard shortcuts
   * List of styled keyboard shortcuts
   */
  keys?: string[];
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
}

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      children,
      className,
      arrow = true,
      side = "top",
      align = "center",
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
  ) => {
    const tooltipId = useId();

    const GetKeys = () => {
      if (!keys) return null;
      return (
        <span className="navds-tooltip__keys">
          {keys.map((k) => (
            <Detail
              as="kbd"
              size="small"
              key={k}
              className="navds-tooltip__key"
            >
              {k}
            </Detail>
          ))}
        </span>
      );
    };

    return (
      <TooltipPrimitive.Root
        delayDuration={delay}
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
      >
        <TooltipPrimitive.Trigger
          asChild
          aria-describedby={id ?? `tooltip-${tooltipId}`}
        >
          {children}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content
          ref={ref}
          {...rest}
          sideOffset={offset ?? 2}
          side={side}
          align={align}
          className={cl(
            "navds-tooltip",
            "navds-detail navds-detail--small",
            className,
            {
              "navds-tooltip--inverted": inverted,
            }
          )}
          id={id ?? `tooltip-${tooltipId}`}
        >
          {content}
          {GetKeys()}
          {arrow && (
            <TooltipPrimitive.Arrow
              offset={8}
              width={12}
              height={8}
              className="navds-tooltip__arrow"
            />
          )}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
    );
  }
);

export default Tooltip;
