import React, { forwardRef } from "react";
import { OverridableComponent } from "../../util/OverridableComponent";
import { StackProps, Stack } from "./Stack";

export type HStackProps = Omit<StackProps, "direction">;

/**
 * Layout-primitive for horizontal flexbox
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/Stack)
 * @see 🏷️ {@link HStackProps}
 *
 * @example
 * <HStack gap="8">
 *  <MyComponent />
 *  <MyComponent />
 * </HStack>
 *
 * @example
 * // Responsive gap
 * <HStack gap={{xs: "2", md: "6"}}>
 *  <MyComponent />
 *  <MyComponent />
 * </HStack>
 */
export const HStack: OverridableComponent<HStackProps, HTMLDivElement> =
  forwardRef((props, ref) => {
    return <Stack {...props} ref={ref} direction="row" />;
  });
