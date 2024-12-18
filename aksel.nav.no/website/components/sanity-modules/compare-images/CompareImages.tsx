"use client";

import React, { CSSProperties, useRef, useState } from "react";
import { CompareHandle } from "./CompareHandle";
import { CompareItem } from "./CompareItem";

/* eslint-disable @next/next/no-img-element */

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

  /**
   * Update the position based on the cursor's current position within container.
   */
  const updateOnCursorPosition = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    if (!containerRef.current) {
      return;
    }

    const rect = containerRef.current.getBoundingClientRect();
    const elementLeft = rect.left;
    const elementWidth = rect.width;

    // Get X coordinate relative to viewport
    const clickX = event.clientX;

    // Calculate X coordinate relative to the div (0 = left edge)
    const relativeX = clickX - elementLeft;

    // Get percentage
    const percentageX = (relativeX / elementWidth) * 100;

    // Clamp between 0 and 100
    const clampedPercentageX = Math.max(0, Math.min(100, percentageX));

    internalPosition.current = Number(clampedPercentageX.toFixed(2));
    syncPosition();
  };

  /* Container */
  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    // Only handle left mouse button (touch events also use 0).
    if (event.button !== 0) {
      return;
    }

    setIsDragging(true);
    updateOnCursorPosition(event);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) {
      return;
    }

    updateOnCursorPosition(event);
  };

  const movePosition = (offset: number) => {
    internalPosition.current = Math.max(
      0,
      Math.min(100, internalPosition.current + offset),
    );
    syncPosition();
  };

  /* Set on CompareHandle */
  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      movePosition(-5);
    } else if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      movePosition(5);
    } else if (event.key === "Home") {
      movePosition(-100);
    } else if (event.key === "End") {
      movePosition(100);
    }
  };

  /* Initial styles, syncPosition() handles updates */
  const appliedStyle: CSSProperties = {
    "--image-clip-2": `${internalPosition.current}%`,
    "--image-clip-1": `${100 - internalPosition.current}%`,
  };

  return (
    <div
      ref={containerRef}
      style={appliedStyle}
      onPointerDown={handlePointerDown}
      onPointerUp={() => setIsDragging(false)}
      onPointerMove={handlePointerMove}
      className="group relative grid max-h-full max-w-fit touch-pan-y select-none overflow-hidden"
    >
      <CompareItem order="1">
        <img src={image1} alt="" className="object-cover object-center" />
      </CompareItem>
      <CompareItem order="2">
        <img src={image2} alt="" className="object-cover object-center" />
      </CompareItem>
      <CompareHandle
        position={50}
        onKeyDown={handleKeyDown}
        isDragging={isDragging}
      />
    </div>
  );
};

export default CompareImages;
