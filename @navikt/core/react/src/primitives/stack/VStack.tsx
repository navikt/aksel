import React, { forwardRef } from "react";
import type { OverridableComponent } from "../../utils-external";
import type { PrimitiveAsChildProps } from "../base/PrimitiveAsChildProps";
import { Stack, type StackProps } from "./Stack";

export type VStackProps = PrimitiveAsChildProps &
  Omit<StackProps, "direction" | "wrap">;

/**
 * Layout-primitive for vetical flexbox
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/primitives/vstack)
 * @see 🏷️ {@link VStackProps}
 * @see [🤖 OverridableComponent](https://aksel.nav.no/grunnleggende/kode/overridablecomponent) support
 *
 * @example
 * <VStack gap="space-32">
 *  <MyComponent />
 *  <MyComponent />
 * </VStack>
 *
 * @example
 * // Responsive gap
 * <VStack gap={{xs: "space-8", md: "space-24"}}>
 *  <MyComponent />
 *  <MyComponent />
 * </VStack>
 */
export const VStack: OverridableComponent<VStackProps, HTMLDivElement> =
  forwardRef(({ as = "div", ...rest }, ref) => {
    return (
      <Stack as={as} {...rest} ref={ref} direction="column" wrap={false} />
    );
  });

export default VStack;
