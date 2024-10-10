import React, { forwardRef } from "react";
import { useVirtualFocusInternalContext } from "../Context";

export type VirtualFocusContentProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "id"
>;

export const VirtualFocusContent = forwardRef<
  HTMLDivElement,
  VirtualFocusContentProps
>(({ children, ...rest }, ref) => {
  const { uniqueId } = useVirtualFocusInternalContext();
  return (
    <div ref={ref} {...rest} id={`virtualfocus-${uniqueId}-content`}>
      {children}
    </div>
  );
});
