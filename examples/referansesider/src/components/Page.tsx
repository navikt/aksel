import { ReactNode } from "@tanstack/react-router";
import clsx from "clsx";

export const Page = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className={clsx(
        "flex flex-col px-2 w-full m-auto mb-20 min-h-screen",
        "lg:w-[72ch] lg:px-0",
      )}
    >
      {children}
    </div>
  );
};
