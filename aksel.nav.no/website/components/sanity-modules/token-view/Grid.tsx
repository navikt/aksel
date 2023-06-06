import React from "react";

export const Grid = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-8 grid grid-cols-[repeat(auto-fit,_minmax(16rem,_1fr))] gap-6">
    {children}
  </div>
);
