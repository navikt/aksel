"use client";

import {
  CSSProperties,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Color } from "@/app/_sanity/query-types";

type CompareImagesContextT = {
  container: {
    ref: React.MutableRefObject<HTMLDivElement | null>;
    onPointerDown?: (event: React.PointerEvent<HTMLDivElement>) => void;
    styles?: CSSProperties;
  };
  handle: {
    onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
  };

  handlePosition: number;
  dragging: {
    current: boolean;
    update: (value: boolean) => void;
  };
};

const CompareImagesContext = createContext<CompareImagesContextT | null>(null);

function CompareImagesProvider({
  children,
  background,
}: {
  children: React.ReactNode;
  background?: Color;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [handlePosition, setHandlePosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

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
      const clampedPercentageX = Math.max(-1, Math.min(100, percentageX));

      const newPosition = Number(clampedPercentageX.toFixed(2));
      setHandlePosition(newPosition);
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
    const newPosition = Math.max(-1, Math.min(100, handlePosition + offset));
    setHandlePosition(newPosition);
  };

  /* Set on CompareHandle */
  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault();
      movePosition(-5);
    } else if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault();
      movePosition(5);
    } else if (event.key === "Home") {
      event.preventDefault();
      movePosition(-100);
    } else if (event.key === "End") {
      event.preventDefault();
      movePosition(100);
    }
  };

  const appliedStyle: CSSProperties = {
    "--image-clip-2": `${handlePosition}%`,
    "--image-clip-1": `${100 - handlePosition}%`,
    "--image-bg": background
      ? `rgba(${background.rgb?.r},${background.rgb?.g},${background.rgb?.b},${background.rgb?.a})`
      : undefined,
  };

  return (
    <CompareImagesContext.Provider
      value={{
        container: {
          ref: containerRef,
          styles: appliedStyle,
          onPointerDown: handlePointerDown,
        },
        handle: {
          onKeyDown: handleKeyDown,
        },
        handlePosition,
        dragging: {
          current: isDragging,
          update: setIsDragging,
        },
      }}
    >
      {children}
    </CompareImagesContext.Provider>
  );
}

function useCompareImages() {
  const context = useContext(CompareImagesContext);

  if (context === null) {
    throw new Error(
      "useCompareImages must be used within a CompareImagesProvider",
    );
  }
  return context;
}

export { CompareImagesProvider, useCompareImages };
