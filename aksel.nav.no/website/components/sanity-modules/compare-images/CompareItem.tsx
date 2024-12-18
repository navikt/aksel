import { CSSProperties } from "react";

export const CompareItem = ({
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
      className="box-border max-w-full cursor-pointer select-none overflow-hidden"
    >
      {children}
    </div>
  );
};
