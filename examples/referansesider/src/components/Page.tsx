import { ReactNode } from "@tanstack/react-router";
import clsx from "clsx";

export const Page = ({
  children,
  options,
}: {
  children: ReactNode;
  options?: {
    width?: "large" | "medium" | "xlarge" | "2xlarge";
    footer?: "none";
  };
}) => {
  const _options = options ?? {
    width: "medium",
    footer: "none",
  };
  const width = _options.width;
  const footer = _options.footer;
  return (
    <div
      className={clsx(
        "flex flex-col px-2 w-full m-auto pb-20",
        "lg:px-0",
        { [`lg:w-[874px]`]: width === "medium" },
        { [`lg:w-[921px]`]: width === "large" },
        { [`lg:w-[1440px]`]: width === "xlarge" },
        { [`lg:w-[1872px]`]: width === "2xlarge" },
        { ["min-h-screen"]: footer !== "none" },
      )}
    >
      {children}
    </div>
  );
};
