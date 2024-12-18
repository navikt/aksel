"use client";

import cl from "clsx";
import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { BodyShort } from "@navikt/ds-react";
import { urlFor } from "@/sanity/interface";
import { CompareHandle } from "./CompareHandle";
import { CompareItem } from "./CompareItem";

/* eslint-disable @next/next/no-img-element */

type CompareImagesProps = {
  node: {
    image_1: { asset: any; alt: string };
    image_2: { asset: any; alt: string };
    caption?: string;
    border?: boolean;
    background?: {
      rgb: { a: number; b: number; g: number; r: number };
      alpha: number;
    };
  };
};

const CompareImages = ({ node }: CompareImagesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLButtonElement>(null);

  const internalPosition = useRef(50);

  const [isDragging, setIsDragging] = useState(false);

  const syncPosition = () => {
    if (!containerRef.current || !handleRef.current) {
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

    const rounded = Math.round(internalPosition.current);

    handleRef.current.ariaValueNow = rounded.toString();
    handleRef.current.ariaValueText = `${rounded}%`;
  };
  /**
   * Update the position based on the cursor's current position within container.
   */
  const updateOnCursorPosition = useCallback(
    (event: React.PointerEvent<HTMLDivElement> | PointerEvent) => {
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
    },
    [],
  );

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement> | PointerEvent) => {
      if (!isDragging || !containerRef.current) {
        return;
      }

      updateOnCursorPosition(event);
    },
    [isDragging, updateOnCursorPosition],
  );

  useEffect(() => {
    const stopDragging = () => setIsDragging(false);

    globalThis.addEventListener("pointermove", handlePointerMove);
    globalThis.addEventListener("pointerup", stopDragging);

    return () => {
      globalThis.removeEventListener("pointermove", handlePointerMove);
      globalThis.removeEventListener("pointerup", stopDragging);
    };
  }, [handlePointerMove]);

  if (!node || !node.image_1 || !node.image_2) {
    return null;
  }

  /* Container */
  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    // Only handle left mouse button (touch events also use 0).
    if (event.button !== 0) {
      return;
    }

    setIsDragging(true);
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

  const appliedStyle: CSSProperties = {
    "--image-clip-2": `${internalPosition.current}%`,
    "--image-clip-1": `${100 - internalPosition.current}%`,
  };

  return (
    <figure className="m-0 mb-8 flex flex-col group-[.aksel-artikkel]/aksel:mx-auto">
      <div
        ref={containerRef}
        style={appliedStyle}
        onPointerDown={handlePointerDown}
        className={cl(
          "group relative grid max-h-full max-w-fit touch-pan-y select-none overflow-hidden rounded-lg",
          {
            "ring-1 ring-border-subtle": node.border,
          },
        )}
      >
        <CompareItem order="1">
          <img
            src={urlFor(node.image_1.asset).auto("format").url()}
            alt=""
            className="object-cover object-center"
          />
        </CompareItem>
        <CompareItem order="2">
          <img
            src={urlFor(node.image_2.asset).auto("format").url()}
            alt=""
            className="object-cover object-center"
          />
        </CompareItem>
        <CompareHandle
          ref={handleRef}
          onKeyDown={handleKeyDown}
          isDragging={isDragging}
        />
      </div>
      {node.caption && (
        <figcaption className="mt-2 grid gap-1 px-4">
          <BodyShort as="span" size="small" className="self-center text-center">
            {node.caption}
          </BodyShort>
        </figcaption>
      )}
    </figure>
  );
};

export default CompareImages;
