"use client";

import cl from "clsx";
import React, { CSSProperties, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@navikt/aksel-icons";

/* eslint-disable @next/next/no-img-element */

interface CompareHandleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  position: number;
  isDragging: boolean;
}

const CompareHandle = ({
  position,
  isDragging,
  ...rest
}: CompareHandleProps) => {
  return (
    <button
      className={cl(
        "group pointer-events-none absolute left-0 top-0 z-10 h-full appearance-none border-0 bg-none p-0 outline-none",
        {
          "opacity-100": isDragging,
          "opacity-40 focus-visible:opacity-100": !isDragging,
        },
      )}
      aria-label="Use arrow keys to adjust comparison"
      aria-orientation="horizontal"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={position}
      data-rcs="handle-container"
      role="slider"
      tabIndex={0}
      {...rest}
    >
      <span className="absolute top-0 h-full w-[2px] bg-surface-subtle shadow-[rgba(0,_0,_0,_0.35)_0px_0px_4px]" />
      <span className="relative z-10 flex items-center rounded-full bg-surface-subtle text-3xl outline-2 outline-offset-2 outline-border-focus group-focus-visible:outline">
        <ChevronLeftIcon aria-hidden />
        <ChevronRightIcon aria-hidden />
      </span>
    </button>
  );
};

const CompareImages = ({
  image1,
  image2,
}: {
  image1: string;
  image2: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const internalPosition = useRef(50);

  const [isDragging, setIsDragging] = useState(false);

  const syncPosition = () => {
    if (!containerRef.current) {
      return;
    }

    containerRef.current.style.setProperty(
      "--image-clip-1",
      `${100 - internalPosition.current}%`,
    );
    containerRef.current.style.setProperty(
      "--image-clip-2",
      `${internalPosition.current}%`,
    );
  };

  /* Container */
  const handlePoinerUp = () => {
    setIsDragging(false);
  };
  /* Container */
  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    // Only handle left mouse button (touch events also use 0).
    if (event.button !== 0) {
      return;
    }

    if (!containerRef.current) {
      return;
    }

    // 1. Get element's position and dimensions
    const rect = containerRef.current.getBoundingClientRect();
    const elementLeft = rect.left;
    const elementWidth = rect.width;

    // 2. Get the click's X coordinate relative to the viewport
    const clickX = event.clientX;

    // 3. Calculate the X coordinate relative to the div (0 = left edge)
    const relativeX = clickX - elementLeft;

    // 4. Calculate the percentage
    const percentageX = Math.round((relativeX / elementWidth) * 100);

    // Ensure percentage is between 0 and 100
    const clampedPercentageX = Math.max(0, Math.min(100, percentageX));

    internalPosition.current = clampedPercentageX;
    syncPosition();
    /* updateInternalPosition({ isOffset: true, x: ev.pageX, y: ev.pageY }); */
    setIsDragging(true);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) {
      return;
    }
    // 1. Get element's position and dimensions
    const rect = containerRef.current.getBoundingClientRect();
    const elementLeft = rect.left;
    const elementWidth = rect.width;

    // 2. Get the click's X coordinate relative to the viewport
    const clickX = event.clientX;

    // 3. Calculate the X coordinate relative to the div (0 = left edge)
    const relativeX = clickX - elementLeft;

    // 4. Calculate the percentage
    const percentageX = Math.round((relativeX / elementWidth) * 100);

    // Ensure percentage is between 0 and 100
    const clampedPercentageX = Math.max(0, Math.min(100, percentageX));

    internalPosition.current = clampedPercentageX;
    syncPosition();
  };

  /* Handle */
  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      internalPosition.current = Math.max(internalPosition.current - 5, 0);
      syncPosition();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      internalPosition.current = Math.min(internalPosition.current + 5, 100);
      syncPosition();
    }
    return;
  };

  /* Handle */
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    console.info(event);
    return;
  };

  const appliedStyle: CSSProperties = {
    "--image-clip-2": `${internalPosition.current}%`,
    "--image-clip-1": `${100 - internalPosition.current}%`,
    cursor: isDragging ? "ew-resize" : undefined,
  };

  return (
    <div
      ref={containerRef}
      style={appliedStyle}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePoinerUp}
      onPointerMove={handlePointerMove}
      className="relative grid max-h-full max-w-full touch-pan-y select-none overflow-hidden"
    >
      <CompareItem order="1">
        <img src={image1} alt="" className="object-cover object-center" />
      </CompareItem>
      <CompareItem order="2">
        <img src={image2} alt="" className="object-cover object-center" />
      </CompareItem>
      <CompareHandle
        position={50}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        isDragging={isDragging}
        style={{
          transform: "translate3d(-50%, 0, 0)",
          left: `var(--image-clip-2)`,
          transition: "opacity 200ms ease",
        }}
      />
    </div>
  );
};

const CompareItem = ({
  children,
  order,
}: {
  children: React.ReactNode;
  order: "1" | "2";
}) => {
  const appliedStyle: CSSProperties = {
    gridArea: "1 / 1 / 2 / 2",
    willChange: "clip-path",
    clipPath:
      order === "1"
        ? `inset(0 var(--image-clip-1) 0 0)`
        : `inset(0 0 0 var(--image-clip-2))`,
  };

  return (
    <div
      style={appliedStyle}
      className="box-border max-w-full select-none overflow-hidden"
    >
      {children}
    </div>
  );
};

export default CompareImages;
