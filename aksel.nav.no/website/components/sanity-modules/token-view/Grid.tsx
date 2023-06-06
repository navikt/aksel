import React from "react";
import cl from "clsx";

export const Grid = ({
  children,
  stacked = false,
}: {
  children: React.ReactNode;
  stacked?: boolean;
}) => (
  <div
    className={cl("mt-8 grid", {
      "grid-cols-[repeat(auto-fit,_minmax(16rem,_1fr))] gap-6": !stacked,
      "gap-8": stacked,
    })}
  >
    {children}
  </div>
);
