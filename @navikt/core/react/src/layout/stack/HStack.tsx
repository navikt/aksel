import React, { forwardRef } from "react";
import { type OverridableComponent } from "../../utils-external";
import { PrimitiveAsChildProps } from "../base/PrimitiveAsChildProps";
import { Stack, StackProps } from "./Stack";

export type HStackProps = PrimitiveAsChildProps & Omit<StackProps, "direction">;

/**
 * Layout-primitive for horizontal flexbox
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/primitives/hstack)
 * @see 🏷️ {@link HStackProps}
 * @see [🤖 OverridableComponent](https://aksel.nav.no/grunnleggende/kode/overridablecomponent) support
 *
 * @example
 * <HStack gap="space-32">
 *  <MyComponent />
 *  <MyComponent />
 * </HStack>
 *
 * @example
 * // Responsive gap
 * <HStack gap={{xs: "space-8", md: "space-24"}}>
 *  <MyComponent />
 *  <MyComponent />
 * </HStack>
 */
export const HStack: OverridableComponent<HStackProps, HTMLDivElement> =
  forwardRef(({ as = "div", ...rest }, ref) => {
    return <Stack as={as} {...rest} ref={ref} direction="row" />;
  });

export default HStack;
