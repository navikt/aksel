import React from "react";
import { HR } from "../layout/hr/HR";

export const injectHRBetween = (children: React.ReactNode) => {
  return React.Children.map(children, (child, index) =>
    index > 0 ? (
      <>
        <HR />
        {child}
      </>
    ) : (
      child
    ),
  );
};
