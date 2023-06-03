import React, { forwardRef } from "react";
import { OverridableComponent } from "../../util/OverridableComponent";
import { StackProps, Stack } from "./Stack";

export type HStackProps = Omit<StackProps, "direction">;

export const HStack: OverridableComponent<HStackProps, HTMLDivElement> =
  forwardRef((props, ref) => {
    return <Stack {...props} ref={ref} direction="row" />;
  });
