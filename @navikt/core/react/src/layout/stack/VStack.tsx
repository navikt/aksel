import React, { forwardRef } from "react";
import { OverridableComponent } from "../../util/types";
import { PrimitiveAsChildProps } from "../base/PrimitiveAsChildProps";
import { Stack, StackProps } from "./Stack";

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
  forwardRef(({ as = "div", ...rest }, ref) => {
    return (
      <Stack as={as} {...rest} ref={ref} direction="column" wrap={false} />
    );
  });

export default VStack;
