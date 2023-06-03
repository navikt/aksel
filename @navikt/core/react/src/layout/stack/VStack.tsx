import React, { forwardRef } from "react";
import { OverridableComponent } from "../../util/OverridableComponent";
import { StackProps, Stack } from "./Stack";

export type VStackProps = Omit<StackProps, "direction" | "wrap">;

export const VStack: OverridableComponent<VStackProps, HTMLDivElement> =
  forwardRef((props, ref) => {
    return <Stack {...props} ref={ref} direction="column" wrap={false} />;
  });
