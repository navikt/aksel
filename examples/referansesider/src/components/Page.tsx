import { ReactNode } from "@tanstack/react-router";
import clsx from "clsx";

export const Page = ({
  children,
  options,
}: {
  children: ReactNode;
  options?: { width?: "large" | "medium" };
}) => {
  const _options = options ?? {
    width: "medium",
  };
  const width = _options.width;
  return (
    <div
      className={clsx(
        "flex flex-col px-2 w-full m-auto mb-20 min-h-screen",
        "lg:px-0",
        { [`lg:w-[72ch]`]: width === "medium" },
        { [`lg:w-[921px]`]: width === "large" },
      )}
    >
      {children}
    </div>
  );
};
