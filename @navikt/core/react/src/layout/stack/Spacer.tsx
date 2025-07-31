import React from "react";
import { useRenameCSS } from "../../theme/Theme";

/**
 * Layout-primitive for auto-spacing between elements
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/primitives/hstack)
 *
 * @example
 * <HStack gap="8">
 *  <MyComponent />
 *  <Spacer />
 *  <MyComponent />
 * </HStack>
 */
export const Spacer = () => {
  const { cn } = useRenameCSS();
  return <span className={cn("navds-stack__spacer")} />;
};

export default Spacer;
