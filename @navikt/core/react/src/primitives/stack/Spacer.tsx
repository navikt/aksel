import React from "react";

/**
 * Layout-primitive for auto-spacing between elements
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/primitives/hstack)
 *
 * @example
 * <HStack gap="space-32">
 *  <MyComponent />
 *  <Spacer />
 *  <MyComponent />
 * </HStack>
 */
export const Spacer = () => {
  return <span className="aksel-stack__spacer" />;
};

export default Spacer;
