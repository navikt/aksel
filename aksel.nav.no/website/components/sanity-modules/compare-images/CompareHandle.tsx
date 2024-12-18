"use client";

import cl from "clsx";
import { forwardRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@navikt/aksel-icons";

interface CompareHandleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isDragging: boolean;
}

export const CompareHandle = forwardRef<HTMLButtonElement, CompareHandleProps>(
  ({ isDragging, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={cl(
          "group absolute left-0 top-0 z-10 h-full appearance-none border-0 bg-none p-0 outline-none transition-opacity",
          {
            "cursor-ew-resize opacity-100": isDragging,
            "opacity-40 focus:opacity-100 group-hover:opacity-100": !isDragging,
          },
        )}
        aria-label="Use arrow keys to adjust comparison"
        aria-orientation="horizontal"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={50}
        aria-valuetext="50%"
        data-rcs="handle-container"
        role="slider"
        style={{
          transform: "translate3d(-50%, 0, 0)",
          left: `var(--image-clip-2)`,
        }}
        {...rest}
      >
        <span className="absolute top-0 h-full w-[2px] bg-surface-subtle shadow-[rgba(0,_0,_0,_0.35)_0px_0px_4px]" />
        <span className="pointer-events-none relative z-10 flex items-center rounded-full bg-surface-subtle text-3xl outline-[3px] outline-offset-2 outline-border-focus group-focus:outline">
          <ChevronLeftIcon aria-hidden />
          <ChevronRightIcon aria-hidden />
        </span>
      </button>
    );
  },
);
