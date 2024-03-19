import React from "react";
import { Box } from "../layout/box";
import { injectHRBetween } from "./utils";

export interface SummaryValueProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const SummaryValue = ({ children }: SummaryValueProps) => {
  let _children = children;

  // Inject wrapper child
  // @ts-expect-error This works even if TS complains
  if (React.Children.toArray(children)[0]?.type?.name === "SummaryAnswer") {
    _children = (
      <Box
        as="dl"
        paddingInline="4"
        paddingBlock="4"
        borderRadius="large"
        background="surface-action-subtle"
      >
        {injectHRBetween(children)}
      </Box>
    );
  }

  return (
    <Box as="dd" paddingBlock="2 0">
      {_children}
    </Box>
  );
};
