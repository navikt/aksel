import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import cl from "classnames";
import React, { forwardRef, HTMLAttributes, useEffect, useState } from "react";

export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Element tooltip anchors to
   */
  children: React.ReactElement & React.RefAttributes<HTMLElement>;
  /**
   * Open state for contolled tooltip
   * @note Will need to handle all events manually if used
   */
  open?: boolean;
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
   * @default 6 w/arrow, 2 w/no-arrow
   */
  offset?: number;
  /**
   * Content shown in tooltip
   */
  content: string;
  /**
   * Adds a delay before opening tooltip
   * @default 150ms
   */
  delay?: number;
  /**
   * Callback for when Tooltip opens/closes
   */
  onOpenChange?: (state: boolean) => void;
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
      offset,
      content,
      delay = 150,
      onOpenChange,
      ...rest
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(open ?? false);

    const handleOpen = () => {
      open === undefined && setIsOpen(!isOpen);
      onOpenChange?.(!isOpen);
    };

    useEffect(() => {
      open !== undefined && setIsOpen(open);
    }, [open]);

    return (
      <TooltipPrimitive.Root
        delayDuration={delay}
        open={isOpen}
        onOpenChange={handleOpen}
      >
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content
          ref={ref}
          sideOffset={offset ?? arrow ? 6 : 2}
          side={side}
          align={align}
          className={cl("navds-tooltip", "navds-detail", className)}
          {...rest}
        >
          {content}
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
