import React, { forwardRef } from "react";
import { OverridableComponent } from "../../util/OverridableComponent";
import { StackProps, Stack } from "./Stack";

export type VStackProps = Omit<StackProps, "direction" | "wrap" | "justify">;

/**
 * Layout-primitive for vetical flexbox
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/Stack)
 * @see 🏷️ {@link VStackProps}
 *
 * @example
 * <VStack gap="8">
 *  <MyComponent />
 *  <MyComponent />
 * </VStack>
 *
 * @example
 * // Responsive gap
 * <VStack gap={{xs: "2", md: "6"}}>
 *  <MyComponent />
 *  <MyComponent />
 * </VStack>
 */
export const VStack: OverridableComponent<VStackProps, HTMLDivElement> =
  forwardRef((props, ref) => {
    return <Stack {...props} ref={ref} direction="column" wrap={false} />;
  });
