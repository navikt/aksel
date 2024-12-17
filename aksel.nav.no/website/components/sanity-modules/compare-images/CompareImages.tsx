"use client";

import { CSSProperties } from "react";

const CompareImages = () => {
  const appliedStyle: CSSProperties = {
    "--image-clip-1": 0,
    "--image-clip-2": 0,
    position: "relative",
    display: "grid",
    maxWidth: "100%",
    maxHeight: "100%",
    overflow: "hidden",
    /* cursor: isDragging ? "ew-resize" : undefined, */
    touchAction: "pan-y",
    userSelect: "none",
    KhtmlUserSelect: "none",
    msUserSelect: "none",
    MozUserSelect: "none",
    WebkitUserSelect: "none",
  };

  return (
    <div style={appliedStyle}>
      <CompareItem order="1">Item 1</CompareItem>
      <CompareItem order="1">Item 2</CompareItem>
      <CompareHandle position={50} />
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
    maxWidth: "100%",
    overflow: "hidden",
    boxSizing: "border-box",
    userSelect: "none",
    willChange: "clip-path",
    clipPath:
      order === "1"
        ? `inset(0 var(--image-clip-1) 0 0)`
        : `inset(0 0 0 var(--image-clip-2))`,
  };

  return <div style={appliedStyle}>{children}</div>;
};

const CompareHandle = ({ position }: { position: number }) => {
  const appliedStyle: CSSProperties = {
    position: "absolute",
    top: 0,
    height: "100%",
    background: "none",
    border: 0,
    padding: 0,
    pointerEvents: "all",
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
    zIndex: 1,
    outline: 0,
    transform: `translate3d(-50%, 0, 0)`,
  };

  return (
    <button
      style={appliedStyle}
      aria-label="Drag to move or focus and use arrow keys"
      aria-orientation="horizontal"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={position}
      data-rcs="handle-container"
      role="slider"
    />
  );
};

export default CompareImages;
