import { ReactNode } from "@tanstack/react-router";
import clsx from "clsx";

export const Page = ({
  children,
  options,
}: {
  children: ReactNode;
  options?: { width?: string };
}) => {
  const _options = options ?? {
    width: "72ch",
  };
  const width = _options.width;
  return (
    <div
      className={clsx(
        "flex flex-col px-2 w-full m-auto mb-20 min-h-screen",
        "lg:px-0",
        { [`lg:w-[${width}]`]: width },
      )}
    >
      {children}
    </div>
  );
};
