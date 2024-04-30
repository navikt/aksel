import React, { forwardRef } from "react";
import {
  SlottedDivElement,
  SlottedDivElementRef,
  SlottedDivProps,
} from "./SlottedDivElement";

interface MenuSeparatorProps extends SlottedDivProps {}

const MenuSeparator = forwardRef<SlottedDivElementRef, MenuSeparatorProps>(
  (props: MenuSeparatorProps, ref) => {
    return (
      <SlottedDivElement
        role="separator"
        aria-orientation="horizontal"
        {...props}
        ref={ref}
      />
    );
  },
);

export { MenuSeparator, type MenuSeparatorProps };
