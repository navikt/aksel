import React from "react";
import { Box } from "../layout/box";
import { HR } from "../layout/hr/HR";

export const injectHRBetween = (children: React.ReactNode[]) => {
  return children.map((child, index) =>
    index < children.length - 1 ? (
      <>
        <Box key={index} as="dd">
          {child}
        </Box>
        <HR />
      </>
    ) : (
      <Box key={index} as="dd">
        {child}
      </Box>
    ),
  );
};
