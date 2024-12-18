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

  /* Container */
  const handlePoinerUp = () => {
    setIsDragging(false);
  };

  /* Container */
  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
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

  const movePosition = (offset: number) => {
    internalPosition.current = Math.max(
      0,
      Math.min(100, internalPosition.current + offset),
    );
    syncPosition();
  };

  /* Handle */
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

  const appliedStyle: CSSProperties = {
    "--image-clip-2": `${internalPosition.current}%`,
    "--image-clip-1": `${100 - internalPosition.current}%`,
  };

  return (
    <div
      ref={containerRef}
      style={appliedStyle}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePoinerUp}
      onPointerMove={handlePointerMove}
      className="group relative grid max-h-full max-w-full touch-pan-y select-none overflow-hidden"
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
        style={{
          transform: "translate3d(-50%, 0, 0)",
          left: `var(--image-clip-2)`,
          transition: "opacity 200ms ease",
        }}
      />
    </div>
  );
};

export default CompareImages;
